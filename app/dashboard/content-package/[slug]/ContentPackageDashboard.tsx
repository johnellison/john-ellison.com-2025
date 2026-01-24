'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface GeneratedContent {
    substack: { subject: string; body: string };
    linkedin: { post: string; hashtags: string[] };
    twitter: { single: string; thread: string[] };
    instagram: { caption: string; hashtags: string[]; bioLink?: string };
    cached?: boolean;
    generatedAt?: string;
}

interface GeneratedImages {
    og?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    square?: string;
}

interface ContentPackageDashboardProps {
    post: BlogPost;
}

function CopyButton({ text, label }: { text: string; label: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            title={`Copy ${label}`}
        >
            {copied ? (
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            )}
        </button>
    );
}

function ContentSection({
    title,
    icon,
    children,
    characterCount,
    maxCharacters,
}: {
    title: string;
    icon: string;
    children: React.ReactNode;
    characterCount?: number;
    maxCharacters?: number;
}) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
                    <span>{icon}</span>
                    {title}
                </h3>
                {characterCount !== undefined && maxCharacters && (
                    <span className={`text-sm ${characterCount > maxCharacters ? 'text-red-400' : 'text-gray-500'}`}>
                        {characterCount.toLocaleString()} / {maxCharacters.toLocaleString()}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
}

export function ContentPackageDashboard({ post }: ContentPackageDashboardProps) {
    const [content, setContent] = useState<GeneratedContent | null>(null);
    const [images, setImages] = useState<GeneratedImages | null>(null);
    const [loading, setLoading] = useState(false);
    const [imagesLoading, setImagesLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const canonicalUrl = `https://john-ellison.com/blog/${post.slug}`;

    const generateContent = async (regenerate = false) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/blog/generate-package', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: post.slug, regenerate }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to generate content');
            }

            setContent(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const generateImages = async () => {
        setImagesLoading(true);

        try {
            const res = await fetch('/api/blog/generate-images', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: post.slug }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to generate images');
            }

            setImages(data.images);
        } catch (err) {
            console.error('Image generation error:', err);
        } finally {
            setImagesLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <header className="mb-8">
                <Link
                    href="/dashboard/content-package"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    All Posts
                </Link>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-white mb-2">
                            {post.title}
                        </h1>
                        <p className="text-gray-400">
                            Published {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                    <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        View Post →
                    </Link>
                </div>
            </header>

            {/* Generate Button */}
            {!content && !loading && (
                <div className="text-center py-16 border border-white/10 rounded-xl bg-white/5 mb-8">
                    <h2 className="font-display text-xl font-semibold text-white mb-4">
                        Ready to generate your content package?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        AI will create platform-specific content for Substack, LinkedIn, X, and Instagram.
                    </p>
                    <button
                        onClick={() => generateContent()}
                        className="px-6 py-3 bg-[#a78bfa] hover:bg-[#8b5cf6] text-white font-semibold rounded-xl transition-colors"
                    >
                        Generate Content Package
                    </button>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center py-16 border border-white/10 rounded-xl bg-white/5 mb-8">
                    <div className="inline-flex items-center gap-3 text-white">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span className="font-display text-lg">Generating content...</span>
                    </div>
                    <p className="text-gray-500 mt-4">This usually takes 15-30 seconds</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 mb-8">
                    <p className="font-medium mb-2">Error generating content</p>
                    <p className="text-sm">{error}</p>
                    <button
                        onClick={() => generateContent()}
                        className="mt-4 text-sm underline hover:no-underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Generated Content */}
            {content && (
                <div className="space-y-6">
                    {/* Meta info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>
                            {content.cached ? 'Loaded from cache' : 'Freshly generated'} •{' '}
                            {content.generatedAt && new Date(content.generatedAt).toLocaleString()}
                        </span>
                        <button
                            onClick={() => generateContent(true)}
                            disabled={loading}
                            className="text-[#a78bfa] hover:underline disabled:opacity-50"
                        >
                            Regenerate
                        </button>
                    </div>

                    {/* Canonical URL */}
                    <ContentSection title="Canonical URL" icon="🔗">
                        <div className="flex items-center gap-2">
                            <code className="flex-1 p-3 bg-black/30 rounded-lg text-[#a78bfa] text-sm overflow-x-auto">
                                {canonicalUrl}
                            </code>
                            <CopyButton text={canonicalUrl} label="URL" />
                        </div>
                    </ContentSection>

                    {/* Substack */}
                    <ContentSection title="Substack Newsletter" icon="📧">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Subject Line</label>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 p-3 bg-black/30 rounded-lg text-white text-sm">
                                        {content.substack.subject}
                                    </code>
                                    <CopyButton text={content.substack.subject} label="subject" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Body</label>
                                <div className="flex gap-2">
                                    <pre className="flex-1 p-4 bg-black/30 rounded-lg text-gray-300 text-sm whitespace-pre-wrap font-sans">
                                        {content.substack.body}
                                    </pre>
                                    <CopyButton text={content.substack.body} label="body" />
                                </div>
                            </div>
                        </div>
                    </ContentSection>

                    {/* LinkedIn */}
                    <ContentSection
                        title="LinkedIn"
                        icon="💼"
                        characterCount={content.linkedin.post.length}
                        maxCharacters={3000}
                    >
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <pre className="flex-1 p-4 bg-black/30 rounded-lg text-gray-300 text-sm whitespace-pre-wrap font-sans">
                                    {content.linkedin.post}
                                </pre>
                                <CopyButton text={content.linkedin.post} label="post" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Hashtags</label>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 p-3 bg-black/30 rounded-lg text-[#a78bfa] text-sm">
                                        {content.linkedin.hashtags.map(h => `#${h}`).join(' ')}
                                    </code>
                                    <CopyButton text={content.linkedin.hashtags.map(h => `#${h}`).join(' ')} label="hashtags" />
                                </div>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Twitter Single */}
                    <ContentSection
                        title="X (Twitter) - Single Post"
                        icon="🐦"
                        characterCount={content.twitter.single.length}
                        maxCharacters={280}
                    >
                        <div className="flex gap-2">
                            <pre className="flex-1 p-4 bg-black/30 rounded-lg text-gray-300 text-sm whitespace-pre-wrap font-sans">
                                {content.twitter.single}
                            </pre>
                            <CopyButton text={content.twitter.single} label="tweet" />
                        </div>
                    </ContentSection>

                    {/* Twitter Thread */}
                    <ContentSection title="X (Twitter) - Thread" icon="🧵">
                        <div className="space-y-3">
                            {content.twitter.thread.map((tweet, i) => (
                                <div key={i} className="flex gap-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs text-gray-500">{i + 1}/{content.twitter.thread.length}</span>
                                            <span className={`text-xs ${tweet.length > 280 ? 'text-red-400' : 'text-gray-500'}`}>
                                                {tweet.length}/280
                                            </span>
                                        </div>
                                        <pre className="p-3 bg-black/30 rounded-lg text-gray-300 text-sm whitespace-pre-wrap font-sans">
                                            {tweet}
                                        </pre>
                                    </div>
                                    <CopyButton text={tweet} label={`tweet ${i + 1}`} />
                                </div>
                            ))}
                            <div className="pt-2">
                                <CopyButton
                                    text={content.twitter.thread.join('\n\n---\n\n')}
                                    label="full thread"
                                />
                                <span className="ml-2 text-sm text-gray-500">Copy full thread</span>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Instagram */}
                    <ContentSection
                        title="Instagram"
                        icon="📸"
                        characterCount={content.instagram.caption.length}
                        maxCharacters={2200}
                    >
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <pre className="flex-1 p-4 bg-black/30 rounded-lg text-gray-300 text-sm whitespace-pre-wrap font-sans">
                                    {content.instagram.caption}
                                </pre>
                                <CopyButton text={content.instagram.caption} label="caption" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">
                                    Hashtags ({content.instagram.hashtags.length})
                                </label>
                                <div className="flex items-start gap-2">
                                    <code className="flex-1 p-3 bg-black/30 rounded-lg text-[#a78bfa] text-sm break-all">
                                        {content.instagram.hashtags.map(h => `#${h}`).join(' ')}
                                    </code>
                                    <CopyButton text={content.instagram.hashtags.map(h => `#${h}`).join(' ')} label="hashtags" />
                                </div>
                            </div>
                            {content.instagram.bioLink && (
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">
                                        Bio Link (with UTM tracking)
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 p-3 bg-black/30 rounded-lg text-[#a78bfa] text-sm overflow-x-auto">
                                            {content.instagram.bioLink}
                                        </code>
                                        <CopyButton text={content.instagram.bioLink} label="bio link" />
                                    </div>
                                </div>
                            )}
                            <div className="pt-2">
                                <CopyButton
                                    text={`${content.instagram.caption}\n\n${content.instagram.hashtags.map(h => `#${h}`).join(' ')}`}
                                    label="caption with hashtags"
                                />
                                <span className="ml-2 text-sm text-gray-500">Copy caption + hashtags</span>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Promo Images */}
                    <ContentSection title="Promotional Images" icon="🖼️">
                        {!images && !imagesLoading && (
                            <div className="text-center py-8">
                                <p className="text-gray-400 mb-4">Generate branded images for each platform</p>
                                <button
                                    onClick={generateImages}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white transition-colors"
                                >
                                    Generate Images
                                </button>
                            </div>
                        )}

                        {imagesLoading && (
                            <div className="text-center py-8">
                                <div className="inline-flex items-center gap-2 text-gray-400">
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Generating images...</span>
                                </div>
                            </div>
                        )}

                        {images && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {[
                                        { key: 'og', label: 'OG Image', size: '1200×630' },
                                        { key: 'linkedin', label: 'LinkedIn', size: '1200×627' },
                                        { key: 'twitter', label: 'X/Twitter', size: '1200×675' },
                                        { key: 'instagram', label: 'Instagram', size: '1080×1350' },
                                        { key: 'square', label: 'Square', size: '1080×1080' },
                                    ].map(({ key, label, size }) => (
                                        <div key={key} className="text-center">
                                            <div className="aspect-video bg-black/30 rounded-lg overflow-hidden mb-2 border border-white/10">
                                                {images[key as keyof GeneratedImages] && (
                                                    <img
                                                        src={images[key as keyof GeneratedImages]}
                                                        alt={label}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <p className="text-sm text-white font-medium">{label}</p>
                                            <p className="text-xs text-gray-500">{size}</p>
                                            {images[key as keyof GeneratedImages] && (
                                                <a
                                                    href={images[key as keyof GeneratedImages]}
                                                    download={`${post.slug}-${key}.png`}
                                                    className="inline-block mt-2 text-xs text-[#a78bfa] hover:underline"
                                                >
                                                    Download
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={generateImages}
                                    disabled={imagesLoading}
                                    className="text-sm text-[#a78bfa] hover:underline disabled:opacity-50"
                                >
                                    Regenerate Images
                                </button>
                            </div>
                        )}
                    </ContentSection>
                </div>
            )}
        </div>
    );
}
