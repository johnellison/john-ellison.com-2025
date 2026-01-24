import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPostBySlug } from '@/lib/blog/content';
import { generatePromoImages } from '@/lib/blog/generate-images';

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

    try {
        const { slug } = await request.json();

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

        // Generate images
        const images = await generatePromoImages(
            post.slug,
            post.title,
            post.category || 'blog',
            post.featuredImage
        );

        return NextResponse.json({
            success: true,
            images,
        });
    } catch (error) {
        console.error('Image generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate images' },
            { status: 500 }
        );
    }
}
