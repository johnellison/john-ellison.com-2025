'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('siteNav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav id="siteNav" className="site-nav">
        <Link href="/" className="nav-logo">
          <img src="/je-logo.webp" alt="John Ellison" width={48} height={48} />
        </Link>

        <nav className="nav-links" id="desktopNav">
          <a href="https://john-ellison.com">Home</a>
          <Link href="/" className="nav-cta">AI Readiness</Link>
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {isOpen && (
        <div className="nav-mobile-overlay">
          <div className="nav-mobile-content">
            <div className="nav-mobile-links">
              <a href="https://john-ellison.com" onClick={() => setIsOpen(false)}>Home</a>
              <Link href="/" className="nav-cta" onClick={() => setIsOpen(false)}>AI Readiness</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
