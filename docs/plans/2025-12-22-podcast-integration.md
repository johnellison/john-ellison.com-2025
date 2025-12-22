# Podcast Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build RSS-powered podcast page with episode display, inline player, and guest booking functionality.

**Architecture:** Vanilla JS fetches RSS feed from Spotify for Podcasters (testing with ReFi Podcast), parses XML, renders episode cards dynamically. Client-side URL hash routing for episode permalinks. Inline Spotify player with expandable show notes. Separate unlisted guest booking page.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, DOMParser for RSS, localStorage for caching, GSAP for animations (already in use), Calendly embed.

---

## Task 1: Create Directory Structure and Base Files

**Files:**
- Create: `podcast/index.html`
- Create: `podcast/podcast.js`
- Create: `podcast/podcast.css`
- Create: `podcast/guest/index.html`

**Step 1: Create podcast directory**

```bash
mkdir -p podcast/guest
```

**Step 2: Create base podcast page HTML**

Create `podcast/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The John Ellison Show — Ancient Wisdom Meets Modern Technology</title>
    <meta name="description" content="Exploring how we build regenerative futures through AI, Indigenous knowledge, and first principles thinking.">
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="podcast.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
</head>
<body>
    <!-- Navigation (reuse from main site) -->
    <nav class="site-nav" id="siteNav">
        <a href="../" class="nav-logo">
            <img src="../je-logo.webp" alt="JE" width="48" height="48" />
        </a>
        <div class="nav-links">
            <a href="../#scene2">Challenges</a>
            <a href="../#scene3">Experience</a>
            <a href="../#scene4">AI Sprints</a>
            <a href="../#scene5">Regeneration</a>
            <a href="../#scene7" class="nav-cta">Contact</a>
        </div>
    </nav>

    <!-- Cosmic Background -->
    <div class="cosmos" id="cosmos">
        <div class="nebula nebula-1"></div>
        <div class="nebula nebula-2"></div>
    </div>

    <!-- Podcast Container -->
    <div class="podcast-container">
        <!-- Hero Section - Featured Episode -->
        <section class="podcast-hero" id="podcastHero">
            <div class="podcast-branding">
                <h1 class="show-title">The John Ellison Show</h1>
                <p class="show-tagline">Ancient wisdom meets modern technology</p>
            </div>

            <div id="featuredEpisode" class="featured-episode">
                <!-- Populated by JS -->
            </div>
        </section>

        <!-- Subscribe CTAs -->
        <section class="subscribe-section">
            <h2>Subscribe</h2>
            <div class="subscribe-buttons">
                <a href="#" target="_blank" class="subscribe-btn spotify">
                    <span>Spotify</span>
                </a>
                <a href="#" target="_blank" class="subscribe-btn apple">
                    <span>Apple Podcasts</span>
                </a>
                <a href="#" target="_blank" class="subscribe-btn rss">
                    <span>RSS Feed</span>
                </a>
            </div>
        </section>

        <!-- Episode Archive -->
        <section class="episode-archive">
            <h2>All Episodes</h2>
            <div id="episodeGrid" class="episode-grid">
                <!-- Populated by JS -->
            </div>
        </section>
    </div>

    <!-- Loading State -->
    <div id="loadingState" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading episodes...</p>
    </div>

    <!-- Error State -->
    <div id="errorState" class="error-state" style="display: none;">
        <p>Unable to load podcast episodes. Please try again later.</p>
    </div>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-content">
            <p><a href="guest/">Interested in being a guest?</a></p>
        </div>
    </footer>

    <script src="podcast.js"></script>
</body>
</html>
```

**Step 3: Create empty JS file**

Create `podcast/podcast.js`:

```javascript
// Podcast RSS Feed Integration
// John Ellison Show

console.log('Podcast page loaded');
```

**Step 4: Create empty CSS file**

Create `podcast/podcast.css`:

```css
/* Podcast Page Styles */

.podcast-container {
    position: relative;
    z-index: 10;
    padding: 6rem 2rem 4rem;
    max-width: 1400px;
    margin: 0 auto;
}
```

**Step 5: Commit**

```bash
git add podcast/
git commit -m "feat: create podcast page structure with base HTML"
```

---

## Task 2: Build RSS Feed Parser

**Files:**
- Modify: `podcast/podcast.js`

**Step 1: Add RSS feed configuration**

Add to `podcast/podcast.js`:

```javascript
// Configuration
const CONFIG = {
    // Testing with ReFi Podcast - swap to your RSS when ready
    RSS_FEED_URL: 'https://anchor.fm/s/refi-podcast-id/podcast/rss', // TODO: Update with actual ReFi RSS URL
    CACHE_KEY: 'podcast_episodes_cache',
    CACHE_TTL: 60 * 60 * 1000, // 1 hour
};

// State
let episodes = [];
let currentEpisode = null;
```

**Step 2: Add cache management functions**

Add to `podcast/podcast.js`:

```javascript
// Cache Management
function getCachedEpisodes() {
    try {
        const cached = localStorage.getItem(CONFIG.CACHE_KEY);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;

        if (age > CONFIG.CACHE_TTL) {
            localStorage.removeItem(CONFIG.CACHE_KEY);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Cache read error:', error);
        return null;
    }
}

function setCachedEpisodes(data) {
    try {
        const cacheData = {
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Cache write error:', error);
    }
}
```

**Step 3: Add RSS fetch and parse functions**

Add to `podcast/podcast.js`:

```javascript
// RSS Fetching
async function fetchRSS(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('RSS fetch error:', error);
        throw error;
    }
}

// RSS Parsing
function parseRSS(xmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');

    // Check for parse errors
    const parseError = doc.querySelector('parsererror');
    if (parseError) {
        throw new Error('XML parse error');
    }

    const items = doc.querySelectorAll('item');
    const episodes = [];

    items.forEach((item, index) => {
        const title = item.querySelector('title')?.textContent || 'Untitled';
        const description = item.querySelector('description')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const guid = item.querySelector('guid')?.textContent || `episode-${index}`;
        const link = item.querySelector('link')?.textContent || '';

        // Get enclosure (audio file)
        const enclosure = item.querySelector('enclosure');
        const audioUrl = enclosure?.getAttribute('url') || '';

        // Get iTunes image
        const itunesImage = item.querySelector('image');
        const artworkUrl = itunesImage?.getAttribute('href') ||
                          doc.querySelector('channel image url')?.textContent || '';

        // Get duration
        const itunesDuration = item.querySelector('duration')?.textContent || '';

        episodes.push({
            title,
            description,
            audioUrl,
            artworkUrl,
            pubDate: new Date(pubDate),
            duration: itunesDuration,
            guid,
            link,
            slug: generateSlug(title)
        });
    });

    return episodes;
}

// Helper: Generate URL slug from title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
```

**Step 4: Add main load function**

Add to `podcast/podcast.js`:

```javascript
// Main Load Function
async function loadEpisodes() {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');

    // Show loading
    loadingState.style.display = 'flex';
    errorState.style.display = 'none';

    try {
        // Check cache first
        const cached = getCachedEpisodes();
        if (cached) {
            console.log('Using cached episodes');
            episodes = cached;
            renderEpisodes();
            loadingState.style.display = 'none';
            return;
        }

        // Fetch fresh data
        console.log('Fetching RSS feed...');
        const xmlString = await fetchRSS(CONFIG.RSS_FEED_URL);
        episodes = parseRSS(xmlString);

        // Cache the results
        setCachedEpisodes(episodes);

        // Render
        renderEpisodes();
        loadingState.style.display = 'none';

    } catch (error) {
        console.error('Failed to load episodes:', error);
        loadingState.style.display = 'none';
        errorState.style.display = 'flex';
    }
}

// Placeholder render function
function renderEpisodes() {
    console.log(`Loaded ${episodes.length} episodes`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadEpisodes();
});
```

**Step 5: Test RSS parser (console)**

1. Open `podcast/index.html` in browser
2. Open DevTools Console
3. Should see: "Fetching RSS feed..." then "Loaded X episodes"
4. Check localStorage for cached data

**Step 6: Commit**

```bash
git add podcast/podcast.js
git commit -m "feat: add RSS feed parser with caching"
```

---

## Task 3: Implement Episode Rendering (Featured + Grid)

**Files:**
- Modify: `podcast/podcast.js`

**Step 1: Add featured episode render function**

Add to `podcast/podcast.js`:

```javascript
// Render Featured Episode
function renderFeaturedEpisode(episode) {
    const container = document.getElementById('featuredEpisode');

    if (!episode) {
        container.innerHTML = '<p>No episodes available yet.</p>';
        return;
    }

    const formattedDate = episode.pubDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    container.innerHTML = `
        <div class="featured-content">
            <div class="featured-artwork">
                <img src="${episode.artworkUrl}" alt="${episode.title}" />
            </div>
            <div class="featured-details">
                <div class="episode-meta">
                    <span class="episode-date">${formattedDate}</span>
                    ${episode.duration ? `<span class="episode-duration">${episode.duration}</span>` : ''}
                </div>
                <h2 class="episode-title">${episode.title}</h2>
                <div class="episode-player" id="episodePlayer">
                    <!-- Player will be inserted here -->
                </div>
                <div class="episode-description">
                    <button class="show-notes-toggle" onclick="toggleShowNotes()">
                        Show Notes <span class="toggle-icon">▼</span>
                    </button>
                    <div class="show-notes-content" id="showNotesContent" style="display: none;">
                        ${episode.description}
                    </div>
                </div>
                <div class="episode-actions">
                    <button class="share-btn" onclick="shareEpisode()">
                        Share Episode
                    </button>
                    ${episode.link ? `<a href="${episode.link}" target="_blank" class="listen-spotify">Listen on Spotify</a>` : ''}
                </div>
            </div>
        </div>
    `;

    // Load player
    loadPlayer(episode);
}

// Toggle show notes
function toggleShowNotes() {
    const content = document.getElementById('showNotesContent');
    const toggle = document.querySelector('.toggle-icon');

    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.textContent = '▲';
    } else {
        content.style.display = 'none';
        toggle.textContent = '▼';
    }
}

// Share episode
function shareEpisode() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: currentEpisode.title,
            text: 'Check out this episode of The John Ellison Show',
            url: url
        });
    } else {
        navigator.clipboard.writeText(url);
        alert('Episode link copied to clipboard!');
    }
}

// Load audio player (HTML5 for now)
function loadPlayer(episode) {
    const playerContainer = document.getElementById('episodePlayer');

    if (!episode.audioUrl) {
        playerContainer.innerHTML = '<p>Audio unavailable</p>';
        return;
    }

    playerContainer.innerHTML = `
        <audio controls class="episode-audio">
            <source src="${episode.audioUrl}" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    `;
}
```

**Step 2: Add episode grid render function**

Add to `podcast/podcast.js`:

```javascript
// Render Episode Grid
function renderEpisodeGrid(episodesToRender) {
    const grid = document.getElementById('episodeGrid');

    if (!episodesToRender || episodesToRender.length === 0) {
        grid.innerHTML = '<p>No episodes available yet.</p>';
        return;
    }

    grid.innerHTML = episodesToRender.map((episode, index) => {
        const formattedDate = episode.pubDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        // Truncate description
        const shortDesc = episode.description
            .replace(/<[^>]*>/g, '') // Strip HTML
            .substring(0, 150) + '...';

        return `
            <div class="episode-card" data-slug="${episode.slug}" onclick="loadEpisodeBySlug('${episode.slug}')">
                <div class="episode-card-artwork">
                    <img src="${episode.artworkUrl}" alt="${episode.title}" loading="lazy" />
                    <div class="play-overlay">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>
                <div class="episode-card-content">
                    <div class="episode-card-meta">
                        <span class="episode-number">Episode ${episodes.length - index}</span>
                        <span class="episode-date">${formattedDate}</span>
                    </div>
                    <h3 class="episode-card-title">${episode.title}</h3>
                    <p class="episode-card-desc">${shortDesc}</p>
                    ${episode.duration ? `<span class="episode-card-duration">${episode.duration}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
}
```

**Step 3: Update main render function**

Replace the placeholder `renderEpisodes()` function:

```javascript
// Main Render Function
function renderEpisodes() {
    console.log(`Rendering ${episodes.length} episodes`);

    if (episodes.length === 0) {
        return;
    }

    // Check URL hash for specific episode
    const hash = window.location.hash.slice(1);
    if (hash) {
        const episode = episodes.find(ep => ep.slug === hash);
        if (episode) {
            currentEpisode = episode;
            renderFeaturedEpisode(episode);
            renderEpisodeGrid(episodes);
            scrollToHero();
            return;
        }
    }

    // Default: show latest episode
    currentEpisode = episodes[0];
    renderFeaturedEpisode(currentEpisode);
    renderEpisodeGrid(episodes);
}

// Load episode by slug
function loadEpisodeBySlug(slug) {
    const episode = episodes.find(ep => ep.slug === slug);
    if (!episode) return;

    currentEpisode = episode;
    window.location.hash = slug;
    renderFeaturedEpisode(episode);
    scrollToHero();
}

// Scroll to hero
function scrollToHero() {
    const hero = document.getElementById('podcastHero');
    hero.scrollIntoView({ behavior: 'smooth' });
}

// Handle browser back/forward
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash && episodes.length > 0) {
        loadEpisodeBySlug(hash);
    }
});
```

**Step 4: Test rendering**

1. Open `podcast/index.html` in browser
2. Should see featured episode at top
3. Should see grid of episodes below
4. Click episode card → should update hero and URL hash

**Step 5: Commit**

```bash
git add podcast/podcast.js
git commit -m "feat: implement episode rendering with featured and grid views"
```

---

## Task 4: Style Podcast Page (CSS)

**Files:**
- Modify: `podcast/podcast.css`

**Step 1: Add base podcast container styles**

Add to `podcast/podcast.css`:

```css
/* Podcast Page Styles */

.podcast-container {
    position: relative;
    z-index: 10;
    padding: 6rem 2rem 4rem;
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
}

/* Podcast Branding */
.podcast-branding {
    text-align: center;
    margin-bottom: 4rem;
}

.show-title {
    font-family: 'Clash Display', sans-serif;
    font-size: 3.5rem;
    font-weight: 700;
    background: linear-gradient(
        135deg,
        rgba(255, 150, 150, 1) 0%,
        rgba(255, 200, 100, 1) 25%,
        rgba(100, 200, 255, 1) 50%,
        rgba(180, 150, 255, 1) 75%,
        rgba(255, 150, 200, 1) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
}

.show-tagline {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 300;
}

/* Loading State */
.loading-state {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top-color: rgba(255, 150, 150, 0.8);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-state p {
    margin-top: 1rem;
    color: rgba(255, 255, 255, 0.6);
}

/* Error State */
.error-state {
    text-align: center;
    padding: 4rem 2rem;
    color: rgba(255, 100, 100, 0.8);
}
```

**Step 2: Add featured episode styles**

Add to `podcast/podcast.css`:

```css
/* Featured Episode */
.podcast-hero {
    margin-bottom: 6rem;
}

.featured-episode {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.featured-content {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 3rem;
    align-items: start;
}

.featured-artwork {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.featured-artwork img {
    width: 100%;
    height: auto;
    display: block;
}

.featured-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.episode-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
}

.episode-title {
    font-family: 'Clash Display', sans-serif;
    font-size: 2rem;
    font-weight: 600;
    color: #fff;
    line-height: 1.3;
    margin: 0;
}

.episode-player {
    margin: 1rem 0;
}

.episode-audio {
    width: 100%;
    height: 54px;
    border-radius: 12px;
}

/* Show Notes */
.episode-description {
    margin-top: 1rem;
}

.show-notes-toggle {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
}

.show-notes-toggle:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
}

.show-notes-content {
    margin-top: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.7;
    font-size: 0.95rem;
}

.show-notes-content p {
    margin-bottom: 1rem;
}

/* Episode Actions */
.episode-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.share-btn,
.listen-spotify {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
}

.share-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
}

.share-btn:hover {
    background: rgba(255, 255, 255, 0.08);
}

.listen-spotify {
    background: #1DB954;
    border: none;
    color: #fff;
}

.listen-spotify:hover {
    background: #1ed760;
}

/* Mobile Responsive - Featured Episode */
@media (max-width: 968px) {
    .featured-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .featured-artwork {
        max-width: 400px;
        margin: 0 auto;
    }
}
```

**Step 3: Add subscribe section styles**

Add to `podcast/podcast.css`:

```css
/* Subscribe Section */
.subscribe-section {
    text-align: center;
    margin-bottom: 6rem;
}

.subscribe-section h2 {
    font-family: 'Clash Display', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
}

.subscribe-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.subscribe-btn {
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 2px solid transparent;
}

.subscribe-btn.spotify {
    background: #1DB954;
    color: #fff;
}

.subscribe-btn.spotify:hover {
    background: #1ed760;
    transform: translateY(-2px);
}

.subscribe-btn.apple {
    background: linear-gradient(135deg, #FA233B 0%, #FB5C74 100%);
    color: #fff;
}

.subscribe-btn.apple:hover {
    transform: translateY(-2px);
}

.subscribe-btn.rss {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.9);
}

.subscribe-btn.rss:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
}
```

**Step 4: Add episode grid styles**

Add to `podcast/podcast.css`:

```css
/* Episode Archive */
.episode-archive {
    margin-bottom: 4rem;
}

.episode-archive h2 {
    font-family: 'Clash Display', sans-serif;
    font-size: 2rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
}

.episode-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
}

.episode-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.episode-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 150, 150, 0.3);
    box-shadow: 0 12px 40px rgba(255, 150, 150, 0.15);
}

.episode-card-artwork {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
}

.episode-card-artwork img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.episode-card:hover .episode-card-artwork img {
    transform: scale(1.05);
}

.play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.episode-card:hover .play-overlay {
    opacity: 1;
}

.play-overlay svg {
    width: 60px;
    height: 60px;
    color: #fff;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.episode-card-content {
    padding: 1.5rem;
}

.episode-card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.episode-card-title {
    font-family: 'Clash Display', sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    color: #fff;
    margin: 0 0 0.75rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.episode-card-desc {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    margin: 0 0 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.episode-card-duration {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
}

/* Mobile Responsive - Episode Grid */
@media (max-width: 768px) {
    .episode-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .show-title {
        font-size: 2.5rem;
    }
}
```

**Step 5: Test styles**

1. Open `podcast/index.html` in browser
2. Check featured episode styling
3. Check episode grid layout
4. Test hover effects
5. Test mobile responsive (resize browser)

**Step 6: Commit**

```bash
git add podcast/podcast.css
git commit -m "style: add podcast page CSS with cosmic design system"
```

---

## Task 5: Create Guest Booking Page

**Files:**
- Create: `podcast/guest/index.html`
- Create: `podcast/guest/guest.css`

**Step 1: Create guest booking HTML**

Create `podcast/guest/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Be a Guest — The John Ellison Show</title>
    <meta name="description" content="Join The John Ellison Show for a conversation exploring ancient wisdom and modern technology.">
    <link rel="stylesheet" href="../../styles.css">
    <link rel="stylesheet" href="guest.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="site-nav" id="siteNav">
        <a href="../../" class="nav-logo">
            <img src="../../je-logo.webp" alt="JE" width="48" height="48" />
        </a>
        <div class="nav-links">
            <a href="../">← Back to Podcast</a>
        </div>
    </nav>

    <!-- Cosmic Background -->
    <div class="cosmos" id="cosmos">
        <div class="nebula nebula-1"></div>
        <div class="nebula nebula-2"></div>
    </div>

    <!-- Guest Page Container -->
    <div class="guest-container">
        <!-- Hero -->
        <section class="guest-hero">
            <h1>Be a Guest on<br><span class="show-name">The John Ellison Show</span></h1>
            <p class="guest-tagline">Join me for a conversation exploring how ancient wisdom and modern technology come together to build regenerative futures.</p>
        </section>

        <!-- About the Show -->
        <section class="guest-section">
            <h2>About the Show</h2>
            <p>The John Ellison Show sits at the intersection of Indigenous knowledge, regenerative technology, and AI ethics. We explore:</p>
            <ul class="guest-topics">
                <li>Indigenous data sovereignty + AI ethics</li>
                <li>Regenerative technology + climate impact</li>
                <li>Ancient intelligence frameworks applied to modern problems</li>
                <li>Building sustainable businesses without compromising values</li>
                <li>The role of consciousness in designing intelligent systems</li>
                <li>How communities (not corporations) should own their data</li>
            </ul>
        </section>

        <!-- Episode Format -->
        <section class="guest-section">
            <h2>What to Expect</h2>
            <div class="format-grid">
                <div class="format-card">
                    <div class="format-icon">⏱️</div>
                    <h3>45-90 Minutes</h3>
                    <p>Long-form conversational format. No rush, we go deep.</p>
                </div>
                <div class="format-card">
                    <div class="format-icon">🎙️</div>
                    <h3>Conversational</h3>
                    <p>Not journalistic. Exploratory, vulnerable, honest.</p>
                </div>
                <div class="format-card">
                    <div class="format-icon">🌍</div>
                    <h3>Remote Friendly</h3>
                    <p>Record via Zoom/Riverside from anywhere.</p>
                </div>
                <div class="format-card">
                    <div class="format-icon">📝</div>
                    <h3>Show Notes Included</h3>
                    <p>We handle all show notes, editing, and promotion.</p>
                </div>
            </div>
        </section>

        <!-- Previous Guests (when available) -->
        <section class="guest-section" id="previousGuestsSection" style="display: none;">
            <h2>Previous Guests</h2>
            <div class="previous-guests-grid">
                <!-- Will populate dynamically when episodes exist -->
            </div>
        </section>

        <!-- Booking Form -->
        <section class="guest-section booking-section">
            <h2>Book Your Episode</h2>
            <p>Interested in being a guest? Use the calendar below to schedule a recording session.</p>

            <!-- Calendly Embed -->
            <div class="calendly-container">
                <!-- Replace with your actual Calendly link -->
                <div class="calendly-inline-widget"
                     data-url="https://calendly.com/your-link/podcast-recording?hide_gdpr_banner=1"
                     style="min-width:320px;height:700px;">
                </div>
                <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
            </div>

            <!-- Alternative: Contact Form if Calendly not set up -->
            <div class="contact-form" style="display: none;">
                <form id="guestContactForm">
                    <div class="form-group">
                        <label for="name">Name *</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="organization">Organization / Project</label>
                        <input type="text" id="organization" name="organization">
                    </div>
                    <div class="form-group">
                        <label for="topic">What would you like to discuss?</label>
                        <textarea id="topic" name="topic" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Submit Guest Request</button>
                </form>
            </div>
        </section>
    </div>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-content">
            <p><a href="../">← Back to all episodes</a></p>
        </div>
    </footer>
</body>
</html>
```

**Step 2: Create guest page CSS**

Create `podcast/guest/guest.css`:

```css
/* Guest Booking Page Styles */

.guest-container {
    position: relative;
    z-index: 10;
    padding: 6rem 2rem 4rem;
    max-width: 900px;
    margin: 0 auto;
    min-height: 100vh;
}

/* Hero */
.guest-hero {
    text-align: center;
    margin-bottom: 4rem;
}

.guest-hero h1 {
    font-family: 'Clash Display', sans-serif;
    font-size: 2.5rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.3;
    margin-bottom: 1.5rem;
}

.show-name {
    background: linear-gradient(
        135deg,
        rgba(255, 150, 150, 1) 0%,
        rgba(255, 200, 100, 1) 25%,
        rgba(100, 200, 255, 1) 50%,
        rgba(180, 150, 255, 1) 75%,
        rgba(255, 150, 200, 1) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
    font-size: 3.5rem;
    margin-top: 0.5rem;
}

.guest-tagline {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.7;
    max-width: 700px;
    margin: 0 auto;
}

/* Guest Sections */
.guest-section {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 3rem;
    margin-bottom: 3rem;
}

.guest-section h2 {
    font-family: 'Clash Display', sans-serif;
    font-size: 2rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1.5rem;
}

.guest-section p {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.guest-topics {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
}

.guest-topics li {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    padding: 0.75rem 0;
    padding-left: 2rem;
    position: relative;
    line-height: 1.6;
}

.guest-topics li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: rgba(255, 150, 150, 0.8);
    font-weight: bold;
}

/* Format Grid */
.format-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.format-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 2rem 1.5rem;
    text-align: center;
}

.format-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.format-card h3 {
    font-family: 'Clash Display', sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 0.75rem;
}

.format-card p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
}

/* Booking Section */
.booking-section {
    background: rgba(255, 255, 255, 0.03);
}

.calendly-container {
    margin-top: 2rem;
    border-radius: 12px;
    overflow: hidden;
}

/* Contact Form (fallback) */
.contact-form {
    margin-top: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.875rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #fff;
    font-size: 1rem;
    font-family: 'Satoshi', sans-serif;
    transition: all 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: rgba(255, 150, 150, 0.5);
    background: rgba(255, 255, 255, 0.08);
}

.submit-btn {
    background: linear-gradient(
        135deg,
        rgba(255, 150, 150, 0.8) 0%,
        rgba(255, 200, 100, 0.8) 100%
    );
    border: none;
    color: #fff;
    padding: 1rem 2.5rem;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 150, 150, 0.3);
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .guest-hero h1 {
        font-size: 2rem;
    }

    .show-name {
        font-size: 2.5rem;
    }

    .guest-section {
        padding: 2rem 1.5rem;
    }

    .format-grid {
        grid-template-columns: 1fr;
    }
}
```

**Step 3: Test guest page**

1. Open `podcast/guest/index.html` in browser
2. Check layout and styling
3. Verify Calendly embed (or contact form)
4. Test mobile responsive

**Step 4: Commit**

```bash
git add podcast/guest/
git commit -m "feat: create guest booking page with Calendly integration"
```

---

## Task 6: Update RSS Feed URL and Test with Real Data

**Files:**
- Modify: `podcast/podcast.js`

**Step 1: Find ReFi Podcast RSS URL**

Research and find the actual ReFi Podcast RSS feed URL. Common formats:
- Spotify: `https://anchor.fm/s/[show-id]/podcast/rss`
- Apple: Check show page source
- Direct: Check podcast website

**Step 2: Update RSS feed URL**

Update in `podcast/podcast.js`:

```javascript
const CONFIG = {
    // ReFi Podcast RSS feed - UPDATE THIS URL
    RSS_FEED_URL: 'https://[actual-refi-podcast-rss-url]',
    CACHE_KEY: 'podcast_episodes_cache',
    CACHE_TTL: 60 * 60 * 1000, // 1 hour
};
```

**Step 3: Clear cache and test**

```javascript
// Add cache clear function for testing
function clearCache() {
    localStorage.removeItem(CONFIG.CACHE_KEY);
    console.log('Cache cleared');
}

// Expose for debugging
window.clearCache = clearCache;
```

**Step 4: Test with real RSS data**

1. Open browser console on podcast page
2. Run `clearCache()` to clear any cached data
3. Reload page
4. Verify episodes load from ReFi Podcast
5. Check episode data (titles, descriptions, artwork)
6. Test episode clicking and player

**Step 5: Handle CORS if needed**

If RSS feed is blocked by CORS, add proxy:

```javascript
const CONFIG = {
    RSS_FEED_URL: 'https://api.allorigins.win/get?url=' +
                  encodeURIComponent('https://[actual-rss-url]'),
    USE_PROXY: true,
    // ... rest of config
};

async function fetchRSS(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return CONFIG.USE_PROXY ? data.contents : await response.text();
    } catch (error) {
        console.error('RSS fetch error:', error);
        throw error;
    }
}
```

**Step 6: Commit**

```bash
git add podcast/podcast.js
git commit -m "feat: integrate with ReFi Podcast RSS feed"
```

---

## Task 7: Add Mobile Responsive Improvements

**Files:**
- Modify: `podcast/podcast.css`

**Step 1: Add mobile menu handling**

The main site already has mobile nav, but add podcast-specific improvements.

Add to `podcast/podcast.css`:

```css
/* Mobile Specific Improvements */
@media (max-width: 768px) {
    .podcast-container {
        padding: 5rem 1rem 2rem;
    }

    .podcast-branding {
        margin-bottom: 2rem;
    }

    .show-title {
        font-size: 2rem;
    }

    .show-tagline {
        font-size: 1rem;
    }

    .featured-episode {
        padding: 1.5rem;
    }

    .featured-content {
        gap: 1.5rem;
    }

    .episode-title {
        font-size: 1.5rem;
    }

    .episode-actions {
        flex-direction: column;
    }

    .subscribe-buttons {
        flex-direction: column;
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
    }

    .subscribe-btn {
        width: 100%;
        justify-content: center;
    }

    .episode-archive h2 {
        font-size: 1.5rem;
    }
}

/* Small mobile */
@media (max-width: 480px) {
    .podcast-branding {
        margin-bottom: 1.5rem;
    }

    .show-title {
        font-size: 1.75rem;
    }

    .featured-episode {
        padding: 1rem;
    }

    .episode-title {
        font-size: 1.25rem;
    }
}
```

**Step 2: Test mobile**

1. Open podcast page
2. Use browser DevTools responsive mode
3. Test at 375px (iPhone), 768px (tablet), 1024px (desktop)
4. Check featured episode layout
5. Check episode grid
6. Test navigation

**Step 3: Commit**

```bash
git add podcast/podcast.css
git commit -m "style: improve mobile responsive layout for podcast page"
```

---

## Task 8: Add Share and Social Meta Tags

**Files:**
- Modify: `podcast/index.html`

**Step 1: Add social meta tags**

Add to `<head>` in `podcast/index.html`:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://john-ellison.com/podcast/">
<meta property="og:title" content="The John Ellison Show — Ancient Wisdom Meets Modern Technology">
<meta property="og:description" content="Exploring how we build regenerative futures through AI, Indigenous knowledge, and first principles thinking.">
<meta property="og:image" content="https://john-ellison.com/podcast-og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://john-ellison.com/podcast/">
<meta property="twitter:title" content="The John Ellison Show">
<meta property="twitter:description" content="Ancient wisdom meets modern technology">
<meta property="twitter:image" content="https://john-ellison.com/podcast-og-image.jpg">
<meta property="twitter:site" content="@iamjohnellison">

<!-- Canonical URL -->
<link rel="canonical" href="https://john-ellison.com/podcast/">
```

**Step 2: Add dynamic meta tags for episodes**

Add to `podcast/podcast.js`:

```javascript
// Update meta tags for specific episode
function updateMetaTags(episode) {
    if (!episode) return;

    // Update page title
    document.title = `${episode.title} — The John Ellison Show`;

    // Update OG tags
    updateMetaTag('og:title', episode.title);
    updateMetaTag('og:description', stripHTML(episode.description).substring(0, 160));
    updateMetaTag('og:image', episode.artworkUrl);
    updateMetaTag('og:url', window.location.href);

    // Update Twitter tags
    updateMetaTag('twitter:title', episode.title);
    updateMetaTag('twitter:description', stripHTML(episode.description).substring(0, 160));
    updateMetaTag('twitter:image', episode.artworkUrl);
}

function updateMetaTag(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
        tag = document.querySelector(`meta[name="${property}"]`);
    }
    if (tag) {
        tag.setAttribute('content', content);
    }
}

function stripHTML(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// Call in loadEpisodeBySlug
function loadEpisodeBySlug(slug) {
    const episode = episodes.find(ep => ep.slug === slug);
    if (!episode) return;

    currentEpisode = episode;
    window.location.hash = slug;
    renderFeaturedEpisode(episode);
    updateMetaTags(episode); // Add this
    scrollToHero();
}
```

**Step 3: Commit**

```bash
git add podcast/
git commit -m "feat: add social meta tags and dynamic episode sharing"
```

---

## Task 9: Add Subscribe Button URLs

**Files:**
- Modify: `podcast/index.html`
- Modify: `podcast/podcast.js`

**Step 1: Add subscribe URL configuration**

Add to `podcast/podcast.js`:

```javascript
const CONFIG = {
    RSS_FEED_URL: 'https://[rss-url]',
    CACHE_KEY: 'podcast_episodes_cache',
    CACHE_TTL: 60 * 60 * 1000,

    // Subscribe URLs - UPDATE THESE
    SPOTIFY_URL: 'https://open.spotify.com/show/[your-show-id]',
    APPLE_URL: 'https://podcasts.apple.com/podcast/[your-show-id]',
    RSS_URL: 'https://[your-rss-feed-url]'
};
```

**Step 2: Update subscribe buttons on page load**

Add to `podcast/podcast.js`:

```javascript
// Update subscribe button URLs
function updateSubscribeButtons() {
    const spotifyBtn = document.querySelector('.subscribe-btn.spotify');
    const appleBtn = document.querySelector('.subscribe-btn.apple');
    const rssBtn = document.querySelector('.subscribe-btn.rss');

    if (spotifyBtn) spotifyBtn.href = CONFIG.SPOTIFY_URL;
    if (appleBtn) appleBtn.href = CONFIG.APPLE_URL;
    if (rssBtn) rssBtn.href = CONFIG.RSS_URL;
}

// Call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    updateSubscribeButtons();
    loadEpisodes();
});
```

**Step 3: Commit**

```bash
git add podcast/podcast.js
git commit -m "feat: add configurable subscribe button URLs"
```

---

## Task 10: Add Loading Skeleton States

**Files:**
- Modify: `podcast/podcast.css`
- Modify: `podcast/podcast.js`

**Step 1: Add skeleton CSS**

Add to `podcast/podcast.css`:

```css
/* Skeleton Loading States */
.skeleton {
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.02) 0%,
        rgba(255, 255, 255, 0.05) 50%,
        rgba(255, 255, 255, 0.02) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s ease-in-out infinite;
    border-radius: 8px;
}

@keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.skeleton-featured {
    height: 400px;
    margin-bottom: 3rem;
}

.skeleton-card {
    height: 400px;
}
```

**Step 2: Add skeleton rendering**

Add to `podcast/podcast.js`:

```javascript
// Render skeleton loading states
function renderSkeleton() {
    const featuredContainer = document.getElementById('featuredEpisode');
    const gridContainer = document.getElementById('episodeGrid');

    featuredContainer.innerHTML = '<div class="skeleton skeleton-featured"></div>';

    gridContainer.innerHTML = Array(6).fill(0).map(() =>
        '<div class="skeleton skeleton-card"></div>'
    ).join('');
}

// Update loadEpisodes to show skeleton
async function loadEpisodes() {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');

    // Show skeleton instead of spinner
    renderSkeleton();
    loadingState.style.display = 'none';
    errorState.style.display = 'none';

    try {
        const cached = getCachedEpisodes();
        if (cached) {
            console.log('Using cached episodes');
            episodes = cached;
            renderEpisodes();
            return;
        }

        console.log('Fetching RSS feed...');
        const xmlString = await fetchRSS(CONFIG.RSS_FEED_URL);
        episodes = parseRSS(xmlString);
        setCachedEpisodes(episodes);
        renderEpisodes();

    } catch (error) {
        console.error('Failed to load episodes:', error);
        errorState.style.display = 'flex';
    }
}
```

**Step 3: Test skeleton**

1. Open podcast page with DevTools network tab
2. Throttle network to "Slow 3G"
3. Reload page
4. Should see skeleton loading states
5. Episodes should populate after fetch

**Step 4: Commit**

```bash
git add podcast/
git commit -m "feat: add skeleton loading states for better UX"
```

---

## Task 11: Final Testing and Polish

**Files:**
- Test all functionality

**Step 1: Comprehensive functionality test**

Test checklist:
- [ ] RSS feed loads episodes
- [ ] Featured episode displays correctly
- [ ] Episode grid displays all episodes
- [ ] Clicking episode card updates hero and URL
- [ ] Audio player works
- [ ] Show notes expand/collapse
- [ ] Share button works
- [ ] Browser back/forward works with hash routing
- [ ] Subscribe buttons link correctly
- [ ] Guest page displays correctly
- [ ] Calendly embed works (or contact form)
- [ ] Mobile responsive on all pages
- [ ] Loading states work
- [ ] Error states work
- [ ] Cache works (check localStorage)

**Step 2: Performance test**

- Check page load time
- Check RSS fetch time
- Test with slow network
- Test with cache enabled
- Check memory usage

**Step 3: Accessibility test**

- Tab through all interactive elements
- Test with keyboard only
- Check color contrast
- Test with screen reader (optional)
- Check ARIA labels

**Step 4: Cross-browser test**

- Chrome
- Firefox
- Safari
- Mobile browsers

**Step 5: Document any issues**

Create issues list for any bugs found.

**Step 6: Final commit**

```bash
git add -A
git commit -m "test: comprehensive testing and polish"
```

---

## Task 12: Add Homepage Integration (Future)

**Files:**
- Note: This is for AFTER podcast launches with real episodes

**Future Implementation:**

When ready to add podcast section to homepage:

1. Add new section to `index.html` (after scene-5 or as scene-6)
2. Reuse RSS parser from podcast page
3. Display 2-3 latest episodes
4. Link to `/podcast` for full archive
5. Match cosmic/prismatic design
6. Make mobile responsive

**Placeholder note:**

Add comment to main `index.html`:

```html
<!-- Future: Podcast Section (scene-6) -->
<!-- Uncomment when podcast launches -->
<!--
<section class="scene scene-podcast" id="scenePodcast">
    <h2>The Podcast</h2>
    <div id="homepageEpisodes"></div>
    <a href="/podcast">View All Episodes →</a>
</section>
-->
```

---

## Implementation Complete!

**What we built:**

✅ `/podcast` page with RSS-powered episode display
✅ Featured latest episode with inline player
✅ Episode archive grid with hash routing
✅ `/podcast/guest` conditional booking page
✅ Cosmic/prismatic design system integration
✅ Mobile responsive
✅ Loading states and error handling
✅ Social sharing and meta tags
✅ LocalStorage caching

**Next steps:**

1. **Update RSS URL:** Point to actual ReFi Podcast feed for testing
2. **Update Calendly:** Add your actual Calendly link to guest page
3. **Update Subscribe URLs:** Add Spotify/Apple/RSS URLs when show launches
4. **Test thoroughly:** Use the checklist in Task 11
5. **Launch:** When ready, swap RSS to your Spotify feed
6. **Homepage integration:** Add after first episodes are published

**To switch to your podcast:**

Just update `CONFIG.RSS_FEED_URL` in `podcast/podcast.js` to your Spotify RSS feed. Everything else stays the same!
