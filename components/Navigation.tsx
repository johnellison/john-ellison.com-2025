'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  // Check if services dropdown should be highlighted
  const isServicesActive = () => {
    return pathname?.startsWith('/ai-transformation') ||
           pathname?.startsWith('/executive-ai-transformation') ||
           pathname?.startsWith('/services');
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle mouse enter/leave for dropdown
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  return (
    <>
      {/* ========================================
          TOP NAVIGATION
          ======================================== */}
      <nav className="site-nav" id="siteNav">
        <Link href="/" className="nav-logo">
          <img
            src="/je-logo.webp"
            srcSet="/je-logo.webp 1x, /je-logo.webp 2x, /je-logo.webp 3x"
            alt="JE"
            width={48}
            height={48}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links" id="desktopNav" aria-label="Desktop navigation">
          {/* Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`nav-link-dropdown flex items-center gap-1 ${isServicesActive() ? 'active' : ''}`}
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="w-72 bg-[#0B0B0F]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-2">
                  <Link
                    href="/services"
                    className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-violet-400">
                          <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">All Services</div>
                        <div className="text-xs text-white/50">Compare offerings</div>
                      </div>
                    </div>
                  </Link>

                  <div className="h-px bg-white/10 my-2" />

                  <Link
                    href="/executive-ai-transformation"
                    className={`block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors ${
                      isActive('/executive-ai-transformation') ? 'bg-white/5' : ''
                    }`}
                    onClick={() => setServicesOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-violet-400">
                          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">For Executives</div>
                        <div className="text-xs text-white/50">Personal AI transformation</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/ai-transformation"
                    className={`block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors ${
                      isActive('/ai-transformation') ? 'bg-white/5' : ''
                    }`}
                    onClick={() => setServicesOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-blue-400">
                          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">For Organizations</div>
                        <div className="text-xs text-white/50">Team & company AI</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
          <Link href="/writing" className={isActive('/writing') ? 'active' : ''}>Writing</Link>
          <Link href="/work" className={isActive('/work') ? 'active' : ''}>Work</Link>
          <Link href="/podcast" className={isActive('/podcast') ? 'active' : ''}>Podcast</Link>
          <Link href="/contact" className="nav-cta">Work With Me</Link>
        </nav>

        {/* Desktop Socials */}
        <div className="nav-socials" id="desktopSocials">
          <a href="https://twitter.com/iamjohnellison" target="_blank" rel="noopener noreferrer" title="X">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/iamjohnellison" target="_blank" rel="noopener noreferrer" title="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/iamjohnellison" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="https://github.com/johnellison" target="_blank" rel="noopener noreferrer" title="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`nav-toggle ${isOpen ? 'active' : ''}`}
          id="navToggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <div className="nav-toggle-inner">
            <span className="nav-toggle-line"></span>
            <span className="nav-toggle-line"></span>
            <span className="nav-toggle-line"></span>
          </div>
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`nav-mobile-overlay ${isOpen ? 'active' : ''}`}
        id="navMobileOverlay"
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
      >
        <div className="nav-mobile-content">
          <div className="nav-mobile-links">
            {/* Services Group */}
            <div className="mb-2">
              <span className="block px-4 py-2 type-xs text-white/40 uppercase tracking-wider">Services</span>
              <Link
                href="/services"
                onClick={closeMenu}
                className={`pl-8 ${isActive('/services') && pathname === '/services' ? 'active' : ''}`}
              >
                All Services
              </Link>
              <Link
                href="/executive-ai-transformation"
                onClick={closeMenu}
                className={`pl-8 ${isActive('/executive-ai-transformation') ? 'active' : ''}`}
              >
                For Executives
              </Link>
              <Link
                href="/ai-transformation"
                onClick={closeMenu}
                className={`pl-8 ${isActive('/ai-transformation') ? 'active' : ''}`}
              >
                For Organizations
              </Link>
            </div>

            <div className="h-px bg-white/10 my-4" />

            <Link href="/about" onClick={closeMenu} className={isActive('/about') ? 'active' : ''}>About</Link>
            <Link href="/writing" onClick={closeMenu} className={isActive('/writing') ? 'active' : ''}>Writing</Link>
            <Link href="/work" onClick={closeMenu} className={isActive('/work') ? 'active' : ''}>Work</Link>
            <Link href="/podcast" onClick={closeMenu} className={isActive('/podcast') ? 'active' : ''}>Podcast</Link>
            <Link href="/contact" className="nav-cta" onClick={closeMenu}>Work With Me</Link>
          </div>

          <div className="nav-mobile-socials">
            <a href="https://twitter.com/iamjohnellison" target="_blank" rel="noopener noreferrer" title="X">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/iamjohnellison" target="_blank" rel="noopener noreferrer" title="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/iamjohnellison" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://github.com/johnellison" target="_blank" rel="noopener noreferrer" title="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
