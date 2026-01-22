'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Image from 'next/image';
import Link from 'next/link';

const connectLinks = [
  { label: 'Email', href: 'mailto:john@john-ellison.com' },
  { label: 'X (Twitter)', href: 'https://twitter.com/iamjohnellison', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/iamjohnellison', external: true },
  { label: 'GitHub', href: 'https://github.com/johnellison', external: true },
];

const workLinks = [
  { label: 'Pravos', href: 'https://pravos.xyz', external: true },
  { label: 'Vibrana', href: 'https://vibrana.ai', external: true },
  { label: 'ReFi DAO', href: 'https://refidao.com', external: true },
  { label: 'Toucan Protocol', href: 'https://toucan.earth', external: true },
];

export function FooterSection() {
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

    gsap.from('.footer-link-col', {
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
      ref={footerRef as React.RefObject<HTMLElement>}
      className="relative py-16 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="footer-content flex flex-col md:flex-row justify-between gap-12">
          {/* Left side - Logo and info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block w-12 h-12">
              <Image
                src="/je-logo.webp"
                alt="JE"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </Link>
            <h3 className="text-xl font-medium text-white">John Ellison</h3>
            <p className="text-sm text-white/50">
              Innovation for a regenerative future
            </p>
          </div>

          {/* Right side - Links */}
          <div className="flex gap-16 md:gap-24">
            {/* Connect column */}
            <div className="footer-link-col">
              <h4 className="text-sm font-medium text-white/80 mb-4 uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex flex-col gap-3">
                {connectLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Work column */}
            <div className="footer-link-col">
              <h4 className="text-sm font-medium text-white/80 mb-4 uppercase tracking-wider">
                Work
              </h4>
              <div className="flex flex-col gap-3">
                {workLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-white/40 text-center">
            &copy; 2026 Pravos LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
