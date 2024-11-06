const CACHE_NAME = 'quran-kareem-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/source/pic.png',  // Adjust path if necessary
    '/css/styles.css',  // If any external or internal CSS
    '/js/app.js',  // If any external or internal JS
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    // Additional files that need to be cached for offline use
];

// Install Event: Cache assets when the service worker is installed
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate Event: Clear old caches during activation
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch Event: Serve cached content if available or fetch from the network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;  // Return cached response if exists
            }
            return fetch(event.request);  // Otherwise fetch from the network
        })
    );
});
