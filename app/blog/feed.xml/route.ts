import { getAllPosts } from '@/lib/blog/content';

const BASE_URL = 'https://john-ellison.com';

function escapeXml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET() {
    const posts = await getAllPosts();

    const rssItems = posts
        .map((post) => {
            const pubDate = new Date(post.publishedAt).toUTCString();
            return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category?.replace('-', ' ') || 'Uncategorized')}</category>
      ${post.featuredImage ? `<enclosure url="${BASE_URL}${post.featuredImage}" type="image/png" />` : ''}
    </item>`;
        })
        .join('');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>John Ellison - Regenerative Wisdom</title>
    <link>${BASE_URL}/blog</link>
    <description>Exploring the intersection of artificial intelligence, organizational transformation, and regenerative leadership.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/john-e-wedding-headshot.webp</url>
      <title>John Ellison - Regenerative Wisdom</title>
      <link>${BASE_URL}/blog</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rssFeed, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
