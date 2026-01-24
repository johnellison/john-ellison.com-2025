'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Twitter, Linkedin, Facebook, Link2, ArrowRight, Download } from 'lucide-react';

const SHARE_URL = 'https://john-ellison.com/ai-transformation';
const WHITEPAPER_TITLE = 'AI Transformation: From Optimism to Reality';

const SHARE_MESSAGES = {
  twitter: `Just downloaded this research: 95% of AI transformations fail—but the top 6% share 8 critical success factors. #AITransformation #EnterpriseAI`,
  linkedin: `Interesting research on why most AI initiatives fail to scale. The data shows it's not the technology—it's the operating model. Worth a read if you're leading AI strategy.`,
  facebook: `Found some eye-opening research on AI transformation success rates. Only 5% make it from pilot to production.`,
};

export default function ThankYouPage() {
  const [copied, setCopied] = useState(false);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  // Trigger the PDF download when the page loads
  useEffect(() => {
    if (!downloadTriggered) {
      setDownloadTriggered(true);
      // Small delay to ensure the page renders first
      const timer = setTimeout(() => {
        const link = document.createElement('a');
        link.href = '/downloads/AI-Transformation-Whitepaper.pdf';
        link.download = 'AI-Transformation-Whitepaper.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [downloadTriggered]);

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_MESSAGES.twitter)}&url=${encodeURIComponent(SHARE_URL)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodeURIComponent(SHARE_MESSAGES.facebook)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 py-15">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-lg md:text-xl font-display font-semibold text-white mb-4">
            Your whitepaper is downloading
          </h1>
          <p className="text-lg text-white/60">
            Check your downloads folder for <span className="font-medium text-white/80">AI-Transformation-Whitepaper.pdf</span>
          </p>

          {/* Manual download link */}
          <a
            href="/downloads/AI-Transformation-Whitepaper.pdf"
            download="AI-Transformation-Whitepaper.pdf"
            className="inline-flex items-center gap-2 mt-4 text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Download didn&apos;t start? Click here
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] my-10" />

        {/* Social Share Section */}
        <div className="text-center mb-12">
          <h2 className="text-xl font-display font-semibold text-white mb-2">
            Share this research
          </h2>
          <p className="text-white/50 mb-6">
            Help others discover the data behind AI transformation success
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {/* X (Twitter) */}
            <button
              onClick={shareToTwitter}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 hover:border-white/20 transition-all font-medium"
            >
              <Twitter className="w-5 h-5" />
              Share on X
            </button>

            {/* LinkedIn */}
            <button
              onClick={shareToLinkedIn}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2]/20 border border-[#0A66C2]/30 text-[#5BA3E8] rounded-lg hover:bg-[#0A66C2]/30 hover:border-[#0A66C2]/50 transition-all font-medium"
            >
              <Linkedin className="w-5 h-5" />
              Share on LI
            </button>

            {/* Facebook */}
            <button
              onClick={shareToFacebook}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#6BA8F5] rounded-lg hover:bg-[#1877F2]/30 hover:border-[#1877F2]/50 transition-all font-medium"
            >
              <Facebook className="w-5 h-5" />
              Share on FB
            </button>

            {/* Copy Link */}
            <button
              onClick={copyLink}
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-all font-medium ${copied
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white'
                }`}
            >
              <Link2 className="w-5 h-5" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] my-10" />

        {/* Assessment CTA */}
        <div className="relative rounded-2xl p-8 text-center overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-blue-600/20 to-teal-500/20" />
          <div className="absolute inset-0 border border-white/10 rounded-2xl" />

          <div className="relative">
            <h2 className="text-xl font-display font-semibold text-white mb-3">
              Ready to assess your AI readiness?
            </h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Take our free 5-minute assessment and discover where your organization
              stands on the AI transformation journey.
            </p>
            <Link
              href="/ai-transformation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg hover:from-violet-500 hover:to-blue-500 transition-all font-semibold"
            >
              Take the Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Secondary Links */}
        <div className="mt-10 text-center">
          <p className="text-white/40 text-sm">
            Questions about AI transformation?{' '}
            <Link href="/contact" className="text-violet-400 hover:text-violet-300 transition-colors">
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
