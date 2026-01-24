import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMetadata } from '@/types/blog';

export function PostCard({ post }: { post: BlogPostMetadata }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <article className="flex flex-col h-full bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#a78bfa]/50 hover:shadow-[0_0_30px_-5px_rgba(167,139,250,0.15)] hover:-translate-y-1">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute bottom-4 left-4 z-10">
                        <span className="px-3 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-md rounded-full border border-white/20 shadow-sm uppercase tracking-wider">
                            {post.category?.replace('-', ' ')}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex-1 flex flex-col bg-[#0c0c10]">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 font-medium">
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </time>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#a78bfa] transition-colors line-clamp-2 leading-tight">
                        {post.title}
                    </h3>

                    <p className="text-gray-400 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center text-sm font-bold text-[#a78bfa] tracking-wide uppercase">
                        Read Article
                        <svg
                            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </article>
        </Link>
    );
}
