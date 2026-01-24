import { getPostBySlug, getAllPosts } from '@/lib/blog/content';
import { getUser } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { ContentPackageDashboard } from './ContentPackageDashboard';

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function ContentPackagePage(props: { params: Promise<{ slug: string }> }) {
    const user = await getUser();
    const params = await props.params;

    if (!user) {
        redirect(`/admin/login?returnTo=/dashboard/content-package/${params.slug}`);
    }

    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#050507] pt-24 pb-16">
            <ContentPackageDashboard post={post} />
        </div>
    );
}
