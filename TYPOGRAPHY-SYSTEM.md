# Typography System Documentation

## Overview
A production-grade, consistent typography system for the john-ellison.com site. This system eliminates the "weird hacks" and scene-specific overrides that were scattered throughout the CSS.

## What Was Fixed

### Before:
- ❌ Inconsistent font sizes across scenes
- ❌ Duplicate `.scene-label`, `.scene h2`, `.scene p` definitions
- ❌ Hardcoded `font-family: 'Clash Display'` everywhere
- ❌ Mixed line heights (1.00, 1.1, 1.2, 1.5, 1.6, 1.7, 1.75)
- ❌ Unnecessary `!important` flags on typography
- ❌ Scene-specific font overrides
- ❌ No clear type scale or rhythm

### After:
- ✅ Single source of truth with CSS custom properties
- ✅ Fluid typography that scales smoothly from mobile → desktop
- ✅ Consistent line heights and letter spacing
- ✅ Unified scene typography (all scenes use the same base styles)
- ✅ Clear, maintainable type scale
- ✅ Proper separation of typography and animation concerns

## Type Scale

The system uses 8 sizes that scale fluidly:

```css
--text-xs:   0.7rem  → 0.8rem   /* Labels, captions */
--text-sm:   0.85rem → 0.95rem  /* Small text, metadata */
--text-base: 1rem    → 1.15rem  /* Body text */
--text-lg:   1.15rem → 1.35rem  /* Large body */
--text-xl:   1.5rem  → 2rem     /* h3, emphasis blocks */
--text-2xl:  2rem    → 3.5rem   /* h2, section titles */
--text-3xl:  2.5rem  → 4rem     /* Large headings */
--text-4xl:  3rem    → 5rem     /* h1, hero text */
```

## Usage

### Font Families
```css
/* Display font (headings) */
font-family: var(--font-display);

/* Body font (paragraphs) */
font-family: var(--font-body);
```

### Font Sizes
```css
/* Always use CSS variables */
font-size: var(--text-2xl);   /* Good ✓ */
font-size: 2rem;                /* Bad ✗ */
```

### Line Heights
```css
--leading-tight: 1.1;      /* Headings */
--leading-snug: 1.3;       /* Compact text */
--leading-normal: 1.5;     /* Standard */
--leading-relaxed: 1.7;    /* Body text */
```

### Letter Spacing
```css
--tracking-tight: -0.02em;    /* Large headings */
--tracking-normal: 0;          /* Default */
--tracking-wide: 0.05em;       /* Slight spacing */
--tracking-wider: 0.1em;       /* More spacing */
--tracking-widest: 0.15em;     /* Labels, all-caps */
```

## Scene Typography

All scene sections now use consistent base styles:

```css
.scene-label {
    /* Automatically styled - no overrides needed */
}

.scene h2 {
    /* Automatically styled - no overrides needed */
}

.scene p {
    /* Automatically styled - no overrides needed */
}
```

### Animation States
Typography and animations are now separated:
- **Typography**: Defined once in the design system
- **Animations**: Defined separately with transitions/transforms

## Migration Guide

### Replacing Hardcoded Values

**Before:**
```css
.my-heading {
    font-family: 'Clash Display', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.1;
}
```

**After:**
```css
.my-heading {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    line-height: var(--leading-tight);
}
```

### When to Override
Only override typography when you need **truly unique** styling for a specific component:
- Special effects (gradients, outlines)
- Unique decorative elements
- Component-specific adjustments

**Never** override just to change the base font size or family.

## Files Modified

1. **styles.css**
   - Added comprehensive `:root` CSS variables (lines 8-57)
   - Added base typography styles (lines 62-118)
   - Removed duplicate scene typography (lines 1352-1409 cleaned up)
   - Replaced all `font-family: 'Clash Display'` with `var(--font-display)`
   - Replaced all `font-family: 'Satoshi'` with `var(--font-body)`
   - Removed typography `!important` flags
   - Unified all scene sections to use base styles

## Benefits

1. **Maintainability**: Change typography site-wide by updating CSS variables
2. **Consistency**: All scenes use the same base styles automatically
3. **Performance**: Reduced CSS size by eliminating redundant rules
4. **Scalability**: Easy to add new components that follow the system
5. **Responsive**: Fluid typography scales smoothly across all viewports
6. **Developer Experience**: Clear, documented system is easy to understand

## Best Practices

1. ✅ Use CSS variables for all typography
2. ✅ Let base styles handle scene typography
3. ✅ Override only when truly necessary
4. ✅ Keep typography separate from layout/animation
5. ✅ Document any overrides with comments
6. ❌ Don't add scene-specific font-size overrides
7. ❌ Don't use `!important` on typography (unless unavoidable)
8. ❌ Don't hardcode font families or sizes

## Testing

The system has been applied and tested:
- ✅ All font families use CSS variables
- ✅ Scene labels are consistent across all sections
- ✅ Scene h2 headings are consistent
- ✅ Animation states preserved
- ✅ Responsive scaling works across viewports
- ✅ No visual regressions

View at: http://localhost:3002/
