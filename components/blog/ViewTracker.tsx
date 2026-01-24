'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface ViewTrackerProps {
    slug: string;
}

export function ViewTracker({ slug }: ViewTrackerProps) {
    const searchParams = useSearchParams();

    useEffect(() => {
        // Don't track in development
        if (process.env.NODE_ENV === 'development') {
            return;
        }

        // Track the view
        const trackView = async () => {
            try {
                await fetch('/api/blog/track-view', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        slug,
                        utm_source: searchParams.get('utm_source'),
                        utm_medium: searchParams.get('utm_medium'),
                        utm_campaign: searchParams.get('utm_campaign'),
                        utm_content: searchParams.get('utm_content'),
                    }),
                });
            } catch (err) {
                // Silently fail - analytics should not break the page
                console.debug('Failed to track view:', err);
            }
        };

        trackView();
    }, [slug, searchParams]);

    // This component doesn't render anything
    return null;
}
