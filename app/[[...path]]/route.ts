import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

// Map clean URLs to HTML file paths
const routeMap: Record<string, string> = {
  '': 'index.html',
  'sprint': 'sprint.html',
  'contact': 'contact.html',
  'splash': 'splash.html',
  'case-studies/toucan': 'case-studies/toucan.html',
  'case-studies/interbeing': 'case-studies/interbeing-case-study.html',
  'case-studies/interbeing-claude-4.5': 'case-studies/interbeing-claude-4.5.html',
  'podcast': 'podcast/index.html',
  'podcast/guest': 'podcast/guest/index.html',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await params;
  const routePath = pathSegments?.join('/') || '';

  const htmlFile = routeMap[routePath];

  if (!htmlFile) {
    return new NextResponse('Not Found', { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'html', htmlFile);
    const content = await readFile(filePath, 'utf-8');

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse('Not Found', { status: 404 });
  }
}
