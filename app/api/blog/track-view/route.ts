import { NextRequest, NextResponse } from 'next/server';
import { recordPageView } from '@/lib/blog/analytics';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slug } = body;

        if (!slug) {
            return NextResponse.json(
                { error: 'Slug is required' },
                { status: 400 }
            );
        }

        // Extract UTM parameters and referrer from the request
        const url = new URL(request.url);
        const referrer = request.headers.get('referer') || undefined;
        const userAgent = request.headers.get('user-agent') || undefined;

        // Get UTM params from the body (sent by client)
        const {
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
        } = body;

        await recordPageView({
            slug,
            referrer,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
            user_agent: userAgent,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Track view error:', error);
        return NextResponse.json(
            { error: 'Failed to track view' },
            { status: 500 }
        );
    }
}
