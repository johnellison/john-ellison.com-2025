import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import path from 'path';

// Map clean URLs to HTML file paths
// Note: homepage (/) is now handled by app/page.tsx
// Most routes are also handled by rewrites in next.config.ts
const routeMap: Record<string, string> = {
  'splash': 'splash.html',
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
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const routePath = pathSegments.join('/');

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
