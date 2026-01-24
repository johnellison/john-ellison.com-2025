'use client';

import Image from 'next/image';
import { useState } from 'react';

// Color swatch component
function ColorSwatch({
  name,
  value,
  textColor = 'white',
  description
}: {
  name: string;
  value: string;
  textColor?: string;
  description?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="group text-left"
    >
      <div
        className="w-full h-24 rounded-xl mb-3 flex items-end justify-between p-3 border border-white/10 transition-all group-hover:scale-[1.02] group-hover:border-violet-500/30"
        style={{ background: value, color: textColor }}
      >
        <span className="text-xs font-mono opacity-80">{value}</span>
        <span className="text-xs opacity-60">{copied ? 'Copied!' : 'Click to copy'}</span>
      </div>
      <p className="font-medium text-white/90">{name}</p>
      {description && <p className="text-sm text-white/50">{description}</p>}
    </button>
  );
}

// Typography sample component
function TypeSample({
  label,
  cssVar,
  sample,
  font = 'display'
}: {
  label: string;
  cssVar: string;
  sample?: string;
  font?: 'display' | 'body';
}) {
  return (
    <div className="py-6 border-b border-white/[0.06]">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-sm text-white/50 font-mono">{cssVar}</span>
        <span className="text-xs text-white/40">{label}</span>
      </div>
      <p
        className={font === 'display' ? 'font-display' : 'font-body'}
        style={{ fontSize: `var(${cssVar})`, lineHeight: 1.2 }}
      >
        {sample || 'The quick brown fox jumps over the lazy dog'}
      </p>
    </div>
  );
}

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <header className="mb-20">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Brand DNA</p>
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight">
            Style Guide
          </h1>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            A comprehensive guide to the visual identity of John Ellison&apos;s brand.
            This living document defines the colors, typography, and design patterns
            that create a cohesive prismatic aesthetic.
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="mb-20 p-6 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
          <h2 className="text-sm uppercase tracking-widest text-white/40 mb-4">Contents</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Logo', 'Colors', 'Typography', 'Gradients', 'Buttons', 'Animation', 'Spacing', 'Philosophy'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/70 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Logo Section */}
        <section id="logo" className="mb-24">
          <h2 className="text-2xl font-display font-semibold mb-2">Logo</h2>
          <p className="text-white/50 mb-8">Primary brand mark and usage guidelines.</p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Dark background */}
            <div className="p-12 rounded-2xl bg-[#0c0c10] border border-white/[0.06] flex items-center justify-center">
              <Image
                src="/je-logo.webp"
                alt="JE Logo"
                width={120}
                height={48}
                className="opacity-90"
              />
            </div>
            {/* Light background */}
            <div className="p-12 rounded-2xl bg-white border border-white/[0.06] flex items-center justify-center">
              <Image
                src="/je-logo.png"
                alt="JE Logo"
                width={120}
                height={48}
                className="invert"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="font-medium mb-2">Primary Format</h3>
              <p className="text-sm text-white/50">WebP for web, PNG fallback</p>
              <code className="text-xs text-violet-400 mt-2 block">/je-logo.webp</code>
            </div>
            <div className="p-6 rounded-xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="font-medium mb-2">Minimum Size</h3>
              <p className="text-sm text-white/50">32px height for legibility</p>
            </div>
            <div className="p-6 rounded-xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="font-medium mb-2">Clear Space</h3>
              <p className="text-sm text-white/50">Equal to logo height on all sides</p>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section id="colors" className="mb-24">
          <h2 className="text-2xl font-display font-semibold mb-2">Colors</h2>
          <p className="text-white/50 mb-8">A dark-first palette with prismatic accents.</p>

          {/* Core Colors */}
          <h3 className="text-lg font-medium mb-4">Core Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <ColorSwatch name="Background" value="#000000" description="Primary background" />
            <ColorSwatch name="Surface" value="#0c0c10" description="Cards, modals" />
            <ColorSwatch name="Surface Dark" value="#050507" description="Footer, sections" />
            <ColorSwatch name="Border" value="rgba(255,255,255,0.06)" textColor="white" description="Subtle dividers" />
          </div>

          {/* Prismatic Accent Colors */}
          <h3 className="text-lg font-medium mb-4">Prismatic Spectrum</h3>
          <p className="text-sm text-white/50 mb-4">The signature rainbow palette used for accents, borders, and animations.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            <ColorSwatch name="Coral" value="rgba(255, 150, 150, 1)" textColor="#000" description="Warm start" />
            <ColorSwatch name="Peach" value="rgba(255, 220, 120, 1)" textColor="#000" description="Energy" />
            <ColorSwatch name="Mint" value="rgba(150, 255, 200, 1)" textColor="#000" description="Growth" />
            <ColorSwatch name="Sky" value="rgba(150, 200, 255, 1)" textColor="#000" description="Trust" />
            <ColorSwatch name="Lavender" value="rgba(180, 150, 255, 1)" textColor="#000" description="Creativity" />
          </div>

          {/* Primary Brand Colors */}
          <h3 className="text-lg font-medium mb-4">Brand Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <ColorSwatch name="Violet 600" value="#7c3aed" description="Primary action" />
            <ColorSwatch name="Blue 500" value="#3b82f6" description="Secondary accent" />
            <ColorSwatch name="Teal 400" value="#2dd4bf" description="Success, highlights" />
            <ColorSwatch name="Amber 400" value="#fbbf24" textColor="#000" description="Warnings, attention" />
          </div>

          {/* Text Colors */}
          <h3 className="text-lg font-medium mb-4">Text Hierarchy</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ColorSwatch name="Primary Text" value="rgba(255,255,255,0.95)" textColor="#000" description="Headlines" />
            <ColorSwatch name="Secondary Text" value="rgba(255,255,255,0.70)" textColor="#000" description="Body copy" />
            <ColorSwatch name="Tertiary Text" value="rgba(255,255,255,0.50)" textColor="#000" description="Captions" />
            <ColorSwatch name="Muted Text" value="rgba(255,255,255,0.40)" textColor="#000" description="Labels" />
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-24">
          <h2 className="text-2xl font-display font-semibold mb-2">Typography</h2>
          <p className="text-white/50 mb-8">Fluid, responsive type scales with intentional font pairings.</p>

          {/* Font Families */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <span className="text-xs uppercase tracking-widest text-white/40">Display</span>
              <h3 className="text-4xl font-display font-semibold mt-2 mb-4">Clash Display</h3>
              <p className="text-white/50 text-sm mb-4">
                Used for headings, section titles, and impactful statements.
                Available in weights 400-700.
              </p>
              <code className="text-xs text-violet-400 font-mono">var(--font-display)</code>
            </div>
            <div className="p-8 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <span className="text-xs uppercase tracking-widest text-white/40">Body</span>
              <h3 className="text-4xl font-body font-medium mt-2 mb-4">Satoshi</h3>
              <p className="text-white/50 text-sm mb-4">
                Used for body text, UI elements, and general content.
                Highly legible at all sizes. Weights 300-700.
              </p>
              <code className="text-xs text-violet-400 font-mono">var(--font-body)</code>
            </div>
          </div>

          {/* Type Scale */}
          <h3 className="text-lg font-medium mb-4">Type Scale (Fluid)</h3>
          <p className="text-sm text-white/50 mb-6">
            All sizes use clamp() for smooth responsive scaling.
          </p>
          <div className="rounded-2xl bg-[#0c0c10] border border-white/[0.06] p-8">
            <TypeSample label="4XL" cssVar="--text-4xl" sample="Hero Headlines" />
            <TypeSample label="3XL" cssVar="--text-3xl" sample="Section Headers" />
            <TypeSample label="2XL" cssVar="--text-2xl" sample="Card Titles" />
            <TypeSample label="XL" cssVar="--text-xl" sample="Subsection Headers" />
            <TypeSample label="LG" cssVar="--text-lg" sample="Large Body Text" font="body" />
            <TypeSample label="Base" cssVar="--text-base" sample="Standard body copy for paragraphs and general content." font="body" />
            <TypeSample label="SM" cssVar="--text-sm" sample="Captions and secondary information" font="body" />
            <TypeSample label="XS" cssVar="--text-xs" sample="Labels and fine print" font="body" />
          </div>
        </section>

        {/* Gradients Section */}
        <section id="gradients" className="mb-24">
          <h2 className="text-2xl font-display font-semibold mb-2">Gradients</h2>
          <p className="text-white/50 mb-8">Signature gradient treatments that define the visual identity.</p>

          <div className="grid gap-8">
            {/* Prism Gradient */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
              <div
                className="h-32"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #2dd4bf 100%)' }}
              />
              <div className="p-6 bg-[#0c0c10]">
                <h3 className="font-medium mb-2">Gradient Prism</h3>
                <p className="text-sm text-white/50 mb-3">Primary brand gradient for text and accents.</p>
                <code className="text-xs text-violet-400 font-mono block">
                  linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #2dd4bf 100%)
                </code>
                <p className="text-sm mt-4">
                  <span className="text-gradient-prism font-display font-semibold text-2xl">Example gradient text</span>
                </p>
              </div>
            </div>

            {/* Warm Gradient */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
              <div
                className="h-32"
                style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #fcd34d 100%)' }}
              />
              <div className="p-6 bg-[#0c0c10]">
                <h3 className="font-medium mb-2">Gradient Warm</h3>
                <p className="text-sm text-white/50 mb-3">Secondary gradient for emphasis and warmth.</p>
                <code className="text-xs text-violet-400 font-mono block">
                  linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #fcd34d 100%)
                </code>
                <p className="text-sm mt-4">
                  <span className="text-gradient-warm font-display font-semibold text-2xl">Example gradient text</span>
                </p>
              </div>
            </div>

            {/* Rainbow Border Gradient */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
              <div
                className="h-32"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,150,150,1), rgba(255,220,120,1), rgba(150,255,200,1), rgba(150,200,255,1), rgba(180,150,255,1))'
                }}
              />
              <div className="p-6 bg-[#0c0c10]">
                <h3 className="font-medium mb-2">Prismatic Rainbow</h3>
                <p className="text-sm text-white/50 mb-3">Used for animated borders, hovers, and special accents.</p>
                <code className="text-xs text-violet-400 font-mono block break-all">
                  linear-gradient(135deg, rgba(255,150,150,1), rgba(255,220,120,1), rgba(150,255,200,1), rgba(150,200,255,1), rgba(180,150,255,1))
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section id="buttons" className="mb-24">
          <h2 className="text-2xl font-display font-semibold mb-2">Buttons</h2>
          <p className="text-white/50 mb-8">Interactive elements with prismatic hover effects.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Primary Button */}
            <div className="p-8 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-4">Primary</h3>
              <button className="btn-primary mb-6">
                Get Started
              </button>
              <p className="text-sm text-white/50 mb-3">
                Rainbow border animation on hover. Used for primary CTAs.
              </p>
              <code className="text-xs text-violet-400 font-mono">.btn-primary</code>
            </div>

            {/* Secondary Button */}
            <div className="p-8 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-4">Secondary</h3>
              <button className="btn-secondary mb-6">
                Learn More
              </button>
              <p className="text-sm text-white/50 mb-3">
                Subtle border with hover fill. Used for secondary actions.
              </p>
              <code className="text-xs text-violet-400 font-mono">.btn-secondary</code>
            </div>
          </div>
        </section>

        {/* Animation Section */}
        <section id="animation" className="mb-24">
          <h2 className="text-2xl font-display font-semibold mb-2">Animation</h2>
          <p className="text-white/50 mb-8">Motion principles and key animation patterns.</p>

          <div className="grid gap-6">
            {/* Easing */}
            <div className="p-6 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="font-medium mb-4">Easing Functions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white/70 mb-2">Standard</p>
                  <code className="text-xs text-violet-400 font-mono">cubic-bezier(0.23, 1, 0.32, 1)</code>
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-2">GSAP Power2</p>
                  <code className="text-xs text-violet-400 font-mono">power2.out, power3.out</code>
                </div>
              </div>
            </div>

            {/* Durations */}
            <div className="p-6 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="font-medium mb-4">Timing</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-white/70 mb-1">Fast</p>
                  <p className="text-2xl font-display">200ms</p>
                  <p className="text-xs text-white/40">Hovers, micro-interactions</p>
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-1">Standard</p>
                  <p className="text-2xl font-display">400ms</p>
                  <p className="text-xs text-white/40">Transitions, reveals</p>
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-1">Slow</p>
                  <p className="text-2xl font-display">600-1200ms</p>
                  <p className="text-xs text-white/40">Page entrances, GSAP</p>
                </div>
              </div>
            </div>

            {/* Key Animations */}
            <div className="p-6 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="font-medium mb-4">Key Animations</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-conic-prism animate-prismatic-spin" />
                  <div>
                    <p className="font-medium">Prismatic Spin</p>
                    <code className="text-xs text-violet-400">.animate-prismatic-spin</code>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="prismatic-divider animated w-24" />
                  <div>
                    <p className="font-medium">Rainbow Slide</p>
                    <code className="text-xs text-violet-400">@keyframes rainbowSlide</code>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gradient-animated text-xl font-display font-semibold">Gradient</span>
                  <div>
                    <p className="font-medium">Animated Gradient Text</p>
                    <code className="text-xs text-violet-400">.text-gradient-animated</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section id="spacing" className="mb-24">
          <h2 className="text-2xl font-display font-semibold mb-2">Spacing & Layout</h2>
          <p className="text-white/50 mb-8">Consistent spacing creates visual rhythm.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="font-medium mb-4">Breakpoints</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Mobile</span>
                  <code className="text-violet-400">480px</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Tablet</span>
                  <code className="text-violet-400">768px</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Desktop</span>
                  <code className="text-violet-400">1024px</code>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="font-medium mb-4">Container</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Max Width</span>
                  <code className="text-violet-400">max-w-6xl (64rem)</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Padding</span>
                  <code className="text-violet-400">px-6</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Section Gap</span>
                  <code className="text-violet-400">py-24</code>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="font-medium mb-4">Border Radius</h3>
              <div className="flex items-end gap-4 mt-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-violet-600/30 border border-violet-500/30 rounded-lg mb-2" />
                  <code className="text-xs text-white/50">lg (8px)</code>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-violet-600/30 border border-violet-500/30 rounded-xl mb-2" />
                  <code className="text-xs text-white/50">xl (12px)</code>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-violet-600/30 border border-violet-500/30 rounded-2xl mb-2" />
                  <code className="text-xs text-white/50">2xl (16px)</code>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-violet-600/30 border border-violet-500/30 rounded-full mb-2" />
                  <code className="text-xs text-white/50">full</code>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <h3 className="font-medium mb-4">Grid Gaps</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Small</span>
                  <code className="text-violet-400">0.75rem</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Medium</span>
                  <code className="text-violet-400">1.25rem</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Large</span>
                  <code className="text-violet-400">1.5rem</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="mb-24">
          <h2 className="text-2xl font-display font-semibold mb-2">Design Philosophy</h2>
          <p className="text-white/50 mb-8">The principles that guide every design decision.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Dark-First</h3>
              <p className="text-white/60">
                The interface lives in darkness, allowing content and prismatic accents to shine.
                Pure black backgrounds create depth and reduce visual fatigue.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Prismatic Energy</h3>
              <p className="text-white/60">
                Rainbow gradients represent the full spectrum of possibility. They appear
                on interaction, rewarding engagement with moments of color.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/20 to-green-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Fluid & Responsive</h3>
              <p className="text-white/60">
                Typography and spacing scale smoothly across all viewport sizes using clamp().
                No jarring breakpoint jumps&mdash;just continuous adaptation.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0c0c10] border border-white/[0.06]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">4</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Motion with Purpose</h3>
              <p className="text-white/60">
                Animations enhance meaning, never distract. Scroll-triggered reveals create
                narrative. Reduced motion preferences are always respected.
              </p>
            </div>
          </div>
        </section>

        {/* CSS Variables Reference */}
        <section className="mb-24">
          <h2 className="text-2xl font-display font-semibold mb-2">CSS Variables Reference</h2>
          <p className="text-white/50 mb-8">Quick reference for all design tokens.</p>

          <div className="rounded-2xl bg-[#0c0c10] border border-white/[0.06] p-6 overflow-x-auto">
            <pre className="text-sm text-white/80 font-mono whitespace-pre">
{`:root {
  /* Fonts */
  --font-display: 'Clash Display', -apple-system, sans-serif;
  --font-body: 'Satoshi', -apple-system, sans-serif;

  /* Type Scale */
  --text-xs: clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem);
  --text-sm: clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.15rem);
  --text-lg: clamp(1.15rem, 1.05rem + 0.5vw, 1.35rem);
  --text-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-2xl: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  --text-3xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);
  --text-4xl: clamp(3rem, 2.5rem + 2.5vw, 5rem);

  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;

  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.15em;

  /* Breakpoints */
  --bp-mobile: 480px;
  --bp-tablet: 768px;
  --bp-desktop: 1024px;

  /* Gradients */
  --gradient-prism: linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #2dd4bf 100%);
  --gradient-warm: linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #fcd34d 100%);
}`}
            </pre>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-white/[0.06]">
          <p className="text-sm text-white/40">
            Last updated: January 2026 &middot; Version 1.0
          </p>
        </footer>

      </div>
    </main>
  );
}
