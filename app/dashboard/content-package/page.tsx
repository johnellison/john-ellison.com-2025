import { getAllPosts } from '@/lib/blog/content';
import { getUser } from '@/lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SignOutButton } from './SignOutButton';

export default async function ContentPackageIndexPage() {
    const user = await getUser();

    if (!user) {
        redirect('/admin/login?returnTo=/dashboard/content-package');
    }

    const posts = await getAllPosts();

    return (
        <div className="min-h-screen bg-[#050507] pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6">
                <header className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="font-display text-4xl font-bold text-white">
                            Content Packages
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">{user.email}</span>
                            <SignOutButton />
                        </div>
                    </div>
                    <p className="text-gray-400 text-lg">
                        Generate distribution assets for your blog posts
                    </p>
                </header>

                <div className="space-y-4">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/dashboard/content-package/${post.slug}`}
                            className="block p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#a78bfa]/50 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-display text-xl font-semibold text-white group-hover:text-[#a78bfa] transition-colors">
                                        {post.title}
                                    </h2>
                                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                        <span className="uppercase tracking-wider text-[#a78bfa]">
                                            {post.category?.replace('-', ' ')}
                                        </span>
                                        <span>•</span>
                                        <time dateTime={post.publishedAt}>
                                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </time>
                                        <span>•</span>
                                        <span className={post.status === 'published' ? 'text-green-400' : 'text-yellow-400'}>
                                            {post.status}
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className="w-5 h-5 text-gray-500 group-hover:text-[#a78bfa] group-hover:translate-x-1 transition-all"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}

                    {posts.length === 0 && (
                        <div className="text-center py-16 border border-white/10 rounded-xl bg-white/5">
                            <p className="text-gray-400">No posts yet. Create a post in /content/blog/ to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
