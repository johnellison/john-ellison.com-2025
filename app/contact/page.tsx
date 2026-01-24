'use client';

import { useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { RainbowGrid } from '@/components/gsap/RainbowGrid';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline();

        tl.from('.anime-fade-up', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2,
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to send message');

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <RainbowGrid />
            <Navigation />

            <main ref={containerRef} className="relative min-h-screen flex items-center justify-center p-6 pt-24 pb-12 z-10">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left: Profile & Info */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <div className="anime-fade-up relative w-64 h-64 lg:w-72 lg:h-72 p-1 rounded-full bg-gradient-to-br from-red-300 via-purple-300 to-blue-300">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0c0c10] bg-black">
                                <img
                                    src="/john-e-wedding-headshot.webp"
                                    alt="John Ellison"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <h1 className="anime-fade-up font-display text-4xl lg:text-5xl font-bold leading-tight text-white">
                            Let's Build Something<br />
                            <span className="text-gradient-prism">Together</span>
                        </h1>

                        <p className="anime-fade-up type-lg text-white/70 max-w-md">
                            Whether you need a product visionary, a design leader, or an AI strategist—I'm ready to help you navigate the future.
                        </p>

                        <a
                            href="mailto:john@john-ellison.com"
                            className="anime-fade-up type-xl font-display text-white border-b-2 border-white/20 pb-1 hover:border-violet-500 hover:text-violet-300 transition-colors"
                        >
                            john@john-ellison.com
                        </a>
                    </div>

                    {/* Right: Form */}
                    <div className="anime-fade-up w-full">
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-md shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">Phone (Optional)</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                        rows={4}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading' || status === 'success'}
                                        className={`w-full py-4 rounded-lg font-bold uppercase tracking-wider transition-all transform hover:-translate-y-1 hover:shadow-lg ${status === 'success'
                                                ? 'bg-green-500 text-white cursor-default'
                                                : 'bg-white text-black hover:bg-gray-200'
                                            }`}
                                    >
                                        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                                    </button>

                                    {status === 'error' && (
                                        <p className="text-red-400 text-sm mt-3 text-center">Something went wrong. Please try again.</p>
                                    )}
                                    {status === 'success' && (
                                        <p className="text-green-400 text-sm mt-3 text-center">Thanks for reaching out! I'll be in touch soon.</p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
