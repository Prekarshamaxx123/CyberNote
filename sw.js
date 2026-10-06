// CyberNote 🛡️ - Service Worker for 100% Offline-First PWA Execution
const BASE_PATH = self.location.pathname.replace(/\/sw\.js$/, '') || '';
const CACHE_NAME = 'cybernote-v10-auto-style-align';

const ASSETS_TO_CACHE = [
    `${BASE_PATH}/`,
    `${BASE_PATH}/index.html`,
    `${BASE_PATH}/style.css`,
    `${BASE_PATH}/app.js`,
    `${BASE_PATH}/manifest.json`,
    `${BASE_PATH}/icons/icon-192.png`,
    `${BASE_PATH}/icons/icon-512.png`
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(
                ASSETS_TO_CACHE.map((url) => {
                    return cache.add(url).catch((err) => {
                        console.warn('SW pre-cache item warning for', url, err);
                    });
                })
            );
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

    // Never intercept non-GET requests (POST, PUT, DELETE, PATCH)
    if (event.request.method !== 'GET') {
        return;
    }

    // Bypass Google APIs and server-side live sync endpoints
    if (
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('google.com') ||
        url.pathname.startsWith('/api/')
    ) {
        return;
    }

    // Navigation Requests (HTML document loading)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const copy = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return networkResponse;
                })
                .catch(async () => {
                    // Offline navigation fallback: serve cached app shell
                    const matchDirect = await caches.match(event.request);
                    if (matchDirect) return matchDirect;

                    const matchAppShell = await caches.match(`${BASE_PATH}/index.html`) ||
                                          await caches.match(`${BASE_PATH}/`) ||
                                          await caches.match('index.html');
                    if (matchAppShell) return matchAppShell;

                    return new Response(
                        '<!DOCTYPE html><html><head><meta charset="utf-8"><title>CyberNote Offline</title></head><body style="background:#1e1e2e;color:#cdd6f4;font-family:sans-serif;text-align:center;padding:50px;"><h2>CyberNote Offline</h2><p>Please connect to the internet once to cache the full notebook.</p></body></html>',
                        { headers: { 'Content-Type': 'text/html' } }
                    );
                })
        );
        return;
    }

    // Static Assets (app.js, style.css, manifest, icons, images)
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const copy = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                }
                return networkResponse;
            })
            .catch(async () => {
                const cachedAsset = await caches.match(event.request);
                if (cachedAsset) return cachedAsset;
                return new Response('Asset unavailable offline', { status: 503 });
            })
    );
});
