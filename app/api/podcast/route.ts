import { NextResponse } from 'next/server';

export interface PodcastEpisode {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  duration: string;
  guid: string;
  image: string | null;
  enclosure: string | null;
}

// Cache duration: 1 hour
const CACHE_DURATION = 60 * 60;

export async function GET() {
  try {
    // The John Ellison Show RSS feed (using CORS proxy for server-side fetch)
    const feedUrl = 'https://anchor.fm/s/be4ca48c/podcast/rss';

    const response = await fetch(feedUrl, {
      next: { revalidate: CACHE_DURATION },
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
        'User-Agent': 'Mozilla/5.0 (compatible; JohnEllisonSite/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.status}`);
    }

    const xmlText = await response.text();

    // Parse RSS XML
    const episodes = parseRSS(xmlText);

    return NextResponse.json({
      episodes,
      lastFetched: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error('Podcast feed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch podcast feed', episodes: [] },
      { status: 500 }
    );
  }
}

function parseRSS(xml: string): PodcastEpisode[] {
  const episodes: PodcastEpisode[] = [];

  // Extract channel image
  const channelImageMatch = xml.match(/<itunes:image[^>]+href=["']([^"']+)["']/i);
  const defaultImage = channelImageMatch ? channelImageMatch[1] : null;

  // Simple regex-based XML parsing for RSS items
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];

    const title = extractTag(itemContent, 'title');
    const link = extractTag(itemContent, 'link');
    const pubDate = extractTag(itemContent, 'pubDate');
    const description = extractTag(itemContent, 'description') || extractTag(itemContent, 'itunes:summary');
    const duration = extractTag(itemContent, 'itunes:duration');
    const guid = extractTag(itemContent, 'guid');

    // Try to get episode-specific image, fall back to channel image
    const episodeImageMatch = itemContent.match(/<itunes:image[^>]+href=["']([^"']+)["']/i);
    const image = episodeImageMatch ? episodeImageMatch[1] : defaultImage;

    // Get enclosure (audio file)
    const enclosureMatch = itemContent.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
    const enclosure = enclosureMatch ? enclosureMatch[1] : null;

    if (title && link) {
      episodes.push({
        title: decodeHTMLEntities(title),
        link,
        pubDate,
        description: decodeHTMLEntities(stripHTML(description)),
        duration: formatDuration(duration),
        guid: guid || link,
        image,
        enclosure,
      });
    }
  }

  return episodes;
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

function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function formatDuration(duration: string): string {
  if (!duration) return '';

  // If already in HH:MM:SS or MM:SS format, return as is
  if (duration.includes(':')) return duration;

  // Convert seconds to MM:SS or HH:MM:SS
  const seconds = parseInt(duration, 10);
  if (isNaN(seconds)) return duration;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
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
