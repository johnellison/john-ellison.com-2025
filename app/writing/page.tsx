import type { Metadata } from 'next';
import { RainbowGrid } from '@/components/gsap/RainbowGrid';
import { getPostBySlug } from '@/lib/blog/content';
import { WritingHero } from './WritingHero';
import { PostsGrid } from './PostsGrid';
import { RegeneraGrid } from './RegeneraGrid';

export const metadata: Metadata = {
  title: 'Writing | John Ellison — Technology & Wisdom',
  description: "Two publications exploring the intersection of technology and wisdom. Building in public with AI, and discovering what regeneration means for the planetary age.",
  openGraph: {
    type: 'website',
    url: 'https://john-ellison.com/writing',
    title: 'Writing | John Ellison — Technology & Wisdom',
    description: "Two publications exploring the intersection of technology and wisdom.",
    images: ['https://john-ellison.com/og-image.jpg'],
  },
};

export default async function WritingPage() {
  const featuredPost = await getPostBySlug('the-8-month-window');

  return (
    <>
      <RainbowGrid />
      <main className="relative z-10 pt-20">
        <WritingHero featuredPost={featuredPost} />
        <PostsGrid />

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <RegeneraGrid />
      </main>
    </>
  );
}
