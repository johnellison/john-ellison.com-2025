# Home Page Transformation Plan

## Objective
Transform the home page from a flat, text-heavy hub into a rich, visually compelling experience that matches the quality of the AI-Transformation and Executive-AI-Transformation landing pages.

## Key Improvements
1. **Visual richness** - Image canvas in hero, images throughout
2. **Narrative depth** - Regenerative vision, deeper storytelling
3. **Content integration** - Writings, podcast, featured work
4. **Polish** - Animations, hover states, research citations

## New Page Structure

1. **HeroSection** - Enhanced with floating image canvas
2. **ProblemSection** - Enhanced with images + ICP callout
3. **RegenerativeVisionSection** - NEW: AI + regeneration story
4. **StatsSection** - Enhanced with citations + animated counters
5. **ServicesSection** - Richer cards with images
6. **FeaturedWorkSection** - NEW: 4-6 ventures showcase
7. **WritingsSection** - NEW: Substack + Regenera posts
8. **PodcastSection** - NEW: Featured episode + links
9. **AboutSection** - Enhanced with credentials + fuller story
10. **CTASection** - Multiple conversion paths

## Parallel Workstreams

### Stream A: Hero + Visual Foundation
- Create HeroImageCanvas component
- Add floating GSAP animations
- Use existing workshop/project photos

### Stream B: Content Integration
- Build WritingsSection (Substack + Regenera feeds)
- Build PodcastSection with featured episode
- Reuse existing API routes

### Stream C: Featured Work
- Create FeaturedWorkSection component
- Showcase: ReFi DAO, Goodery, Toucan, Pikl, Interbeing, Vibrana
- Use existing case study data + images

### Stream D: Narrative + Copy
- Write RegenerativeVisionSection copy + component
- Enhance problem cards with regenerative angle
- Add research citations to stats
- Improve AboutSection with fuller story

### Stream E: Polish + Animation
- Add GSAP ScrollTrigger throughout
- Implement animated stat counters
- Add hover glows and depth effects

## Execution Model
- **Orchestrator**: Opus 4.5 (plan, review, integrate)
- **Implementation**: Sonnet 4.5 (write components, CSS, logic)
- **Pattern**: Parallel dispatch, sequential review

## Status
- [x] Plan created
- [x] Stream A: Hero - HeroSection.tsx with 8 floating images + GSAP animations
- [x] Stream B: Content - WritingsSection.tsx + PodcastSection.tsx
- [x] Stream C: Work - FeaturedWorkSection.tsx (6 ventures)
- [x] Stream D: Narrative - RegenerativeVisionSection.tsx + enhanced AboutSection.tsx
- [x] Stream E: Polish - StatsSection.tsx with animated counters + page.tsx integration
- [x] Integration review - Build passes, all components connected
- [ ] Final QA - Visual testing in browser

## Components Created (Jan 26, 2026)

| Component | Size | Key Features |
|-----------|------|--------------|
| HeroSection.tsx | 11KB | 8 floating images, GSAP sine wave animations, mobile masonry |
| RegenerativeVisionSection.tsx | 12KB | "Technology in Service of Life" narrative, animated orb, ReFi DAO story |
| StatsSection.tsx | 6KB | 4 stats with GSAP counters, research citations |
| FeaturedWorkSection.tsx | 10KB | 6 ventures: ReFi DAO, Toucan, Pikl, Goodery, Peak Democracy, Interbeing |
| WritingsSection.tsx | 10KB | Dual-feed: Substack (purple) + Regenera (emerald) |
| PodcastSection.tsx | 9KB | "The John Ellison Show", platform subscribe buttons |
| AboutSection.tsx | 16KB | Large photo, full bio, journey tags, credential badges |
| index.ts | 0.4KB | Barrel exports for all components |
