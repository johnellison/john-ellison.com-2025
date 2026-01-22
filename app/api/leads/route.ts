import { NextRequest, NextResponse } from 'next/server';
import { saveLead } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, companyName, linkedin, companyInsights } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Derive website from email domain
    const emailDomain = email.split('@')[1];
    const website = emailDomain ? `https://${emailDomain}` : '';

    const leadData = {
      email,
      company_name: companyName || emailDomain?.split('.')[0] || 'Unknown',
      website,
      linkedin: linkedin || '',
      company_insights: companyInsights || null,
    };

    const { success, error } = await saveLead(leadData);

    if (!success) {
      console.error('Failed to save lead:', error);
      // Don't fail the request - lead capture is secondary
      return NextResponse.json({ success: false, error });
    }

    return NextResponse.json({ success: true, website });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
