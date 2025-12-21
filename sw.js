/**
 * Service Worker for Cosmos Layers
 * Provides offline capability and faster repeat visits
 * Strategy: Network First with Cache Fallback
 */

const CACHE_NAME = 'cosmos-layers-v1.0.0';
const RUNTIME_CACHE = 'cosmos-layers-runtime';

// Critical assets to cache on install
const STATIC_ASSETS = [
    '/prototypes/cosmos-layers/',
    '/prototypes/cosmos-layers/index.html',
    '/prototypes/cosmos-layers/styles.css',
    '/prototypes/cosmos-layers/scroll-controller.js',
    '/prototypes/cosmos-layers/prism-waves.js',
    '/prototypes/cosmos-layers/case-studies.js',
    '/prototypes/cosmos-layers/rainbow-grid.js',
];

// External resources
const EXTERNAL_ASSETS = [
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
];

// Install - cache static assets
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching static assets');
                return cache.addAll([...STATIC_ASSETS, ...EXTERNAL_ASSETS]);
            })
            .then(() => {
                console.log('[Service Worker] Installation complete');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('[Service Worker] Installation failed:', err);
            })
    );
});

// Activate - clean up old caches
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                        .map(name => {
                            console.log('[Service Worker] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch - Network First with Cache Fallback
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests not in our external assets list
    if (url.origin !== location.origin &&
        !EXTERNAL_ASSETS.includes(request.url)) {
        return;
    }

    // Skip API calls
    if (url.pathname.startsWith('/api/')) {
        return;
    }

    event.respondWith(
        fetch(request)
            .then(response => {
                // Clone response before caching
                const responseToCache = response.clone();

                // Only cache successful responses
                if (response.ok) {
                    caches.open(RUNTIME_CACHE)
                        .then(cache => {
                            cache.put(request, responseToCache);
                        });
                }

                return response;
            })
            .catch(() => {
                // Network failed, try cache
                return caches.match(request)
                    .then(cachedResponse => {
                        if (cachedResponse) {
                            console.log('[Service Worker] Serving from cache:', request.url);
                            return cachedResponse;
                        }

                        // No cache available
                        return new Response(
                            'Offline - Content not available',
                            {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: new Headers({
                                    'Content-Type': 'text/plain'
                                })
                            }
                        );
                    });
            })
    );
});

// Message handler
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('[Service Worker] Script loaded');
