export interface BlogPost {
    slug: string;
    title: string;
    publishedAt: string;
    updatedAt?: string;
    excerpt: string;
    featuredImage: string;
    category: 'ai-transformation' | 'regenerative-wisdom' | 'building-in-public';
    tags: string[];
    status: 'draft' | 'published';
    seoTitle?: string;
    seoDescription?: string;
    content: string; // The raw MDX content
    readingTime?: string;
}

export type BlogPostMetadata = Omit<BlogPost, 'content'>;
