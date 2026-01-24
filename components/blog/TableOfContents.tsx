'use client';

import { useEffect, useState } from 'react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
    sidebar?: boolean;
}

function extractHeadings(content: string): TocItem[] {
    const headingRegex = /^(#{2})\s+(.+)$/gm;
    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        // Generate slug similar to rehype-slug
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();

        headings.push({ id, text, level });
    }

    return headings;
}

export function TableOfContents({ content, sidebar = false }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isExpanded, setIsExpanded] = useState(false);
    const headings = extractHeadings(content);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -80% 0px',
                threshold: 0,
            }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length < 3) {
        return null; // Don't show TOC for short posts
    }

    if (sidebar) {
        return (
            <nav className="hidden lg:block">
                <h4 className="font-display font-semibold text-white/50 mb-6 text-sm uppercase tracking-wider">
                    On this page
                </h4>
                <ul className="space-y-3">
                    {headings.map(({ id, text, level }) => (
                        <li
                            key={id}
                            style={{ paddingLeft: `${(level - 2) * 12}px` }}
                        >
                            <a
                                href={`#${id}`}
                                className={`block text-sm transition-colors py-1 border-l-2 pl-4 -ml-4 ${activeId === id
                                    ? 'border-[#a78bfa] text-[#a78bfa] font-medium'
                                    : 'border-transparent text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }

    return (
        <nav className="mb-12 lg:hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
                <span className="font-display font-semibold text-white">Table of Contents</span>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isExpanded && (
                <div className="mt-2 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <ul className="space-y-2">
                        {headings.map(({ id, text, level }) => (
                            <li
                                key={id}
                                style={{ paddingLeft: `${(level - 2) * 16}px` }}
                            >
                                <a
                                    href={`#${id}`}
                                    onClick={() => setIsExpanded(false)}
                                    className={`block py-1 text-sm transition-colors ${activeId === id
                                        ? 'text-[#a78bfa] font-medium'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
