# Typographic Audit & Recommendations: AI Transformation Page

## 1. Executive Summary
The current typography on the AI Transformation page suffers from inconsistency due to a mix of **fluid design system variables** (e.g., `var(--text-4xl)`) and **hardcoded Tailwind overrides** (e.g., `text-6xl`). This creates a disjointed visual hierarchy where some elements feel disproportionately large or small across different viewports.

The list styles are also inconsistent, relying on custom absolute positioning that may not align perfectly with line-heights, creating perceived "messiness."

## 2. Current State Audit

| Element | Current Implementation | Issues Identified |
| :--- | :--- | :--- |
| **Hero Headline (H1)** | `type-2xl md:text-6xl lg:text-7xl` | **Breaks Fluidity.** Overrides the system `type-4xl` clamp, leading to unpredictable scaling on tablets. |
| **Section Titles (H2)** | `heading-section` (`type-2xl`) | **Too Small.** `type-2xl` lacks sufficient authority for major section breaks compared to the Hero H1. |
| **Card/Grid Titles (H3)** | `heading-card` (`type-lg`) | **Contrast Issue.** `type-lg` is barely larger than body text (`type-base`), making cards hard to scan. |
| **Sub-sections (H4)** | `heading-subsection` (`type-lg`) | **Visual Duplicate.** visually identical to H3, confusing the hierarchy. |
| **Lists (ul/li)** | `space-y-2`, manual `pl-6` padding | **Tight Spacing.** `space-y-2` is too dense for reading. Custom `absolute` bullets risk alignment errors. |
| **Body (p)** | `type-lg` (Lead), `type-base` (Body) | **Good.** This is the most consistent part of the page. |

## 3. Recommended Design System Updates

To fix the "chaotic" feel, we should strictly adhere to the Fluid Type Scale defined in `globals.css` and remove ad-hoc overrides.

### A. Revised Hierarchy Mapping
We will shift the mapping up one step for most elements to increase contrast and readability.

| Role | Semantic Tag | Recommended Token | CSS Value (Fluid) |
| :--- | :--- | :--- | :--- |
| **Page Title** | `h1` | `type-4xl` | `clamp(3rem, 2.5rem + 2.5vw, 5rem)` |
| **Section Head** | `h2` | `type-3xl` | `clamp(2.5rem, 2rem + 2.5vw, 4rem)` |
| **Feature Title** | `h3` | `type-2xl` | `clamp(2rem, 1.5rem + 2.5vw, 3.5rem)` |
| **Card Title** | `h4` | `type-xl` | `clamp(1.5rem, 1.3rem + 1vw, 2rem)` |
| **Sub-heading** | `h5` / `h6` | `type-lg` | `clamp(1.15rem, 1.05rem + 0.5vw, 1.35rem)` |
| **Lead Text** | `p.lead` | `type-lg` | `clamp(1.15rem, 1.05rem + 0.5vw, 1.35rem)` |
| **Body Text** | `p` | `type-base` | `clamp(1rem, 0.95rem + 0.25vw, 1.15rem)` |

### B. Spacing & Lists Fix
Instead of `space-y-2` which is tight (0.5rem), we will standardize on `gap-3` (0.75rem) or `space-y-3` for list items to let the content breathe.

**Recommendation:**
```tsx
// Before
<ul className="space-y-2">
  <li className="type-sm text-white/70 pl-6 relative">...</li>
</ul>

// After (Cleaner, more breathable)
<ul className="flex flex-col gap-3">
  <li className="type-base text-white/80 pl-8 relative">...</li>
</ul>
```

## 4. Implementation Plan

1.  **Refine `globals.css` Utilities**: Update `.heading-section`, `.heading-card` to use the new larger size mappings.
2.  **Clean Components**: Remove `md:text-6xl`, `lg:text-7xl` from `HeroSection`.
3.  **Standardize Lists**: Update list components in `ProblemSection`, `ApproachSection`, etc., to use consistent spacing.

**Ready to apply these visual updates?**
