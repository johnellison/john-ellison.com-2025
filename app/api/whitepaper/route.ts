import { NextRequest, NextResponse } from 'next/server';
import { saveWhitepaperLead, markWhitepaperSent } from '@/lib/supabase';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Whitepaper PDF URL (hosted in public folder or external CDN)
const WHITEPAPER_URL = 'https://john-ellison.com/ai-transformation-whitepaper.pdf';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'website' } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Save lead to database
    const { success, error } = await saveWhitepaperLead(normalizedEmail, source);

    if (!success) {
      console.error('Failed to save whitepaper lead:', error);
      // Continue anyway - we should still send the whitepaper
    }

    // Send whitepaper email
    await sendWhitepaperEmail(normalizedEmail, source);

    return NextResponse.json({
      success: true,
      message: 'Whitepaper sent successfully',
    });
  } catch (error) {
    console.error('Whitepaper submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendWhitepaperEmail(email: string, source: string) {
  try {
    if (!resend) {
      console.warn('RESEND_API_KEY is not configured. Skipping email delivery.');
      return;
    }

    const { data, error } = await resend.emails.send({
      from: 'John Ellison <no-reply@updates.john-ellison.com>',
      to: email,
      cc: 'john@john-ellison.com',
      subject: 'Your AI Transformation Whitepaper',
      html: generateWhitepaperEmailContent(source),
    });

    if (error) {
      console.error('Email send error:', error);
      return;
    }

    // Mark whitepaper as sent
    await markWhitepaperSent(email);

    return data;
  } catch (err) {
    console.error('Exception sending whitepaper email:', err);
  }
}

function generateWhitepaperEmailContent(source: string): string {
  const isFromAssessment = source === 'assessment-results';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Inter', -apple-system, sans-serif; background: #0c0c10; color: #fff; margin: 0; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 8px; }
          .tagline { font-size: 14px; color: rgba(255,255,255,0.6); }
          .hero { background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(59, 130, 246, 0.2)); padding: 40px; border-radius: 16px; text-align: center; margin-bottom: 32px; border: 1px solid rgba(124, 58, 237, 0.3); }
          .hero h1 { font-size: 28px; font-weight: 700; margin: 0 0 12px 0; color: #fff; }
          .hero p { font-size: 16px; color: rgba(255,255,255,0.8); margin: 0; }
          .download-btn { display: inline-block; background: linear-gradient(135deg, #7c3aed, #3b82f6); color: #fff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; margin-top: 24px; }
          .content { background: rgba(255,255,255,0.05); padding: 32px; border-radius: 12px; margin-bottom: 32px; border: 1px solid rgba(255,255,255,0.1); }
          .content h2 { font-size: 20px; font-weight: 600; margin: 0 0 16px 0; color: #fff; }
          .content p { font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.7); margin: 0 0 16px 0; }
          .highlight-box { background: rgba(34, 197, 94, 0.1); padding: 20px; border-radius: 8px; border-left: 3px solid #22c55e; margin: 24px 0; }
          .highlight-box h3 { font-size: 16px; font-weight: 600; color: #22c55e; margin: 0 0 8px 0; }
          .highlight-box p { font-size: 14px; color: rgba(255,255,255,0.7); margin: 0; }
          .stats { display: flex; gap: 16px; margin: 24px 0; }
          .stat { flex: 1; text-align: center; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; }
          .stat-value { font-size: 28px; font-weight: 700; color: #7c3aed; }
          .stat-label { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px; }
          .cta { text-align: center; margin: 40px 0; padding: 32px; background: rgba(124, 58, 237, 0.1); border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.2); }
          .cta h2 { font-size: 22px; font-weight: 600; color: #fff; margin: 0 0 12px 0; }
          .cta p { font-size: 15px; color: rgba(255,255,255,0.7); margin: 0 0 20px 0; }
          .cta-btn { display: inline-block; background: #fff; color: #7c3aed; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; }
          .footer { text-align: center; font-size: 13px; color: rgba(255,255,255,0.4); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">John Ellison</div>
            <div class="tagline">AI Transformation Partner</div>
          </div>

          <div class="hero">
            <h1>AI Transformation: Optimism vs. Reality</h1>
            <p>Your comprehensive guide to navigating AI transformation is ready.</p>
            <a href="${WHITEPAPER_URL}" class="download-btn">Download Whitepaper (PDF)</a>
          </div>

          <div class="content">
            <h2>What You'll Learn</h2>
            <p>This whitepaper synthesizes evidence from 100+ peer-reviewed studies to answer the questions that matter most for your AI journey.</p>

            <div style="margin: 24px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 16px; text-align: center; background: rgba(255,255,255,0.05); border-radius: 8px 0 0 8px;">
                    <div style="font-size: 28px; font-weight: 700; color: #7c3aed;">80%</div>
                    <div style="font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px;">Failure Rate</div>
                  </td>
                  <td style="width: 8px;"></td>
                  <td style="padding: 16px; text-align: center; background: rgba(255,255,255,0.05);">
                    <div style="font-size: 28px; font-weight: 700; color: #3b82f6;">10</div>
                    <div style="font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px;">Critical Barriers</div>
                  </td>
                  <td style="width: 8px;"></td>
                  <td style="padding: 16px; text-align: center; background: rgba(255,255,255,0.05); border-radius: 0 8px 8px 0;">
                    <div style="font-size: 28px; font-weight: 700; color: #22c55e;">5</div>
                    <div style="font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px;">Phase Roadmap</div>
                  </td>
                </tr>
              </table>
            </div>

            <div class="highlight-box">
              <h3>Key Insight</h3>
              <p>The problem isn't the AI model—it's the "learning gap." Success requires embedding AI into actual workflows, collecting feedback loops, and continuous improvement.</p>
            </div>

            <p>Inside you'll find:</p>
            <ul style="color: rgba(255,255,255,0.7); padding-left: 20px; margin: 16px 0;">
              <li style="margin-bottom: 8px;">Why 95% of AI pilots never reach production</li>
              <li style="margin-bottom: 8px;">The 10 barriers that consistently derail AI programs</li>
              <li style="margin-bottom: 8px;">What "high performer" organizations do differently</li>
              <li style="margin-bottom: 8px;">A practical 5-phase implementation roadmap</li>
              <li style="margin-bottom: 8px;">Pre-deployment governance checklist</li>
            </ul>
          </div>

          ${isFromAssessment ? `
          <div style="background: rgba(34, 197, 94, 0.1); padding: 24px; border-radius: 12px; margin-bottom: 32px; border: 1px solid rgba(34, 197, 94, 0.2);">
            <h3 style="font-size: 18px; font-weight: 600; color: #22c55e; margin: 0 0 12px 0;">Based on Your Assessment Results</h3>
            <p style="font-size: 15px; color: rgba(255,255,255,0.7); margin: 0;">This whitepaper complements your personalized AI Readiness Report. Use both together to understand your current state and build your transformation roadmap.</p>
          </div>
          ` : ''}

          <div class="cta">
            <h2>Ready to Move Beyond Pilots?</h2>
            <p>Book a strategy call to review your situation and build your custom AI transformation roadmap.</p>
            <a href="https://calendar.app.google/wirgV6a4Vcz7cZAcA" class="cta-btn">Schedule Strategy Call</a>
          </div>

          <div class="footer">
            <p>John Ellison & Fatma Ghedira</p>
            <p>AI Transformation Partners</p>
            <p style="margin-top: 16px;">
              <a href="https://john-ellison.com" style="color: rgba(255,255,255,0.4);">john-ellison.com</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
