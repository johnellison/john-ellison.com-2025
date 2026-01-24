# PRD: Native Blog & Content Distribution System

**Version:** 1.1
**Date:** January 24, 2026
**Author:** John Ellison
**Status:** Draft (Reviewed)

> **Review Notes (v1.1):** Updated to reflect current implementation state, added missing technical considerations (auth, caching, error handling, testing), and corrected dependencies.

---

## Quick Status

| Phase | Status | Key Items |
|-------|--------|-----------|
| **Phase 1: Foundation** | ✅ 100% | All items complete |
| **Phase 2: Distribution** | ✅ 100% | All items complete |
| **Phase 3: Polish** | ✅ 90% | Related posts, category filters, `/writing` banner |
| **Phase 4: Optimization** | ✅ 60% | UTM tracking, analytics, view tracking |

**Phase 1 Completed (Jan 24, 2026):**
- ✅ Draft filtering in production
- ✅ Unified sitemap at `/sitemap.xml`
- ✅ RSS feed at `/blog/feed.xml`
- ✅ robots.txt with sitemap reference
- ✅ JSON-LD structured data on posts
- ✅ Category archive pages
- ✅ Tag archive pages
- ✅ ShareButtons component
- ✅ TableOfContents component
- ✅ Canonical URLs and enhanced OG/Twitter meta

**Phase 2 Completed (Jan 24, 2026):**
- ✅ Dashboard authentication (Supabase Auth)
- ✅ Content package generator API with Claude Sonnet
- ✅ `/dashboard/content-package` UI
- ✅ Copy-to-clipboard for all platforms
- ✅ Image generation with Sharp
- ✅ Supabase caching for generated content
- ✅ Rate limiting (10 req/hour)
- ✅ Error handling with retry

**Phase 3 Completed (Jan 24, 2026):**
- ✅ Related posts algorithm (category + tag scoring)
- ✅ RelatedPosts component on post pages
- ✅ Category filter tabs on blog index
- ✅ `/writing` page banner pointing to `/blog`

**Phase 4 Progress (Jan 24, 2026):**
- ✅ UTM parameter tracking for all platforms
- ✅ Blog page view analytics (`/api/blog/track-view`)
- ✅ ViewTracker component with automatic UTM capture
- ✅ Instagram bio link with tracking URL

---

## Executive Summary

Build a native blog system on john-ellison.com that serves as the canonical source for all long-form content, with automated generation of distribution assets for Substack newsletters and social media platforms. Each published post produces a complete "content package" ready for cross-platform distribution.

### Strategic Goals
1. **Build domain authority** on john-ellison.com (not Substack)
2. **Funnel traffic** toward /ai-transformation paid offerings
3. **Streamline publishing workflow** with one-click asset generation
4. **Maintain SEO best practices** (canonical URLs, no duplicate content)

---

## Current Implementation State

> **Phases 1 & 2 Complete:**
> - `/blog` index page with PostCard grid
> - `/blog/[slug]` individual post pages with hero, metadata, MDX rendering
> - `/blog/category/[category]` category archive pages
> - `/blog/tag/[tag]` tag archive pages
> - `/sitemap.xml` unified sitemap (all pages + blog)
> - `/robots.txt` with sitemap reference
> - `/blog/feed.xml` RSS feed
> - MDX content system with `next-mdx-remote`, `gray-matter`, `reading-time`
> - Custom MDX components (Image, blockquote, code, links)
> - Full SEO: meta tags, OpenGraph, Twitter cards, JSON-LD, canonical URLs
> - ShareButtons component (X, LinkedIn, Email, Copy Link)
> - TableOfContents component (collapsible with active tracking)
> - Draft filtering (hidden in production)
> - `/admin/login` password-protected access
> - `/dashboard/content-package` post list with generation
> - `/dashboard/content-package/[slug]` full content package UI
> - Claude API integration for platform-specific content
> - Sharp-based image generation (OG, LinkedIn, Twitter, Instagram, Square)
> - Supabase caching for generated content
> - Rate limiting and error handling
> - TableOfContents component (collapsible, with active section tracking)
> - Draft filtering (drafts hidden in production)
>
> **Not Yet Implemented (Phase 4 remaining):**
> - A/B testing for CTA placements
> - Prompt refinement based on copy performance
> - Scheduling/automation features
> - Scroll depth tracking (optional enhancement)

---

## Problem Statement

### Current State
- Content lives on iamjohnellison.substack.com (building Substack's authority, not yours) and regenera.xyz (also Substack)
- `/writing` page exists, displaying posts from Substack via embedded grids (PostsGrid, RegeneraGrid)
- `/blog` now exists with native MDX content (1 post live)
- Dual systems create confusion — need to consolidate
- Manual effort required to create social posts, newsletter teasers, images

### Desired State
- john-ellison.com is the canonical home for all content
- Substack serves as a distribution/email channel linking back to main site
- Automated content package generation for each post
- Clear funnel from blog → AI Transformation offering

---

## User Stories

### As John (Author)
1. I want to write a post in Markdown/MDX and publish it to john-ellison.com
2. I want the system to automatically generate social media posts for LinkedIn, X, and other platforms
3. I want the system to generate a newsletter-ready summary I can paste into Substack
4. I want to see a "content package" dashboard after publishing with all assets ready to copy
5. I want SEO metadata auto-generated based on content
6. I want featured images/OG images generated or easily uploadable

### As a Reader
1. I want to read full articles on john-ellison.com with excellent typography
2. I want to subscribe to get notified of new posts (via Substack integration)
3. I want related content suggestions that guide me toward AI Transformation

---

## Functional Requirements

### 1. Content Management

#### 1.1 MDX-Based Blog Posts
- Store posts as MDX files in `/content/blog/[slug]/index.mdx`
- **Directory naming:** Use slug only (e.g., `the-8-month-window/`), not date-prefixed
- Support frontmatter for metadata:
  ```yaml
  ---
  title: "Post Title"
  slug: "post-slug"
  publishedAt: "2026-01-24"
  updatedAt: "2026-01-24"
  excerpt: "Brief description for SEO and previews"
  featuredImage: "/images/blog/post-slug/hero.jpg"
  category: "ai-transformation" | "regenerative-wisdom" | "building-in-public"
  tags: ["AI", "Claude", "vibe-coding"]
  status: "draft" | "published"
  seoTitle: "Optional custom SEO title"
  seoDescription: "Optional custom meta description"
  ---
  ```
- Support MDX components (callouts, code blocks, embeds, CTAs)
- Hot reload in development

**Note:** The `lib/blog/content.ts` already handles both directory-style (`/content/blog/slug/index.mdx`) and file-style (`/content/blog/slug.mdx`) posts.

**MDX Components (in `PostContent.tsx`):**

| Component | Status | Notes |
|-----------|--------|-------|
| `Image` | ✅ Implemented | Next.js Image with caption |
| `img` | ✅ Implemented | Fallback for markdown images |
| `a` (links) | ✅ Implemented | External links open in new tab |
| `blockquote` | ✅ Implemented | Purple left border, subtle bg |
| `code` | ✅ Implemented | Inline code styling |
| `pre` | ✅ Implemented | Code blocks with syntax highlighting |
| `hr` | ✅ Implemented | Subtle divider |
| Callout | ❌ Not built | Info/Warning/Tip boxes |
| CTA | ❌ Not built | Inline call-to-action component |
| Embed | ❌ Not built | YouTube/Twitter/etc. embeds |

#### 1.2 Content Organization
- Categories aligned with offerings:
  - **AI Transformation** (links to /ai-transformation)
  - **Building in Public** (Claude tutorials, vibe coding)
  - **Regenerative Wisdom** (bridge from Regenera audience)
- Tag-based filtering
- Related posts algorithm based on category + tags

#### 1.3 Image Management
- Featured images stored in `/public/images/blog/[slug]/`
- Support for inline images in posts
- Automatic OG image generation (or manual upload)
- Image optimization via Next.js Image component

### 2. Content Distribution Package Generator

#### 2.1 Publishing Dashboard
After saving a post as "published", display a dashboard with:

```
┌─────────────────────────────────────────────────────────────┐
│  📦 Content Package: "Your Post Title"                      │
│  Published: January 24, 2026                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🔗 CANONICAL URL                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ https://john-ellison.com/blog/your-post-slug    [📋]│   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📧 SUBSTACK NEWSLETTER                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Generated teaser + "Read full article" CTA]    [📋]│   │
│  └─────────────────────────────────────────────────────┘   │
│  Preview: "I just published a new piece on..."             │
│                                                             │
│  💼 LINKEDIN                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Professional hook + key insight + CTA]         [📋]│   │
│  └─────────────────────────────────────────────────────┘   │
│  Characters: 1,247 / 3,000                                 │
│                                                             │
│  🐦 X (TWITTER)                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Punchy hook version]                           [📋]│   │
│  └─────────────────────────────────────────────────────┘   │
│  Characters: 267 / 280                                     │
│                                                             │
│  🧵 X THREAD                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [5-7 tweet thread with key points]              [📋]│   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📸 INSTAGRAM                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Caption with hook, value, CTA + hashtags]      [📋]│   │
│  └─────────────────────────────────────────────────────┘   │
│  Characters: 1,842 / 2,200                                 │
│                                                             │
│  🖼️ IMAGES                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ OG Image │  │ LinkedIn │  │ X/Twitter│  │ IG 4:5   │   │
│  │ 1200x630 │  │ 1200x627 │  │ 1200x675 │  │ 1080x1350│   │
│  │   [⬇️]   │  │   [⬇️]   │  │   [⬇️]   │  │   [⬇️]   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────┐                                              │
│  │ Square   │                                              │
│  │ 1080x1080│                                              │
│  │   [⬇️]   │                                              │
│  └──────────┘                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 2.2 AI-Generated Distribution Content

Use Claude API to generate platform-specific content:

**Substack Newsletter Version:**
- Opening hook (2-3 sentences that create curiosity)
- Key insight preview (1 paragraph summarizing the value)
- Clear CTA: "Read the full article on my website →"
- Maintain your voice/tone from existing content

**LinkedIn Post:**
- Professional hook that speaks to business leaders
- 3-5 key insights as bullet points or short paragraphs
- Personal reflection or lesson learned
- CTA with link
- Relevant hashtags (5-7)
- Optimized for ~1,200 characters for best engagement

**X/Twitter Single Post:**
- Punchy hook under 200 characters
- Link to full post
- 2-3 relevant hashtags
- Designed to maximize clicks

**X/Twitter Thread:**
- 1/ Hook tweet (curiosity-driven)
- 2-5/ Key points from the article
- 6/ Personal take or lesson
- 7/ CTA + link to full article

**Instagram Caption:**
- Opening hook (pattern interrupt or provocative question)
- 2-3 value-packed paragraphs with line breaks
- Personal reflection or insight
- CTA: "Link in bio" or "Read full article at john-ellison.com"
- 15-25 relevant hashtags (mix of broad and niche)
- Optimized for ~1,500-2,000 characters

#### 2.3 Image Generation (Imagen 3 via Vertex AI)

Use Google's Imagen 3 model for AI-generated promotional images:

**Image Formats:**
- **OG Image** (1200x630) - Blog post social preview
- **LinkedIn** (1200x627) - LinkedIn feed optimal
- **X/Twitter** (1200x675) - Twitter card format
- **Instagram 4:5** (1080x1350) - IG feed optimal, more real estate
- **Square** (1080x1080) - Universal fallback, IG stories, general use

**Image Generation Approach:**
- Generate branded promotional images based on post content/themes
- Apply consistent visual style aligned with /brand page
- Include post title as text overlay option
- Similar to Substack's promotional image feature
- Store generated images in `/public/images/blog/[slug]/promo/`

### 3. Blog Frontend

#### 3.1 Routes
- `/blog` - Blog index with all posts, filtering by category/tag
- `/blog/[slug]` - Individual post pages
- `/blog/category/[category]` - Category archives
- `/blog/tag/[tag]` - Tag archives

#### 3.2 Blog Index Page
- Featured/latest post hero section
- Grid of recent posts with:
  - Featured image
  - Title
  - Excerpt
  - Date
  - Category badge
  - Reading time
- Category filter tabs
- Pagination or infinite scroll

#### 3.3 Individual Post Page
- Full-width featured image hero
- Post metadata (date, category, reading time, tags)
- Rich MDX content with custom components
- Author bio section
- **CTA Section**: "Want to transform your organization with AI?"
  - Link to /ai-transformation
  - Email capture form (Substack integration)
- Related posts section
- Social share buttons
- Table of contents (for long posts)

#### 3.4 SEO Requirements

**Implemented:**
- [x] Unique meta title and description per post (via `generateMetadata`)
- [x] Open Graph meta tags (title, description, image, type, publishedTime)
- [x] Twitter Card meta tags (card, title, description, image)
- [x] Canonical URLs via OG URL (implicit)
- [x] Next.js Image optimization with lazy loading

**Not Yet Implemented:**
- [ ] Explicit `<link rel="canonical">` tag
- [ ] JSON-LD structured data (Article schema)
- [ ] XML sitemap generation for blog posts (`/blog/sitemap.ts`)
- [ ] RSS feed (`/blog/feed.xml`)

**JSON-LD Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The 8-Month Window",
  "author": { "@type": "Person", "name": "John Ellison" },
  "datePublished": "2026-01-24",
  "image": "https://john-ellison.com/images/blog/the-8-month-window/hero.png",
  "publisher": {
    "@type": "Organization",
    "name": "John Ellison",
    "logo": { "@type": "ImageObject", "url": "https://john-ellison.com/logo.png" }
  }
}
```

### 4. Admin/CMS Experience

#### 4.1 File-Based CMS (Chosen Approach)
- Posts as MDX files in `/content/blog/`
- Git-based workflow (edit locally, commit to publish)
- Use frontmatter for all metadata
- Works with existing development workflow
- Simple, no external dependencies
- Full version control of content

**Future Enhancement:** Headless CMS integration (Sanity, Contentful) for visual editing and scheduled publishing if needed.

#### 4.2 Content Package Dashboard
- Accessible at `/admin/content-package/[slug]` (protected route)
- Or integrated into a simple `/dashboard` page
- Shows all generated distribution assets
- One-click copy buttons for each platform
- Download buttons for images

### 5. Analytics & Tracking

#### 5.1 Post-Level Analytics
- View counts per post
- Time on page
- Scroll depth
- Conversion tracking (clicks to /ai-transformation)

#### 5.2 Distribution Tracking
- UTM parameters for each platform
- Track which platform drives most traffic
- Measure Substack → john-ellison.com click-through

---

## Technical Architecture

### Stack
- **Framework:** Next.js 16 (existing)
- **Content:** MDX with next-mdx-remote or @next/mdx (file-based CMS)
- **Database:** Supabase (for analytics, caching generated content)
- **Text Generation:** Claude API (Anthropic) - social posts, newsletters
- **Image Generation:** Imagen 3 via Vertex AI (Google Cloud) - promotional images
- **Image Optimization:** Next.js Image component
- **Styling:** Tailwind CSS (existing)

### Dependencies

**Already Installed:**
```json
{
  "next-mdx-remote": "^5.0.0",     // MDX rendering
  "gray-matter": "^4.0.3",         // Frontmatter parsing
  "reading-time": "^1.5.0",        // Reading time calculation
  "rehype-pretty-code": "^0.14.1", // Code syntax highlighting
  "rehype-slug": "^6.0.0",         // Heading IDs for TOC
  "remark-gfm": "^4.0.1"           // GitHub Flavored Markdown
}
```

**To Install (Phase 2+):**
```json
{
  // AI Generation
  "@anthropic-ai/sdk": "^0.x",        // Claude API for text
  "@google-cloud/aiplatform": "^3.x", // Vertex AI for Imagen 3

  // Image Processing (post-generation)
  "sharp": "^0.x"                     // Text overlays, resizing
}
```

### File Structure

**Existing (Implemented):**
```
/content
  /blog
    /the-8-month-window          # ✅ Live post
      index.mdx
      (images in /public/images/blog/the-8-month-window/)

/app
  /blog
    page.tsx                     # ✅ Blog index
    /[slug]
      page.tsx                   # ✅ Individual post

/lib
  /blog
    content.ts                   # ✅ MDX loading utilities

/components
  /blog
    PostCard.tsx                 # ✅ Card for index grid
    PostContent.tsx              # ✅ MDX renderer with components

/types
  blog.ts                        # ✅ BlogPost, BlogPostMetadata interfaces
```

**To Build (Phases 1-3):**
```
/app
  /blog
    /category
      /[category]
        page.tsx                 # Category archive
    /tag
      /[tag]
        page.tsx                 # Tag archive
    sitemap.ts                   # Dynamic sitemap for blog posts
    feed.xml
      route.ts                   # RSS feed

  /admin
    /login
      page.tsx                   # Simple password login
  /dashboard
    /content-package
      /[slug]
        page.tsx                 # Distribution package UI

  /api
    /admin
      /login
        route.ts                 # Session creation
    /blog
      /generate-package
        route.ts                 # AI content generation (Claude API)
      /generate-images
        route.ts                 # Promotional images (Imagen 3)

/lib
  /blog
    generate-text.ts             # Claude API - social posts, newsletters
    generate-images.ts           # Imagen 3 - promotional images
    related-posts.ts             # Related posts algorithm

/components
  /blog
    TableOfContents.tsx
    RelatedPosts.tsx
    ShareButtons.tsx
    CategoryFilter.tsx
```

### Security & Authentication

#### Dashboard Protection
The content package dashboard at `/dashboard/content-package/[slug]` requires authentication:

**Approach:** Simple password protection (no user accounts needed)
- Environment variable `ADMIN_PASSWORD` for dashboard access
- Session cookie after password entry (24h expiry)
- Server-side middleware check on `/dashboard/*` routes

**Implementation:**
```typescript
// middleware.ts - protect /dashboard routes
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const session = request.cookies.get('admin-session');
    if (!session || !validateSession(session.value)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
}
```

#### API Key Management
- Store Claude API key and Google Cloud credentials in environment variables
- Use Vercel environment variables for production
- Never expose API keys to client-side code
- API routes validate session before processing

### Error Handling & Fallbacks

**AI Generation Failures:**
- Retry up to 3 times with exponential backoff
- Cache successful generations in Supabase to avoid re-generation
- Display manual template with placeholders if AI fails completely
- Log failures for debugging

**Rate Limiting & Cost Management:**
- Limit content package generation to 10 requests/hour per session
- Cache generated content for 30 days (regenerate button to override)
- Imagen 3 estimated cost: ~$0.04/image × 5 formats = $0.20/post
- Claude API estimated cost: ~$0.02/post for all platforms
- Monthly budget alert at $50 (approximately 200 posts worth)

### Caching Strategy

**Generated Content Caching (Supabase):**
```typescript
interface CachedContentPackage {
  id: string;
  slug: string;
  generated_at: Date;
  substack: { subject: string; body: string };
  linkedin: { post: string; hashtags: string[] };
  twitter: { single: string; thread: string[] };
  instagram: { caption: string; hashtags: string[] };
  image_urls: Record<string, string>;
}
```

**Cache Invalidation:**
- Auto-invalidate when MDX file is modified (compare `updatedAt`)
- Manual regenerate button in dashboard
- 30-day expiry for unused content

### API Routes

#### POST `/api/blog/generate-package`
```typescript
interface GeneratePackageRequest {
  slug: string;
  regenerate?: boolean;
}

interface GeneratePackageResponse {
  // Text content (generated via Claude API)
  substack: {
    subject: string;
    body: string;
  };
  linkedin: {
    post: string;
    hashtags: string[];
  };
  twitter: {
    single: string;
    thread: string[];
  };
  instagram: {
    caption: string;
    hashtags: string[];
  };
  // Images (generated via Imagen 3 / Vertex AI)
  images: {
    og: string;        // 1200x630 - URL path
    linkedin: string;  // 1200x627
    twitter: string;   // 1200x675
    instagram: string; // 1080x1350 (4:5)
    square: string;    // 1080x1080
  };
}
```

---

## Content Workflow

### Publishing Flow
```
1. Write post in MDX
   └── /content/blog/2026-01-24-post-slug/index.mdx

2. Add featured image
   └── /content/blog/2026-01-24-post-slug/hero.jpg

3. Set frontmatter status: "published"

4. Commit & push (or save if using CMS)

5. Build triggers, post goes live at /blog/[slug]

6. Visit /dashboard/content-package/[slug]
   └── AI generates all distribution content
   └── Images are generated/processed

7. Copy/paste assets to each platform:
   └── Substack: Paste newsletter, schedule send
   └── LinkedIn: Paste post, attach image, publish
   └── X: Post single tweet or thread
   └── Instagram: Post with 4:5 image, paste caption
```

### Distribution Schedule (Recommended)
```
Day 0: Publish on john-ellison.com
Day 0: Send Substack newsletter (drives immediate traffic)
Day 1: LinkedIn post (professional audience)
Day 1: Instagram post (4:5 image + caption)
Day 2: X single post
Day 3-4: X thread (repurpose for more reach)
```

---

## SEO & Backlink Strategy

### Internal Linking
- Every post should link to at least one other post
- Strategic links to /ai-transformation (2-3 per long post)
- Category pages build topical authority

### Cross-Platform Backlinks
- Substack newsletter always links to john-ellison.com
- Regenera.xyz posts link to john-ellison.com (before expiration)
- Social posts drive traffic to canonical URLs
- Add john-ellison.com link in Substack bio/about

### Canonical URL Strategy
```html
<!-- On john-ellison.com/blog/post-slug -->
<link rel="canonical" href="https://john-ellison.com/blog/post-slug" />

<!-- Substack cannot set canonical, so: -->
<!-- - Only post summaries/teasers on Substack -->
<!-- - Full content lives on john-ellison.com -->
<!-- - This avoids duplicate content issues -->
```

---

## Success Metrics

### SEO Metrics (6-month targets)
- [ ] Domain Authority increase (track via Moz/Ahrefs)
- [ ] Organic traffic to /blog pages (target: 500+ monthly visits)
- [ ] Keyword rankings for "AI transformation" related terms
- [ ] Backlinks to blog posts

### Engagement Metrics
- [ ] Average time on blog posts (target: 3+ minutes)
- [ ] Blog → AI Transformation click-through (target: 5%)
- [ ] Newsletter signup rate from blog CTAs (target: 2%)

### Distribution Metrics
- [ ] Substack open rate maintained at 40%+
- [ ] LinkedIn post engagement (likes, comments, shares)
- [ ] Traffic attribution by platform (via UTM)

---

## Phases & Milestones

### Phase 1: Foundation (Week 1-2) — ✅ COMPLETE

- [x] Set up MDX content system (`next-mdx-remote`, `gray-matter`)
- [x] Create /blog route with index page
- [x] Create /blog/[slug] individual post pages
- [x] Implement basic SEO (meta tags, OG, Twitter cards)
- [x] Create 1 published post ("The 8-Month Window")
- [x] CTA section linking to /ai-transformation
- [x] Add draft filtering (don't show `status: draft` in production)
- [x] JSON-LD structured data (Article schema)
- [x] XML sitemap generation for blog posts (`/blog/sitemap.ts`)
- [x] RSS feed (`/blog/feed.xml`)
- [x] Category archive pages (`/blog/category/[category]`)
- [x] Tag archive pages (`/blog/tag/[tag]`)
- [x] Share buttons component
- [x] Table of Contents component (for long posts)
- [x] Canonical URLs with enhanced OG/Twitter meta

### Phase 2: Distribution Engine (Week 3-4) — ✅ COMPLETE

- [x] Set up dashboard authentication (password protection at page level)
- [x] Build content package generator API (Claude Sonnet integration)
- [x] Create /dashboard/content-package UI with post list and generation
- [x] Implement copy-to-clipboard functionality for all platforms
- [x] Set up image generation with Sharp (branded overlays on hero/gradient)
- [x] Implement caching layer (Supabase) for generated content
- [x] Add error handling and retry logic
- [x] Rate limiting for API endpoints (10 requests/hour)

### Phase 3: Polish & Launch (Week 5-6) — 90% COMPLETE

- [ ] Design refinements matching /brand page
- [x] Related posts algorithm (category + tag scoring)
- [x] RelatedPosts component on post pages
- [x] Category filter tabs on blog index
- [ ] Analytics integration (view counts, scroll depth) — Optional
- [ ] Documentation for publishing workflow
- [x] `/writing` page banner pointing to `/blog`

### Phase 4: Optimization (Ongoing) — 60% COMPLETE

- [x] UTM parameter tracking per platform (Substack, LinkedIn, Twitter, Instagram)
- [x] Blog page view analytics (view tracking with referrer, UTM params)
- [x] ViewTracker component for automatic tracking
- [x] Analytics API routes and utility functions
- [ ] A/B test CTA placements
- [ ] Refine AI prompts based on copy performance
- [ ] Add scheduling/automation features
- [ ] Consider headless CMS integration (Sanity/Contentful)

---

## Testing Strategy

**Unit Tests:**
- `lib/blog/content.ts` - MDX parsing, frontmatter extraction
- AI prompt formatting functions
- Caching layer read/write

**Integration Tests:**
- API route `/api/blog/generate-package` with mocked Claude API
- Image generation with mocked Vertex AI

**E2E Tests (Playwright recommended):**
- Blog index loads, displays posts
- Individual post page renders MDX correctly
- Dashboard login flow
- Copy-to-clipboard works for each platform

**Manual Testing:**
- Generated content quality review before publishing
- Image aspect ratios correct per platform
- Mobile responsiveness of blog pages

---

## Accessibility & Mobile

**Accessibility Requirements:**
- All images have descriptive alt text
- Proper heading hierarchy (h1 → h2 → h3)
- Keyboard navigation for dashboard
- Focus indicators on interactive elements
- Color contrast meets WCAG AA
- Skip-to-content link on blog pages

**Mobile Considerations:**
- Blog index: Single-column layout on mobile
- Post page: Full-width images, readable typography (16px+ body)
- Dashboard: Responsive but primarily desktop-focused
- Touch targets: Minimum 44x44px for buttons

---

## Open Questions

1. **Content Migration:** Should we migrate existing Substack posts to john-ellison.com, or start fresh?
   - **Decision:** Start fresh. First post already live. Link to Substack for archives if needed.

2. **Email Capture:** Use Substack embed for subscriptions, or build custom with Resend?
   - **Recommendation:** Substack embed initially (simpler), custom later for more control
   - Note: Resend is already installed (`"resend": "^6.8.0"`)

3. **Comments:** Enable comments on posts?
   - **Decision:** No comments. Use CTA to direct conversation to email/contact.

4. **Draft Preview:** Need shareable preview links for drafts?
   - **Recommendation:** Yes. Implementation: `/blog/preview/[slug]?token=[signed-token]`
   - Signed token expires after 7 days

5. **RSS Feed:** Generate RSS for the blog?
   - **Decision:** Yes. Added to Phase 1 remaining tasks.

6. **Existing `/writing` page:** What happens to it?
   - **Recommendation:** Keep temporarily, add banner pointing to `/blog`. Remove after 3 months.
   - Or: Redirect `/writing` → `/blog` immediately

7. **Image Storage:** Store generated promo images locally or in cloud storage?
   - **Recommendation:** Store in `/public/images/blog/[slug]/promo/` for simplicity
   - Cloud storage (Cloudinary, S3) only if disk space becomes an issue

8. **Imagen 3 Alternatives:** What if Vertex AI is too expensive or complex?
   - **Fallback options:**
     - OpenAI DALL-E 3 (simpler API, similar quality)
     - Pre-made Canva templates with text overlays via Sharp
     - Manual image upload with no generation

---

## Appendix: AI Prompt Templates

### Substack Newsletter Generation
```
You are writing a newsletter teaser for John Ellison's Substack.
The newsletter drives subscribers to read the full article on john-ellison.com.

Post Title: {title}
Post Content: {content}

Generate:
1. An engaging subject line (under 50 characters)
2. A 2-3 sentence hook that creates curiosity
3. A 1-paragraph preview of the key insight (without giving everything away)
4. A clear CTA: "Read the full article →" with the URL

Voice: Thoughtful, direct, personal. Speaks to leaders interested in AI and regenerative approaches. Avoids hype and buzzwords.
```

### LinkedIn Post Generation
```
Create a LinkedIn post based on this article for John Ellison's audience of business leaders, investors, and regenerative practitioners.

Post Title: {title}
Post Content: {content}

Requirements:
- Professional but personable tone
- Start with a hook (question, bold statement, or story)
- 3-5 key insights formatted for readability (short paragraphs, line breaks)
- End with a reflection or lesson learned
- Include a CTA to read the full post
- Add 5-7 relevant hashtags
- Target 1,000-1,500 characters

Avoid: Buzzwords, excessive emojis, cliché phrases like "I'm excited to share"
```

### X/Twitter Thread Generation
```
Create a Twitter/X thread based on this article.

Post Title: {title}
Post Content: {content}

Requirements:
- 5-7 tweets maximum
- Tweet 1: Curiosity-driven hook (no link)
- Tweets 2-5: Key points, one insight per tweet
- Tweet 6: Personal take or "here's what I learned"
- Tweet 7: CTA with link to full article
- Each tweet under 280 characters
- Use line breaks for readability
- Minimal hashtags (0-2 total, on last tweet only)

Voice: Conversational, punchy, thought-provoking
```

### Instagram Caption Generation
```
Create an Instagram caption for John Ellison's post about AI transformation and regenerative leadership.

Post Title: {title}
Post Content: {content}

Requirements:
- Opening hook: Pattern interrupt, provocative question, or bold statement (first line is crucial)
- 2-3 short paragraphs with valuable insights (use line breaks for readability)
- Personal reflection or lesson learned
- CTA: Encourage engagement ("What do you think?" or "Link in bio for the full article")
- 15-25 hashtags at the end (mix of broad: #AITransformation #Leadership and niche: #RegenerativeBusiness #VibeCoding)
- Target 1,500-2,000 characters total

Voice: Authentic, thought-provoking, approachable. Less formal than LinkedIn but still substantive. Speaks to conscious leaders and creators.

Avoid: Clickbait, excessive emojis, generic motivational quotes
```

### Imagen 3 Prompt Template (for promotional images)
```
Generate a promotional image for a blog post.

Post Title: {title}
Post Themes: {extracted_themes}
Brand Colors: Deep purple (#4a1d96), cyan accents, dark backgrounds
Style: Modern, minimal, professional with subtle gradients

Requirements:
- Abstract or conceptual imagery related to the post themes
- Clean, uncluttered composition
- Space for text overlay if needed
- Evokes innovation, wisdom, transformation
- No text in the generated image (text added in post-processing)

Aspect Ratio: {aspect_ratio} (e.g., 4:5 for Instagram, 16:9 for OG)
```

---

## References

- [Next.js MDX Documentation](https://nextjs.org/docs/app/guides/mdx)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- [Substack Custom Domain SEO](https://unstackit.substack.com/p/my-pusing-a-custom-domain-on-substack)
- [SEO Funnels Strategy](https://www.39celsius.com/seo-funnels-how-to-develop-a-roadmap-of-exceptional-content/)
