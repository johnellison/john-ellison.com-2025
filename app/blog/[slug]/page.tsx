import { getPostBySlug, getAllPosts } from '@/lib/blog/content';
import { PostContent } from '@/components/blog/PostContent';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { ViewTracker } from '@/components/blog/ViewTracker';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const BASE_URL = 'https://john-ellison.com';

function generateJsonLd(post: {
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;
    updatedAt?: string;
    featuredImage: string;
    seoTitle?: string;
    seoDescription?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        image: `${BASE_URL}${post.featuredImage}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
            '@type': 'Person',
            name: 'John Ellison',
            url: BASE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: 'John Ellison',
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/john-e-wedding-headshot.webp`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/blog/${post.slug}`,
        },
    };
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);
    if (!post) return {};

    const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

    return {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt || post.publishedAt,
            url: canonicalUrl,
            images: [`${BASE_URL}${post.featuredImage}`],
            authors: ['John Ellison'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt,
            images: [`${BASE_URL}${post.featuredImage}`],
            creator: '@iamjohnellison',
        },
    };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const jsonLd = generateJsonLd(post);

    return (
        <div className="min-h-screen bg-[#050507]">
            <Suspense fallback={null}>
                <ViewTracker slug={post.slug} />
            </Suspense>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full flex items-end">
                <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/50 to-black/30" />

                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-24">
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base font-medium">
                        <Link href="/blog" className="text-white/60 hover:text-white transition-colors">
                            Blog
                        </Link>
                        <span className="text-white/30">•</span>
                        <Link href={`/blog/category/${post.category}`} className="text-[#a78bfa] uppercase tracking-wider hover:text-white transition-colors">
                            {post.category?.replace('-', ' ')}
                        </Link>
                        <span className="text-white/30">•</span>
                        <span className="text-white/80">{post.readingTime}</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-8 drop-shadow-lg">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 relative border border-white/20">
                            <Image
                                src="/john-e-wedding-headshot.webp"
                                alt="John Ellison"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-white font-medium">John Ellison</p>
                            <time className="text-sm text-gray-400" dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </time>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar TOC (Desktop) */}
                    <div id="blog-sidebar" className="hidden lg:block lg:col-span-3 transition-opacity duration-500">
                        <div className="sticky top-8">
                            <TableOfContents content={post.content} sidebar />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 lg:col-start-5">
                        <TableOfContents content={post.content} />
                        <PostContent source={post.content} />

                        {/* Tags & Share */}
                        <div className="mt-16 pt-8 border-t border-white/10">
                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags.map(tag => (
                                        <Link
                                            key={tag}
                                            href={`/blog/tag/${encodeURIComponent(tag)}`}
                                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            )}
                            <ShareButtons
                                url={`${BASE_URL}/blog/${post.slug}`}
                                title={post.title}
                                description={post.excerpt}
                            />
                        </div>

                        {/* CTA Section (Rich Card) - Commented out to allow per-post embedding via MDX */}
                        {/* <div className="mt-20 rounded-2xl bg-[#0f0f12] border border-white/10 overflow-hidden group hover:border-purple-500/30 transition-all shadow-2xl">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="relative w-full md:w-2/5 min-h-[300px] md:min-h-auto">
                                    <Image
                                        src="/images/ai-transformation/john-and-osho-square-large.jpeg"
                                        alt="AI Transformation Workshop"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay" />
                                </div>

                                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-left bg-gradient-to-br from-[#1a1a2e] to-[#0f0f12] relative">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                                    <div className="relative z-10">
                                        <h3 className="font-display text-lg md:text-xl font-bold text-white mb-4 leading-tight">
                                            Ready to transform <br className="hidden md:block" /> your organization?
                                        </h3>
                                        <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                                            Take the free AI Readiness Assessment and get a personalized report on your team's capability to adopt AI.
                                        </p>
                                        <div>
                                            <Link href="/ai-transformation" className="btn-primary inline-flex text-sm md:text-base px-6 py-3">
                                                Start Assessment
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* Related Posts */}
                        <RelatedPosts currentSlug={post.slug} />
                    </div>
                </div>
            </div>
        </div>
    );
}
