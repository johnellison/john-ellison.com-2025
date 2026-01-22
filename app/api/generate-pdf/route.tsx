import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import AssessmentReport from '@/components/pdf/AssessmentReport';
import React from 'react';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { report, chartImage } = body;

    if (!report) {
      return NextResponse.json({ error: 'Missing report data' }, { status: 400 });
    }

    // Render PDF to stream
    const stream = await renderToStream(
      <AssessmentReport data={report} chartImage={chartImage} />
    );

    // Return stream response
    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="AI-Readiness-Report-${report.companyData.name}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
