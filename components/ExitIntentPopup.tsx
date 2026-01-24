'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, FileText, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

interface ExitIntentPopupProps {
  onClose?: () => void;
}

export default function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Mark as shown for this session
    sessionStorage.setItem('exitIntentShown', 'true');
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem('exitIntentShown') === 'true') {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let hasTriggered = false;
    let scrollPauseTimer: NodeJS.Timeout;
    let lastScrollY = 0;
    let isScrollingUp = false;

    // Desktop: detect mouse leaving viewport toward top
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggered) return;

      // Only trigger if mouse leaves through the top of the viewport
      if (e.clientY <= 0) {
        hasTriggered = true;
        setIsVisible(true);
      }
    };

    // Mobile: detect scroll pause after scrolling up
    const handleScroll = () => {
      if (hasTriggered) return;

      const currentScrollY = window.scrollY;
      isScrollingUp = currentScrollY < lastScrollY;
      lastScrollY = currentScrollY;

      // Clear existing timer
      if (scrollPauseTimer) {
        clearTimeout(scrollPauseTimer);
      }

      // If scrolling up and near top, set a timer
      if (isScrollingUp && currentScrollY < 300) {
        scrollPauseTimer = setTimeout(() => {
          if (!hasTriggered && isScrollingUp) {
            hasTriggered = true;
            setIsVisible(true);
          }
        }, 2000); // 2 second pause
      }
    };

    // Delay adding listeners to avoid immediate trigger
    timeoutId = setTimeout(() => {
      // Only add desktop listener on non-touch devices
      if (!('ontouchstart' in window)) {
        document.addEventListener('mouseleave', handleMouseLeave);
      }
      // Add scroll listener for mobile
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 5000); // Wait 5 seconds before activating

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(scrollPauseTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');
    sessionStorage.setItem('exitIntentShown', 'true');

    // Fire the email request in background (don't await)
    fetch('/api/whitepaper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'exit-intent-popup'
      }),
    }).catch(() => {
      // Silently fail - user will still get PDF download on thank-you page
    });

    // Redirect immediately to thank-you page (PDF downloads there)
    window.location.href = '/ai-transformation/thank-you';
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0c0c10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-white/40 hover:text-white/80 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {isSuccess ? (
            /* Success state */
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Check Your Inbox
              </h3>
              <p className="text-white/60 type-sm">
                The whitepaper is on its way to {email}
              </p>
            </div>
          ) : (
            /* Form state */
            <>
              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                <FileText className="w-7 h-7 text-purple-400" />
              </div>

              {/* Headline */}
              <h2
                id="exit-intent-title"
                className="text-lg md:text-xl font-semibold text-white text-center mb-2"
              >
                Before You Go...
              </h2>

              {/* Subheadline */}
              <p className="text-white/60 text-center type-sm mb-6">
                Get our comprehensive research on why 80% of AI transformations fail—and the 10 factors that separate the winners.
              </p>

              {/* Bullet points */}
              <div className="space-y-2 mb-6">
                {[
                  '100+ studies synthesized',
                  '10 critical failure barriers identified',
                  'Practical 5-phase roadmap included',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 type-sm text-white/70">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                    disabled={isSubmitting}
                    required
                  />
                  {error && (
                    <p className="mt-2 type-xs text-red-400">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Get the Whitepaper
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Privacy note */}
              <p className="mt-4 type-xs text-white/40 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
