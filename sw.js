// CyberNote 🛡️ - Service Worker for Offline Execution & WebAPK / PWA Installation
const CACHE_NAME = 'cybernote-v5-cache';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
                console.warn('Service worker cache.addAll partial warning:', err);
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Bypass API calls that alter state or require live response
    if (url.pathname.startsWith('/api/') || url.pathname === '/api/events') {
        return;
    }

    // Network-first for code assets (app.js, style.css, index.html) so updates apply instantly
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
                }
                return networkResponse;
            })
            .catch(() => {
                // If network fails (offline), serve from cache
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) return cachedResponse;
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html') || caches.match('/');
                    }
                });
            })
    );
});
