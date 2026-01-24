import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogPostMetadata } from '@/types/blog';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        // Check for index.mdx first (directory structure)
        const dirPath = path.join(CONTENT_DIR, slug);
        let filePath = path.join(dirPath, 'index.mdx');

        // Fallback to slug.mdx if directory style not found
        if (!fs.existsSync(filePath)) {
            filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
        }

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        const readStats = readingTime(content);

        return {
            slug,
            title: data.title,
            publishedAt: data.publishedAt,
            updatedAt: data.updatedAt,
            excerpt: data.excerpt,
            featuredImage: data.featuredImage,
            category: data.category,
            tags: data.tags || [],
            status: data.status || 'draft',
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            content,
            readingTime: readStats.text,
        } as BlogPost;
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

export async function getAllPosts(): Promise<BlogPostMetadata[]> {
    try {
        // Read directory content
        if (!fs.existsSync(CONTENT_DIR)) {
            return [];
        }

        const entries = fs.readdirSync(CONTENT_DIR);

        const posts = entries
            .map((entry) => {
                // Handle directory-style posts
                let slug = entry;
                let filePath = path.join(CONTENT_DIR, entry, 'index.mdx');

                // Handle file-style posts (if present)
                if (!fs.existsSync(filePath)) {
                    if (entry.endsWith('.mdx')) {
                        slug = entry.replace('.mdx', '');
                        filePath = path.join(CONTENT_DIR, entry);
                    } else {
                        return null; // Skip non-mdx files or directories without index.mdx
                    }
                }

                const fileContent = fs.readFileSync(filePath, 'utf8');
                const { data, content } = matter(fileContent);
                const readStats = readingTime(content);

                return {
                    slug,
                    title: data.title,
                    publishedAt: data.publishedAt,
                    updatedAt: data.updatedAt,
                    excerpt: data.excerpt,
                    featuredImage: data.featuredImage,
                    category: data.category,
                    tags: data.tags || [],
                    status: data.status || 'draft',
                    seoTitle: data.seoTitle,
                    seoDescription: data.seoDescription,
                    readingTime: readStats.text,
                } as BlogPostMetadata;
            })
            .filter((post): post is BlogPostMetadata => post !== null)
            .filter((post) => {
                // Filter out drafts in production
                if (process.env.NODE_ENV === 'production') {
                    return post.status === 'published';
                }
                return true; // Show all in development
            })
            .sort((a, b) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));

        return posts;
    } catch (error) {
        console.error('Error getting all posts:', error);
        return [];
    }
}

export async function getPostsByCategory(category: string): Promise<BlogPostMetadata[]> {
    const posts = await getAllPosts();
    return posts.filter((post) => post.category === category);
}

export async function getPostsByTag(tag: string): Promise<BlogPostMetadata[]> {
    const posts = await getAllPosts();
    return posts.filter((post) => post.tags.includes(tag));
}

export async function getAllCategories(): Promise<string[]> {
    const posts = await getAllPosts();
    const categories = new Set(posts.map((post) => post.category).filter(Boolean));
    return Array.from(categories) as string[];
}

export async function getAllTags(): Promise<string[]> {
    const posts = await getAllPosts();
    const tags = new Set(posts.flatMap((post) => post.tags));
    return Array.from(tags);
}

/**
 * Get related posts based on category and tag overlap
 * Scoring: Same category = 3 points, each shared tag = 1 point
 */
export async function getRelatedPosts(
    currentSlug: string,
    limit: number = 3
): Promise<BlogPostMetadata[]> {
    const posts = await getAllPosts();
    const currentPost = posts.find((p) => p.slug === currentSlug);

    if (!currentPost) {
        return [];
    }

    const scoredPosts = posts
        .filter((post) => post.slug !== currentSlug)
        .map((post) => {
            let score = 0;

            // Same category = 3 points
            if (post.category && post.category === currentPost.category) {
                score += 3;
            }

            // Shared tags = 1 point each
            const sharedTags = post.tags.filter((tag) =>
                currentPost.tags.includes(tag)
            );
            score += sharedTags.length;

            return { post, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    return scoredPosts.map(({ post }) => post);
}
