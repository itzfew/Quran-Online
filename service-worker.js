const CACHE_NAME = 'edu-hub-cache-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/post-template.html',
    '/blog.html',
    '/data/posts.json',
    '/css/styles.css',
    '/js/main.js',
    '/js/post.js',
    '/icons/192.png',
    '/icons/512.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
