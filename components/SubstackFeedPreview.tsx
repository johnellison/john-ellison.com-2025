'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
}

export default function SubstackFeedPreview() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/substack');
        const data = await response.json();
        setPosts((data.posts || []).slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-white/10 rounded w-full mb-1" />
            <div className="h-3 bg-white/5 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <a
        href="https://iamjohnellison.substack.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
        Read on Substack
      </a>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <a
          key={post.link}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors line-clamp-2">
            {post.title}
          </p>
          <p className="text-xs text-white/30 mt-0.5">
            {formatDate(post.pubDate)}
          </p>
        </a>
      ))}
      <Link
        href="/writing"
        className="block text-xs text-white/40 hover:text-white/60 transition-colors mt-2"
      >
        View all posts →
      </Link>
    </div>
  );
}
