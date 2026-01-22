'use client';

import { useEffect } from 'react';

export default function CosmosBackground() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const cosmos = document.getElementById('cosmos');
      if (cosmos) {
        cosmos.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="cosmos" className="cosmos">
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      <div className="nebula nebula-3"></div>
    </div>
  );
}
