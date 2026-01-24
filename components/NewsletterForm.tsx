'use client';

import { useActionState, useEffect, useRef } from 'react';
import { subscribe } from '@/app/actions';

const initialState = {
    success: false,
    message: '',
};

interface NewsletterFormProps {
    source?: string;
    variant?: 'default' | 'minimal' | 'cards';
    className?: string;
}

export function NewsletterForm({ source = 'footer', variant = 'default', className = '' }: NewsletterFormProps) {
    const [state, formAction] = useActionState(subscribe, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state.success]);

    if (state.success) {
        return (
            <div className={`p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium animate-fade-in ${className}`}>
                {state.message}
            </div>
        );
    }

    return (
        <form ref={formRef} action={formAction} className={`relative group ${className}`}>
            <input type="hidden" name="source" value={source} />

            <div className="relative flex items-center">
                <div className="absolute left-4 text-white/30">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#0A0A0A]/20 border border-white/10 rounded-full py-3.5 pl-12 pr-32 text-white placeholder-white/30 outline-none focus:border-purple-500/50 focus:bg-[#0A0A0A] transition-all duration-300 font-sans"
                    style={{
                        // Prevent white background during autofill
                        WebkitBoxShadow: '0 0 0 30px #0A0A0A inset',
                        WebkitTextFillColor: 'white',
                        caretColor: 'white'
                    }}
                />

                <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 rounded-full px-5 bg-purple-500/15 border border-purple-500/30 text-white text-sm font-medium transition-all duration-300 hover:bg-purple-500/25 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 z-10"
                >
                    Subscribe
                </button>
            </div>

            {state.message && !state.success && (
                <p className="absolute -bottom-6 left-4 text-xs text-red-400">
                    {state.message}
                </p>
            )}
        </form>
    );
}
