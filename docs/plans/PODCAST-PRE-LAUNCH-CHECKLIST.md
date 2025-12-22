# Podcast Pre-Launch Checklist

## ✅ Already Configured
- [x] RSS feed URL (ReFi Podcast for testing)
- [x] Spotify subscribe link
- [x] Apple Podcasts subscribe link
- [x] Guest booking calendar (Google Calendar)
- [x] CORS proxy enabled for RSS fetching

---

## 🎯 Before Launch: Configuration Updates

### 1. Switch to Your Podcast RSS Feed
**When:** When you launch your own podcast (not using ReFi for testing)

**File:** `podcast/podcast.js`
**Line:** 7

```javascript
RSS_FEED_URL: 'https://anchor.fm/s/YOUR-SHOW-ID/podcast/rss',
```

**How to find your RSS URL:**
- Spotify for Podcasters → Your Show → Settings → RSS Feed
- Or check your podcast hosting platform

---

### 2. Update Subscribe URLs
**When:** When your own podcast is live on Spotify/Apple

**File:** `podcast/podcast.js`
**Lines:** 13-15

Currently set to ReFi Podcast URLs. Update with your show:

```javascript
SPOTIFY_URL: 'https://open.spotify.com/show/YOUR-SHOW-ID',
APPLE_URL: 'https://podcasts.apple.com/podcast/YOUR-SHOW-ID',
RSS_URL: 'https://anchor.fm/s/YOUR-SHOW-ID/podcast/rss'
```

---

### 3. Create Podcast Social Sharing Image
**File to create:** `/podcast-og-image.jpg`

**Specs:**
- Dimensions: 1200x630px (Facebook/Twitter OG standard)
- Content: Show artwork + title "The John Ellison Show"
- Format: JPG or PNG

**Used for:**
- Facebook shares
- Twitter card previews
- LinkedIn previews

Currently referenced in `podcast/index.html` line 14 & 21:
```html
<meta property="og:image" content="https://john-ellison.com/podcast-og-image.jpg">
```

---

### 4. Update Domain References
**Files:** `podcast/index.html`

**Lines to update when deploying to custom domain:**
- Line 11: `og:url` → Change `john-ellison.com` to your domain
- Line 18: `twitter:url` → Same
- Line 25: `canonical` → Same

If using `john-ellison.com`, no changes needed.

---

### 5. Update Twitter Handle (Optional)
**File:** `podcast/index.html`
**Line:** 22

```html
<meta property="twitter:site" content="@iamjohnellison">
```

Update if you have a specific podcast Twitter account.

---

### 6. Update Guest Booking Calendar (If Needed)
**File:** `podcast/guest/index.html`
**Line:** 93

Currently set to:
```html
<a href="https://calendar.app.google/dDjrorCgNLpf7eiQ8"
```

Update if you change calendar booking link or want different duration.

---

### 7. Customize Guest Page Content (Optional)
**File:** `podcast/guest/index.html`

**Lines to potentially update:**
- Lines 44-49: Topics you explore (currently has 6 topics)
- Lines 56-73: Episode format cards (duration, style, etc.)
- Line 87-88: Booking section intro text

---

### 8. Test CORS Proxy Toggle
**File:** `podcast/podcast.js`
**Line:** 8

```javascript
USE_PROXY: true, // Set to true if CORS issues occur
```

**After deploying to production:**
1. Try setting to `false` first
2. If RSS fetch fails with CORS error, set back to `true`
3. Some hosting platforms allow direct RSS fetching without proxy

---

## 🧪 Testing Checklist

### Before Going Live:

**Podcast Page (`/podcast/`):**
- [ ] RSS feed loads episodes correctly
- [ ] Featured episode displays with correct artwork
- [ ] Audio player works
- [ ] Episode grid shows all episodes
- [ ] Click episode → URL hash updates → episode loads
- [ ] Browser back button works
- [ ] Show notes toggle works
- [ ] Share button works (test on mobile for Web Share API)
- [ ] Subscribe buttons link to correct platforms
- [ ] Mobile responsive at 375px, 768px, 1024px

**Guest Page (`/podcast/guest/`):**
- [ ] Page loads with correct styling
- [ ] Google Calendar booking link works
- [ ] Opens in new tab
- [ ] Mobile responsive

**Performance:**
- [ ] Skeleton loaders show on first visit
- [ ] Episodes cache in localStorage (reload should be instant)
- [ ] Test cache clear: Open console → `clearCache()` → reload

**Social Sharing:**
- [ ] Share on Facebook → preview shows correct image/title
- [ ] Share on Twitter → Twitter Card shows correctly
- [ ] Share specific episode → meta tags update

---

## 🚀 Deployment Steps

### 1. Build for Production
```bash
npm run build
```

### 2. Deploy
```bash
# Deploy dist folder to your hosting (Vercel, Netlify, etc.)
```

### 3. Post-Deploy Verification
- [ ] Visit `https://yourdomain.com/podcast/`
- [ ] Check browser console for errors
- [ ] Test on mobile device (not just DevTools)
- [ ] Test sharing on social platforms
- [ ] Verify analytics/tracking if implemented

---

## 📝 Future Enhancements (Optional)

### When Your Podcast Has 5+ Episodes:

**Add to Homepage:**
- Uncomment podcast section in `index.html` (lines noted in plan)
- Show 2-3 latest episodes
- Link to `/podcast` for full archive

### Analytics (Recommended):
- Add Google Analytics or Plausible to track:
  - Episode plays
  - Most popular episodes
  - Guest page visits

### Performance Optimization:
- Consider reducing `CACHE_TTL` to 30min for more frequent updates
- Or increase to 2-3 hours to reduce API calls

### Guest Applications:
- If you want a form instead of calendar:
  - Show the contact form in `guest/index.html` (currently hidden)
  - Connect to form handler (Formspree, Netlify Forms, etc.)

---

## 🔗 Quick Reference

**Current Configuration:**
- RSS: `https://anchor.fm/s/be4ca48c/podcast/rss` (ReFi Podcast)
- Spotify: `https://open.spotify.com/show/5RTHF6JVgQL1cgaVfvi7cv`
- Apple: `https://podcasts.apple.com/us/podcast/refi-podcast/id1609683147`
- Booking: `https://calendar.app.google/dDjrorCgNLpf7eiQ8`

**Files to Update:**
1. `podcast/podcast.js` - RSS feed, subscribe URLs
2. `podcast/index.html` - Social meta tags, domain
3. `podcast/guest/index.html` - Booking calendar, topics
4. `/podcast-og-image.jpg` - Social sharing image (create)

---

## ✨ You're Ready!

The podcast integration is fully functional with ReFi Podcast data for testing. When you're ready to launch your own show:

1. Create your podcast and get RSS feed
2. Update `RSS_FEED_URL` in `podcast/podcast.js`
3. Create and upload `podcast-og-image.jpg`
4. Test everything
5. Deploy!

**Test now at:** http://localhost:3000/podcast/
