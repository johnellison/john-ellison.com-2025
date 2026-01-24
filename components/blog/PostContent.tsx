import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkUnwrapImages from 'remark-unwrap-images';

// Custom components passed to MDX
const components: MDXComponents = {
    Image: (props: any) => (
        <div className="my-8 rounded-lg overflow-hidden border border-white/10 bg-white/5">
            <Image
                {...props}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
            />
            {props.alt && (
                <div className="text-center text-sm text-gray-500 mt-2 px-4 italic">
                    {props.alt}
                </div>
            )}
        </div>
    ),
    img: (props: any) => (
        <div className="my-8 rounded-lg overflow-hidden border border-white/10 bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...props} className="w-full h-auto object-cover" alt={props.alt || ''} />
            {props.alt && (
                <div className="text-center text-sm text-gray-500 mt-2 px-4 italic">
                    {props.alt}
                </div>
            )}
        </div>
    ),
    a: ({ href, children, ...props }: any) => {
        const isExternal = href?.startsWith('http');
        return (
            <Link
                href={href || '#'}
                className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors underline decoration-white/20 hover:decoration-[#a78bfa] underline-offset-4"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...props}
            >
                {children}
            </Link>
        );
    },
    hr: () => <hr className="border-white/10 my-12" />,
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-[#a78bfa] bg-white/5 py-4 px-6 rounded-r-lg italic text-gray-200 my-8 shadow-sm">
            {props.children}
        </blockquote>
    ),
    code: (props: any) => (
        <code className="bg-white/10 text-[#d8b4fe] px-1.5 py-0.5 rounded font-mono text-sm border border-white/10">
            {props.children}
        </code>
    ),
    pre: (props: any) => (
        <div className="my-6 rounded-lg overflow-hidden border border-white/10 bg-[#0f0f12] shadow-xl">
            <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300">
                {props.children}
            </pre>
        </div>
    ),
};

export function PostContent({ source }: { source: string }) {
    return (
        <article className="prose prose-invert prose-lg max-w-none 
      prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
      prose-p:text-gray-300 prose-p:leading-relaxed
      prose-a:no-underline
      prose-strong:text-white prose-strong:font-semibold
      prose-ul:text-gray-300 prose-ol:text-gray-300
      prose-li:marker:text-[#a78bfa]
      prose-img:m-0
    ">
            <MDXRemote
                source={source}
                components={components}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkUnwrapImages],
                        rehypePlugins: [
                            rehypeSlug,
                            [rehypePrettyCode, { theme: 'one-dark-pro' }]
                        ]
                    }
                }}
            />
        </article>
    );
}
