// Podcast RSS Feed Integration
// John Ellison Show

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
