import { getPostsByCategory, getAllCategories } from '@/lib/blog/content';
import { PostCard } from '@/components/blog/PostCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const CATEGORY_INFO: Record<string, { title: string; description: string }> = {
    'ai-transformation': {
        title: 'AI Transformation',
        description: 'Insights on organizational AI adoption, transformation strategies, and building AI-native operations.',
    },
    'regenerative-wisdom': {
        title: 'Regenerative Wisdom',
        description: 'Exploring regenerative leadership, indigenous wisdom, and what it means to build for the planetary age.',
    },
    'building-in-public': {
        title: 'Building in Public',
        description: 'Claude tutorials, vibe coding experiments, and documenting the journey of building with AI.',
    },
    'artificial-intelligence': {
        title: 'Artificial Intelligence',
        description: 'Exploring the philosophical, social, and practical implications of AI for humanity.',
    },
};

export async function generateStaticParams() {
    const categories = await getAllCategories();
    return categories.map((category) => ({
        category,
    }));
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }) {
    const params = await props.params;
    const info = CATEGORY_INFO[params.category];
    if (!info) return {};

    return {
        title: `${info.title} | John Ellison`,
        description: info.description,
        openGraph: {
            title: `${info.title} | John Ellison`,
            description: info.description,
            type: 'website',
        },
    };
}

export default async function CategoryArchivePage(props: { params: Promise<{ category: string }> }) {
    const params = await props.params;
    const info = CATEGORY_INFO[params.category];

    if (!info) {
        notFound();
    }

    const posts = await getPostsByCategory(params.category);

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
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                        <span className="text-gradient-prism">{info.title}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        {info.description}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-24 border border-white/10 rounded-2xl bg-white/5">
                        <p className="text-xl text-gray-400">No posts in this category yet.</p>
                        <Link href="/blog" className="mt-4 inline-block text-[#a78bfa] hover:underline">
                            Browse all posts
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
