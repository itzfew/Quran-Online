const CACHE_NAME = 'quran-viewer-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'style/style.css',
    'https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    'https://raw.githubusercontent.com/itzfew/Quran-Online/refs/heads/main/source/words/word.json',
    'https://raw.githubusercontent.com/itzfew/Quran-Online/refs/heads/main/source/words/nastaliq-quranwbw.json',
    'https://raw.githubusercontent.com/itzfew/Quran-Online/refs/heads/main/source/words/en-quranwbw.json',
    'https://raw.githubusercontent.com/itzfew/Quran-Online/refs/heads/main/source/words/ur-quranwbw.json',
    'https://quran-online.pages.dev/source/download.png',
    'https://kit.fontawesome.com/a076d05399.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching resources');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
    );
});
