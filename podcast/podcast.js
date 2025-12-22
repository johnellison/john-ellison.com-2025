// Podcast RSS Feed Integration
// John Ellison Show

// Configuration
const CONFIG = {
    // ReFi Podcast RSS feed for testing
    RSS_FEED_URL: 'https://anchor.fm/s/73ce3f84/podcast/rss',
    USE_PROXY: true, // Set to true if CORS issues occur
    CACHE_KEY: 'podcast_episodes_cache',
    CACHE_TTL: 60 * 60 * 1000, // 1 hour
};

// State
let episodes = [];
let currentEpisode = null;

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

// RSS Fetching
async function fetchRSS(url) {
    try {
        // Use CORS proxy if enabled
        const fetchUrl = CONFIG.USE_PROXY
            ? `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
            : url;

        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        // Handle proxy response
        if (CONFIG.USE_PROXY) {
            const data = await response.json();
            return data.contents;
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

// Cache clear function for testing
function clearCache() {
    localStorage.removeItem(CONFIG.CACHE_KEY);
    console.log('Cache cleared');
}

// Expose for debugging
window.clearCache = clearCache;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadEpisodes();
});
