import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const BASE_URL = 'https://john-ellison.com';

/**
 * Generate a URL with UTM parameters for tracking
 */
function getTrackedUrl(slug: string, platform: 'substack' | 'linkedin' | 'twitter' | 'instagram'): string {
    const params = new URLSearchParams({
        utm_source: platform,
        utm_medium: platform === 'substack' ? 'email' : 'social',
        utm_campaign: 'blog_distribution',
        utm_content: slug,
    });
    return `${BASE_URL}/blog/${slug}?${params.toString()}`;
}

export interface GeneratedContent {
    substack: {
        subject: string;
        body: string;
    };
    linkedin: {
        post: string;
        hashtags: string[];
    };
    twitter: {
        single: string;
        thread: string[];
    };
    instagram: {
        caption: string;
        hashtags: string[];
        bioLink: string;
    };
}

const SYSTEM_PROMPT = `You are a content distribution specialist for John Ellison, a product engineer and organizational strategist who works with mission-driven organizations on AI transformation.

John's voice is:
- Thoughtful and direct, never hyperbolic
- Personal but professional
- Speaks to leaders interested in AI and regenerative approaches
- Avoids buzzwords and clichés
- Grounded in real experience (16 years building AI systems, 300+ founders)

When generating content, maintain this authentic voice across all platforms.`;

const SUBSTACK_PROMPT = `Generate a newsletter teaser for John Ellison's Substack that drives subscribers to read the full article on john-ellison.com.

Post Title: {title}
Post Excerpt: {excerpt}
Post Content: {content}

Generate a JSON response with:
1. "subject": An engaging email subject line (under 50 characters)
2. "body": The newsletter body containing:
   - A 2-3 sentence hook that creates curiosity
   - A 1-paragraph preview of the key insight (without giving everything away)
   - End with: "Read the full article → {tracked_url}"

Keep it concise - this is a teaser, not the full article.`;

const LINKEDIN_PROMPT = `Create a LinkedIn post for John Ellison's audience of business leaders, investors, and regenerative practitioners.

Post Title: {title}
Post Excerpt: {excerpt}
Post Content: {content}

Generate a JSON response with:
1. "post": The LinkedIn post containing:
   - Start with a hook (question, bold statement, or story)
   - 3-5 key insights with good formatting (short paragraphs, line breaks)
   - A personal reflection or lesson learned
   - End with a CTA to read the full post at {tracked_url}
   - Target 1,000-1,500 characters
2. "hashtags": Array of 5-7 relevant hashtags (without the # symbol)

Avoid: Buzzwords, excessive emojis, cliché phrases like "I'm excited to share"`;

const TWITTER_PROMPT = `Create Twitter/X content for this article.

Post Title: {title}
Post Excerpt: {excerpt}
Post Content: {content}

Generate a JSON response with:
1. "single": A single tweet (under 280 characters) with:
   - Punchy hook
   - Link to {tracked_url}
   - 1-2 relevant hashtags

2. "thread": Array of 5-7 tweets:
   - Tweet 1: Curiosity-driven hook (no link)
   - Tweets 2-5: Key points, one insight per tweet
   - Tweet 6: Personal take or "here's what I learned"
   - Tweet 7: CTA with link to {tracked_url}
   - Each tweet under 280 characters
   - Minimal hashtags (only on last tweet)

Voice: Conversational, punchy, thought-provoking`;

const INSTAGRAM_PROMPT = `Create an Instagram caption for John Ellison's post about AI transformation and regenerative leadership.

Post Title: {title}
Post Excerpt: {excerpt}
Post Content: {content}

Generate a JSON response with:
1. "caption": The Instagram caption containing:
   - Opening hook: Pattern interrupt, provocative question, or bold statement
   - 2-3 short paragraphs with valuable insights (use line breaks)
   - Personal reflection or lesson learned
   - CTA: "Link in bio for the full article" or similar
   - Target 1,500-2,000 characters

2. "hashtags": Array of 15-25 hashtags (without the # symbol)
   - Mix of broad (#AITransformation #Leadership) and niche (#RegenerativeBusiness #VibeCoding)

Voice: Authentic, thought-provoking, approachable. Less formal than LinkedIn but still substantive.`;

async function generateWithClaude(prompt: string): Promise<string> {
    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
    });

    const textContent = message.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in response');
    }

    return textContent.text;
}

function extractJson(text: string): unknown {
    // Try to find JSON in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('No JSON found in response');
    }
    return JSON.parse(jsonMatch[0]);
}

export async function generateSubstackContent(
    title: string,
    excerpt: string,
    content: string,
    slug: string
): Promise<{ subject: string; body: string }> {
    const trackedUrl = getTrackedUrl(slug, 'substack');
    const prompt = SUBSTACK_PROMPT
        .replace('{title}', title)
        .replace('{excerpt}', excerpt)
        .replace('{content}', content.slice(0, 8000)) // Limit content length
        .replace('{tracked_url}', trackedUrl);

    const response = await generateWithClaude(prompt);
    const parsed = extractJson(response) as { subject: string; body: string };

    // Ensure the link is in the body
    if (!parsed.body.includes(slug)) {
        parsed.body += `\n\nRead the full article → ${trackedUrl}`;
    }

    return parsed;
}

export async function generateLinkedInContent(
    title: string,
    excerpt: string,
    content: string,
    slug: string
): Promise<{ post: string; hashtags: string[] }> {
    const trackedUrl = getTrackedUrl(slug, 'linkedin');
    const prompt = LINKEDIN_PROMPT
        .replace('{title}', title)
        .replace('{excerpt}', excerpt)
        .replace('{content}', content.slice(0, 8000))
        .replace('{tracked_url}', trackedUrl);

    const response = await generateWithClaude(prompt);
    return extractJson(response) as { post: string; hashtags: string[] };
}

export async function generateTwitterContent(
    title: string,
    excerpt: string,
    content: string,
    slug: string
): Promise<{ single: string; thread: string[] }> {
    const trackedUrl = getTrackedUrl(slug, 'twitter');
    const prompt = TWITTER_PROMPT
        .replace('{title}', title)
        .replace('{excerpt}', excerpt)
        .replace('{content}', content.slice(0, 8000))
        .replaceAll('{tracked_url}', trackedUrl);

    const response = await generateWithClaude(prompt);
    return extractJson(response) as { single: string; thread: string[] };
}

export async function generateInstagramContent(
    title: string,
    excerpt: string,
    content: string,
    slug: string
): Promise<{ caption: string; hashtags: string[]; bioLink: string }> {
    const prompt = INSTAGRAM_PROMPT
        .replace('{title}', title)
        .replace('{excerpt}', excerpt)
        .replace('{content}', content.slice(0, 8000));

    const response = await generateWithClaude(prompt);
    const parsed = extractJson(response) as { caption: string; hashtags: string[] };

    // Include the tracked URL for the bio link
    return {
        ...parsed,
        bioLink: getTrackedUrl(slug, 'instagram'),
    };
}

export async function generateAllContent(
    title: string,
    excerpt: string,
    content: string,
    slug: string
): Promise<GeneratedContent> {
    // Run all generations in parallel for speed
    const [substack, linkedin, twitter, instagram] = await Promise.all([
        generateSubstackContent(title, excerpt, content, slug),
        generateLinkedInContent(title, excerpt, content, slug),
        generateTwitterContent(title, excerpt, content, slug),
        generateInstagramContent(title, excerpt, content, slug),
    ]);

    return {
        substack,
        linkedin,
        twitter,
        instagram,
    };
}
