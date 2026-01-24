import { getRelatedPosts } from '@/lib/blog/content';
import { PostCard } from './PostCard';

interface RelatedPostsProps {
    currentSlug: string;
}

export async function RelatedPosts({ currentSlug }: RelatedPostsProps) {
    const relatedPosts = await getRelatedPosts(currentSlug, 3);

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <section className="mt-20 pt-16 border-t border-white/10">
            <h2 className="font-display text-3xl font-bold text-white mb-8">
                Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </section>
    );
}
