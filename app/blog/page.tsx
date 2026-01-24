import { getAllPosts, getAllCategories } from '@/lib/blog/content';
import { CategoryFilter } from '@/components/blog/CategoryFilter';

export const metadata = {
    title: 'Blog | John Ellison',
    description: 'Wisdom on AI transformation, regenerative leadership, and building in public.',
};

export default async function BlogIndex() {
    const [posts, categories] = await Promise.all([
        getAllPosts(),
        getAllCategories(),
    ]);

    return (
        <div className="min-h-screen pt-32 pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-12 text-center max-w-3xl mx-auto">
                    <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
                        <span className="text-gradient-prism">Regenerative</span> Wisdom
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Exploring the intersection of artificial intelligence, organizational transformation, and regenerative leadership.
                    </p>
                </header>

                <CategoryFilter posts={posts} categories={categories} />
            </div>
        </div>
    );
}
