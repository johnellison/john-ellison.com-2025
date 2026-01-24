import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPostBySlug } from '@/lib/blog/content';
import { generateAllContent, GeneratedContent } from '@/lib/blog/generate-content';

// Rate limiting: track requests per user
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function checkRateLimit(userId: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(userId);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (entry.count >= RATE_LIMIT) {
        return false;
    }

    entry.count++;
    return true;
}

// Supabase client for caching
async function getServiceClient() {
    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        return null;
    }

    return createServiceClient(url, key);
}

interface CachedPackage {
    id: string;
    slug: string;
    generated_at: string;
    content: GeneratedContent;
    post_updated_at: string;
}

async function getCachedPackage(slug: string): Promise<CachedPackage | null> {
    const supabase = await getServiceClient();
    if (!supabase) return null;

    try {
        const { data, error } = await supabase
            .from('content_packages')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) return null;
        return data as CachedPackage;
    } catch {
        return null;
    }
}

async function cachePackage(
    slug: string,
    content: GeneratedContent,
    postUpdatedAt: string
): Promise<void> {
    const supabase = await getServiceClient();
    if (!supabase) return;

    try {
        await supabase.from('content_packages').upsert({
            slug,
            content,
            post_updated_at: postUpdatedAt,
            generated_at: new Date().toISOString(),
        }, {
            onConflict: 'slug',
        });
    } catch (error) {
        console.error('Failed to cache content package:', error);
    }
}

export async function POST(request: NextRequest) {
    // Check authentication with Supabase
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    // Check rate limit
    if (!checkRateLimit(user.id)) {
        return NextResponse.json(
            { error: 'Rate limit exceeded. Try again later.' },
            { status: 429 }
        );
    }

    try {
        const { slug, regenerate = false } = await request.json();

        if (!slug) {
            return NextResponse.json(
                { error: 'Slug is required' },
                { status: 400 }
            );
        }

        // Get the post
        const post = await getPostBySlug(slug);
        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        const postUpdatedAt = post.updatedAt || post.publishedAt;

        // Check cache first (unless regenerate is requested)
        if (!regenerate) {
            const cached = await getCachedPackage(slug);
            if (cached && cached.post_updated_at === postUpdatedAt) {
                return NextResponse.json({
                    ...cached.content,
                    cached: true,
                    generatedAt: cached.generated_at,
                });
            }
        }

        // Check for API key
        if (!process.env.ANTHROPIC_API_KEY) {
            return NextResponse.json(
                { error: 'Anthropic API key not configured' },
                { status: 500 }
            );
        }

        // Generate content
        const content = await generateAllContent(
            post.title,
            post.excerpt,
            post.content,
            post.slug
        );

        // Cache the result
        await cachePackage(slug, content, postUpdatedAt);

        return NextResponse.json({
            ...content,
            cached: false,
            generatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Content generation error:', error);

        // Provide more specific error messages
        if (error instanceof Error) {
            if (error.message.includes('API key')) {
                return NextResponse.json(
                    { error: 'API configuration error' },
                    { status: 500 }
                );
            }
            if (error.message.includes('rate')) {
                return NextResponse.json(
                    { error: 'AI service rate limit reached. Please try again in a few minutes.' },
                    { status: 429 }
                );
            }
        }

        return NextResponse.json(
            { error: 'Failed to generate content. Please try again.' },
            { status: 500 }
        );
    }
}
