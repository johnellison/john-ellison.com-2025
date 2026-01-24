import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import WhitepaperPDF from '@/components/pdf/WhitepaperPDF';

export async function GET() {
  try {
    // Generate PDF buffer
    const pdfBuffer = await renderToBuffer(WhitepaperPDF());

    // Convert Buffer to Uint8Array for NextResponse compatibility
    const uint8Array = new Uint8Array(pdfBuffer);

    // Return PDF as response
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ai-transformation-whitepaper.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: String(error) },
      { status: 500 }
    );
  }
}
