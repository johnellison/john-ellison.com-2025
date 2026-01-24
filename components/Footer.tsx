'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import Link from 'next/link';
import GitHubFeed from './GitHubFeed';
import { NewsletterForm } from '@/components/NewsletterForm';

const navLinks = [
  { label: 'AI Transformation', href: '/ai-transformation' },
  { label: 'About', href: '/about' },
  { label: 'Writing', href: '/writing' },
  { label: 'Work', href: '/work' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  {
    label: 'X',
    href: 'https://twitter.com/iamjohnellison',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/iamjohnellison',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  },
  {
    label: 'GitHub',
    href: 'https://github.com/johnellison',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  },
  {
    label: 'Email',
    href: 'mailto:john@john-ellison.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    gsap.from('.footer-content', {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.footer-col', {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-8 md:px-12 border-t border-white/[0.06] bg-[#050507]"
    >
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand Column (3 cols) */}
          <div className="footer-col lg:col-span-3">
            <Link href="/" className="inline-block w-12 h-12 mb-4">
              <Image
                src="/je-logo.webp"
                alt="JE"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </Link>
            <h3 className="text-xl font-medium text-white mb-2">John Ellison</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              AI x Regeneration
            </p>
          </div>

          {/* Navigation Column (2 cols) */}
          <div className="footer-col lg:col-span-2">
            <h4 className="text-sm font-medium text-white/80 mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter Column (4 cols) - WIDER for form, with space from nav */}
          <div className="footer-col lg:col-span-4">
            <h4 className="text-sm font-medium text-white/80 mb-4 uppercase tracking-wider">
              Stay Updated
            </h4>
            <div className="flex flex-col gap-6 max-w-md">
              <NewsletterForm variant="minimal" className="w-full" />

              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                    title={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Building in Public Column (3 cols) */}
          <div className="footer-col lg:col-span-3">
            <h4 className="text-sm font-medium text-white/80 mb-4 uppercase tracking-wider">
              Building in Public
            </h4>
            <GitHubFeed />
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-20 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Pravos LLC. All rights reserved.
            </p>
            <p className="text-xs text-white/30">
              Built with AI, shipped with love.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
