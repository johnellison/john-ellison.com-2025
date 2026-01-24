import { createClient } from '@supabase/supabase-js';

// Server-side analytics client (uses service role key)
function getAnalyticsClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        return null;
    }

    return createClient(url, key);
}

export interface PageView {
    slug: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    user_agent?: string;
    country?: string;
}

export interface PostAnalytics {
    slug: string;
    total_views: number;
    unique_views: number;
    views_by_source: Record<string, number>;
    views_by_day: Array<{ date: string; views: number }>;
}

/**
 * Record a page view for a blog post
 */
export async function recordPageView(data: PageView): Promise<boolean> {
    const supabase = getAnalyticsClient();
    if (!supabase) return false;

    try {
        const { error } = await supabase.from('blog_page_views').insert({
            slug: data.slug,
            referrer: data.referrer || null,
            utm_source: data.utm_source || null,
            utm_medium: data.utm_medium || null,
            utm_campaign: data.utm_campaign || null,
            utm_content: data.utm_content || null,
            user_agent: data.user_agent || null,
            viewed_at: new Date().toISOString(),
        });

        if (error) {
            console.error('Failed to record page view:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('Analytics error:', err);
        return false;
    }
}

/**
 * Get analytics for a specific blog post
 */
export async function getPostAnalytics(slug: string): Promise<PostAnalytics | null> {
    const supabase = getAnalyticsClient();
    if (!supabase) return null;

    try {
        // Get all views for this post
        const { data: views, error } = await supabase
            .from('blog_page_views')
            .select('*')
            .eq('slug', slug);

        if (error || !views) {
            return null;
        }

        // Calculate metrics
        const viewsBySource: Record<string, number> = {};
        const viewsByDay: Record<string, number> = {};

        views.forEach((view) => {
            // Count by source
            const source = view.utm_source || 'direct';
            viewsBySource[source] = (viewsBySource[source] || 0) + 1;

            // Count by day
            const date = new Date(view.viewed_at).toISOString().split('T')[0];
            viewsByDay[date] = (viewsByDay[date] || 0) + 1;
        });

        return {
            slug,
            total_views: views.length,
            unique_views: views.length, // Simplified - could use session tracking
            views_by_source: viewsBySource,
            views_by_day: Object.entries(viewsByDay)
                .map(([date, viewCount]) => ({ date, views: viewCount }))
                .sort((a, b) => a.date.localeCompare(b.date)),
        };
    } catch (err) {
        console.error('Analytics error:', err);
        return null;
    }
}

/**
 * Get top performing posts
 */
export async function getTopPosts(limit: number = 10): Promise<Array<{ slug: string; views: number }>> {
    const supabase = getAnalyticsClient();
    if (!supabase) return [];

    try {
        const { data, error } = await supabase
            .from('blog_page_views')
            .select('slug')
            .order('viewed_at', { ascending: false });

        if (error || !data) {
            return [];
        }

        // Count views per slug
        const viewCounts: Record<string, number> = {};
        data.forEach((row) => {
            viewCounts[row.slug] = (viewCounts[row.slug] || 0) + 1;
        });

        return Object.entries(viewCounts)
            .map(([slug, views]) => ({ slug, views }))
            .sort((a, b) => b.views - a.views)
            .slice(0, limit);
    } catch (err) {
        console.error('Analytics error:', err);
        return [];
    }
}
