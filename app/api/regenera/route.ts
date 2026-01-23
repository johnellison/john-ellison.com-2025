import { NextResponse } from 'next/server';

export interface RegeneraPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  guid: string;
  image: string | null;
}

// Cache duration: 1 hour
const CACHE_DURATION = 60 * 60;

export async function GET() {
  try {
    const feedUrl = 'https://regenera.xyz/feed';

    const response = await fetch(feedUrl, {
      next: { revalidate: CACHE_DURATION },
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.status}`);
    }

    const xmlText = await response.text();

    // Parse RSS XML
    const posts = parseRSS(xmlText);

    return NextResponse.json({
      posts,
      lastFetched: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error('Regenera feed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Regenera feed', posts: [] },
      { status: 500 }
    );
  }
}

function parseRSS(xml: string): RegeneraPost[] {
  const posts: RegeneraPost[] = [];

  // Simple regex-based XML parsing for RSS items
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];

    const title = extractTag(itemContent, 'title');
    const link = extractTag(itemContent, 'link');
    const pubDate = extractTag(itemContent, 'pubDate');
    const description = extractTag(itemContent, 'description');
    const content = extractCDATA(itemContent, 'content:encoded') || description;
    const guid = extractTag(itemContent, 'guid');
    const image = extractFirstImage(content || description);

    if (title && link) {
      posts.push({
        title: decodeHTMLEntities(title),
        link,
        pubDate,
        description: decodeHTMLEntities(stripHTML(description)),
        content: content,
        guid: guid || link,
        image,
      });
    }
  }

  return posts;
}

function extractTag(content: string, tagName: string): string {
  // Handle CDATA sections
  const cdataRegex = new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>`, 'i');
  const cdataMatch = content.match(cdataRegex);
  if (cdataMatch) {
    return cdataMatch[1].trim();
  }

  // Handle regular content
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function extractCDATA(content: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function extractFirstImage(content: string): string | null {
  // Look for img tags
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) {
    return imgMatch[1];
  }

  // Look for enclosure
  const enclosureMatch = content.match(/url=["']([^"']+\.(jpg|jpeg|png|gif|webp)[^"']*)["']/i);
  if (enclosureMatch) {
    return enclosureMatch[1];
  }

  return null;
}

function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8230;': '...',
    '&#8212;': '—',
    '&#8211;': '–',
  };

  let result = text;
  for (const [entity, char] of Object.entries(entities)) {
    result = result.replace(new RegExp(entity, 'g'), char);
  }

  // Handle numeric entities
  result = result.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));

  return result;
}
