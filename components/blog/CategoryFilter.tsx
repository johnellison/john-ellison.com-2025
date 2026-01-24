'use client';

import { useState } from 'react';
import { BlogPostMetadata } from '@/types/blog';
import { PostCard } from './PostCard';

interface CategoryFilterProps {
    posts: BlogPostMetadata[];
    categories: string[];
}

function formatCategory(category: string): string {
    return category
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function CategoryFilter({ posts, categories }: CategoryFilterProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredPosts = activeCategory
        ? posts.filter((post) => post.category === activeCategory)
        : posts;

    return (
        <>
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCategory === null
                            ? 'bg-[#a78bfa] text-white shadow-lg shadow-purple-500/25'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                >
                    All Posts
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeCategory === category
                                ? 'bg-[#a78bfa] text-white shadow-lg shadow-purple-500/25'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                    >
                        {formatCategory(category)}
                    </button>
                ))}
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-24 border border-white/10 rounded-2xl bg-white/5">
                    <p className="text-xl text-gray-400">
                        No posts in this category yet.
                    </p>
                </div>
            )}
        </>
    );
}
