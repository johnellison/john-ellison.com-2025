'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@/components/gsap/use-gsap';
import IndividualAssessmentForm from '@/app/executive-ai-transformation/IndividualAssessmentForm';

export function EmbeddedAssessment() {
    const [isStarted, setIsStarted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const handleStart = () => {
        if (!cardRef.current || !containerRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => setIsStarted(true)
        });

        // Fade out card content
        tl.to(cardRef.current, {
            opacity: 0,
            scale: 0.98,
            duration: 0.4,
            ease: 'power2.inOut'
        });

        // Hide Sidebar to let assessment shine
        gsap.to('#blog-sidebar', {
            opacity: 0,
            x: -20,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                const sidebar = document.getElementById('blog-sidebar');
                if (sidebar) sidebar.style.display = 'none';
            }
        });

        // Collapse card height (optional, but good for smooth transition if form height differs)
        // Actually, we'll just switch state and letting React render the form, 
        // but maybe we want to animate the form In.
    };

    useGSAP(() => {
        if (isStarted && formRef.current) {
            gsap.fromTo(formRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    }, [isStarted]);

    if (isStarted) {
        return (
            <div ref={formRef} className="my-16 bg-[#0a0a0f]/50 border border-white/10 rounded-2xl overflow-hidden p-4 md:p-8">
                <IndividualAssessmentForm hideSidebar={true} />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="my-16">
            <div
                ref={cardRef}
                className="rounded-2xl bg-[#0f0f12] border border-white/10 overflow-hidden group hover:border-purple-500/30 transition-all shadow-2xl"
            >
                <div className="flex flex-col md:flex-row h-full">
                    {/* Image Side */}
                    <div className="relative w-full md:w-2/5 min-h-[300px] md:min-h-auto">
                        <Image
                            src="/images/ai-transformation/john-and-osho-square-large.jpeg"
                            alt="AI Transformation Workshop"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay" />
                    </div>

                    {/* Content Side */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-left bg-gradient-to-br from-[#1a1a2e] to-[#0f0f12] relative">
                        {/* Subtle background glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="font-display text-lg md:text-xl font-bold text-white mb-4 leading-tight">
                                Ready to transform <br className="hidden md:block" /> your organization?
                            </h3>
                            <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                                Take the free AI Readiness Assessment and get a personalized report on your team's capability to adopt AI.
                            </p>
                            <div>
                                <button
                                    onClick={handleStart}
                                    className="btn-primary inline-flex text-sm md:text-base px-6 py-3 cursor-pointer"
                                >
                                    Start Assessment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
