const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/images/serwifi.svg',
  '/images/disabled.svg',
  '/images/ecam.svg',
  '/images/dvid.svg',
  '/images/swifi.svg',
  '/images/serwifi.svg',
  '/images/dwifi.svg',
  '/images/check.svg',
  '/images/emic.svg',
  '/images/mic.svg',
  '/images/slight.svg',
  '/images/serlight.svg',
  '/images/dlight.svg',
  // Add other assets you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});