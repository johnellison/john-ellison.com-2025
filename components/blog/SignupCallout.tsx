'use client';

import { NewsletterForm } from '@/components/NewsletterForm';

export function SignupCallout() {
    return (
        <div className="my-8 pt-0 pb-4 px-2 rounded-2xl bg-gradient-to-br from-[#a78bfa]/10 to-transparent border border-[#a78bfa]/20 relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#a78bfa]/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 text-center max-w-lg mx-auto">
                <h3 className="font-display text-lg md:text-xl font-bold text-white mb-2">
                    Join the <span className="text-gradient-prism">Journey</span>
                </h3>
                <p className="text-white/70 mb-4 leading-relaxed text-xs md:text-base">
                    Get weekly insights on AI transformation and regenerative wisdom delivered straight to your inbox. No noise, just signal.
                </p>

                <div className="max-w-md mx-auto">
                    <NewsletterForm source="in-post" className="w-full" />
                </div>

                <p className="mt-3 text-xs text-white/30">
                    Join 800+ readers. Unsubscribe anytime.
                </p>
            </div>
        </div>
    );
}
