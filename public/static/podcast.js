// Podcast RSS Feed Integration
// John Ellison Show

// Configuration
const CONFIG = {
    // ReFi Podcast RSS feed
    RSS_FEED_URL: 'https://anchor.fm/s/be4ca48c/podcast/rss',
    USE_PROXY: false, // Trying direct fetch first
    CACHE_KEY: 'podcast_episodes_cache',
    CACHE_TTL: 60 * 60 * 1000, // 1 hour

    // Subscribe URLs
    SPOTIFY_URL: 'https://open.spotify.com/show/5RTHF6JVgQL1cgaVfvi7cv?si=05defeccadec4657',
    APPLE_URL: 'https://podcasts.apple.com/us/podcast/refi-podcast/id1609683147?at=1000lHKX&ct=linktree_http&itsct=lt_p&itscg=30200&ls=1',
    RSS_URL: 'https://anchor.fm/s/73ce3f84/podcast/rss'
};

// State
let episodes = [];
let currentEpisode = null;
let currentView = 'grid'; // 'grid' or 'list'

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

        // Convert pubDate strings back to Date objects
        return data.map(episode => ({
            ...episode,
            pubDate: new Date(episode.pubDate)
        }));
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

// RSS Fetching
async function fetchRSS(url) {
    try {
        // Use CORS proxy if enabled - using corsproxy.io which works better
        const fetchUrl = CONFIG.USE_PROXY
            ? `https://corsproxy.io/?${encodeURIComponent(url)}`
            : url;

        console.log('Fetching from:', fetchUrl);

        // Add timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(fetchUrl, {
            signal: controller.signal,
            mode: 'cors'
        });
        clearTimeout(timeoutId);

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();
        console.log('Response received, length:', text.length);
        return text;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('RSS fetch timeout after 10 seconds');
        }
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

        // Get iTunes image (episode-specific or fallback to channel image)
        const itunesImage = item.querySelector('itunes\\:image') || item.getElementsByTagNameNS('http://www.itunes.com/dtds/podcast-1.0.dtd', 'image')[0];
        const channelImage = doc.querySelector('channel itunes\\:image') || doc.querySelector('channel').getElementsByTagNameNS('http://www.itunes.com/dtds/podcast-1.0.dtd', 'image')[0];
        const artworkUrl = itunesImage?.getAttribute('href') ||
                          channelImage?.getAttribute('href') ||
                          '';

        // Get duration
        const itunesDuration = item.querySelector('itunes\\:duration')?.textContent ||
                              item.getElementsByTagNameNS('http://www.itunes.com/dtds/podcast-1.0.dtd', 'duration')[0]?.textContent ||
                              '';

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

// Render skeleton loading states
function renderSkeleton() {
    const featuredContainer = document.getElementById('featuredEpisode');
    const gridContainer = document.getElementById('episodeGrid');

    featuredContainer.innerHTML = '<div class="skeleton skeleton-featured"></div>';

    gridContainer.innerHTML = Array(6).fill(0).map(() =>
        '<div class="skeleton skeleton-card"></div>'
    ).join('');
}

// Main Load Function
async function loadEpisodes() {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');

    // Show loading spinner
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
        console.log('RSS fetched, parsing...');
        episodes = parseRSS(xmlString);
        console.log('Parsed episodes:', episodes.length);

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

    // Truncate description for preview (first 200 chars)
    const shortDesc = episode.description
        .replace(/<[^>]*>/g, '') // Strip HTML
        .substring(0, 200) + '...';

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
                <p class="episode-description-preview">${shortDesc}</p>
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

// Render Episode Grid
function renderEpisodeGrid(episodesToRender) {
    const grid = document.getElementById('episodeGrid');

    if (!episodesToRender || episodesToRender.length === 0) {
        grid.innerHTML = '<p>No episodes available yet.</p>';
        return;
    }

    const episodeHTML = episodesToRender.map((episode, index) => {
        const formattedDate = episode.pubDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        // Truncate description
        const shortDesc = episode.description
            .replace(/<[^>]*>/g, '') // Strip HTML
            .substring(0, 150) + '...';

        const episodeNumber = episodes.length - index;

        // Grid View HTML
        if (currentView === 'grid') {
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
                            <span class="episode-number">Episode ${episodeNumber}</span>
                            <span class="episode-date">${formattedDate}</span>
                        </div>
                        <h3 class="episode-card-title">${episode.title}</h3>
                        <p class="episode-card-desc">${shortDesc}</p>
                        ${episode.duration ? `<span class="episode-card-duration">${episode.duration}</span>` : ''}
                    </div>
                </div>
            `;
        }

        // List View HTML - Editorial Magazine Style
        return `
            <div class="episode-card" data-slug="${episode.slug}" onclick="loadEpisodeBySlug('${episode.slug}')">
                <div class="featured-content">
                    <div class="episode-card-artwork">
                        <img src="${episode.artworkUrl}" alt="${episode.title}" loading="lazy" />
                        <div class="play-overlay">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="episode-card-content">
                        <div class="episode-card-meta" data-episode-number="${episodeNumber.toString().padStart(2, '0')}">
                            <span class="episode-number">Episode ${episodeNumber}</span>
                            <span class="episode-date">${formattedDate}</span>
                        </div>
                        <h3 class="episode-card-title">${episode.title}</h3>
                        <p class="episode-card-desc">${shortDesc}</p>
                        ${episode.duration ? `<span class="episode-card-duration">${episode.duration}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    grid.innerHTML = episodeHTML;
}

// View Toggle Handler
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const grid = document.getElementById('episodeGrid');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;

            if (view === currentView) return;

            // Update active state
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update view
            currentView = view;

            // Update grid classes
            grid.classList.remove('view-grid', 'view-list');
            grid.classList.add(`view-${view}`);

            // Re-render episodes
            renderEpisodeGrid(episodes);

            // Animate with GSAP if available
            if (typeof gsap !== 'undefined') {
                gsap.from('.episode-card', {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Update episode count stat
function updateStats() {
    const episodeCountEl = document.getElementById('episodeCount');
    if (episodeCountEl && episodes.length > 0) {
        episodeCountEl.textContent = `${episodes.length} Episodes`;
    }

    // Simulate listener count (could be from analytics later)
    const listenerCountEl = document.getElementById('listenerCount');
    if (listenerCountEl) {
        listenerCountEl.textContent = `${Math.floor(episodes.length * 127)} Reflections`;
    }
}

// Main Render Function
function renderEpisodes() {
    console.log(`Rendering ${episodes.length} episodes`);

    if (episodes.length === 0) {
        return;
    }

    // Update stats
    updateStats();

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

// Load episode by slug
function loadEpisodeBySlug(slug) {
    const episode = episodes.find(ep => ep.slug === slug);
    if (!episode) return;

    currentEpisode = episode;
    window.location.hash = slug;
    renderFeaturedEpisode(episode);
    updateMetaTags(episode);
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

// Update subscribe button URLs
function updateSubscribeButtons() {
    const spotifyBtn = document.querySelector('.subscribe-btn.spotify');
    const appleBtn = document.querySelector('.subscribe-btn.apple');
    const rssBtn = document.querySelector('.subscribe-btn.rss');

    if (spotifyBtn) spotifyBtn.href = CONFIG.SPOTIFY_URL;
    if (appleBtn) appleBtn.href = CONFIG.APPLE_URL;
    if (rssBtn) rssBtn.href = CONFIG.RSS_URL;
}

// Cache clear function for testing
function clearCache() {
    localStorage.removeItem(CONFIG.CACHE_KEY);
    console.log('Cache cleared');
}

// Expose for debugging
window.clearCache = clearCache;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateSubscribeButtons();
    setupViewToggle();
    loadEpisodes();
});
