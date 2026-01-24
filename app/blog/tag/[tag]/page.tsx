import { getPostsByTag, getAllTags } from '@/lib/blog/content';
import { PostCard } from '@/components/blog/PostCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
    const tags = await getAllTags();
    return tags.map((tag) => ({
        tag: encodeURIComponent(tag),
    }));
}

export async function generateMetadata(props: { params: Promise<{ tag: string }> }) {
    const params = await props.params;
    const tag = decodeURIComponent(params.tag);

    return {
        title: `Posts tagged "${tag}" | John Ellison`,
        description: `Articles and insights tagged with ${tag}.`,
        openGraph: {
            title: `Posts tagged "${tag}" | John Ellison`,
            description: `Articles and insights tagged with ${tag}.`,
            type: 'website',
        },
    };
}

export default async function TagArchivePage(props: { params: Promise<{ tag: string }> }) {
    const params = await props.params;
    const tag = decodeURIComponent(params.tag);
    const posts = await getPostsByTag(tag);

    if (posts.length === 0) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-16">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        All Posts
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-gray-400 text-lg">#</span>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                            {tag}
                        </h1>
                    </div>
                    <p className="text-xl text-gray-400">
                        {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with &quot;{tag}&quot;
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
