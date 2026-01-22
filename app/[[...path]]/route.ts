import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
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

// MIME types for static files
const mimeTypes: Record<string, string> = {
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await params;
  const routePath = pathSegments?.join('/') || '';

  // Check route map first (before checking for extensions)
  const htmlFile = routeMap[routePath];
  if (htmlFile) {
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

  // Check if request is for a static file (has known extension)
  const ext = path.extname(routePath);
  if (ext && mimeTypes[ext]) {
    // Try to serve static file from public/
    const staticPath = path.join(process.cwd(), 'public', routePath);
    try {
      await stat(staticPath);
      const content = await readFile(staticPath);
      return new NextResponse(content, {
        headers: {
          'Content-Type': mimeTypes[ext],
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch {
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  // Not in route map and not a known static file type
  return new NextResponse('Not Found', { status: 404 });
}
