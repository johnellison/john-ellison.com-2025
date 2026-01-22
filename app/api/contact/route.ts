import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase Client (Service Role for admin access)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY!; // Use Service Role Key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;
// Note: If RESEND_API_KEY is not set, we'll just log. Ideally it should be set.
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Save to Supabase
        const { data, error: dbError } = await supabase
            .from('contact_submissions')
            .insert([
                {
                    name,
                    email,
                    phone: phone || null,
                    message,
                },
            ])
            .select();

        if (dbError) {
            console.error('Supabase Error:', dbError);
            return NextResponse.json(
                { error: 'Failed to save submission' },
                { status: 500 }
            );
        }

        // 2. Send Email via Resend
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'John Ellison <onboarding@resend.dev>', // Update this if domain verified
                    to: ['john@john-ellison.com'],
                    replyTo: email,
                    subject: `New Contact Form Submission from ${name}`,
                    html: `
            <h2>New Message from john-ellison.com</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
              ${message.replace(/\n/g, '<br/>')}
            </blockquote>
          `,
                });
            } catch (emailError) {
                console.error('Resend Error:', emailError);
                // We don't fail the request if email fails, but we log it.
                // Or maybe we treat it as a partial success?
            }
        } else {
            console.warn('RESEND_API_KEY not set. Email not sent.');
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error('Unexpected Error:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
