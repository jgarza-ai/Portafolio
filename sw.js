// Service Worker simple para caching de recursos estáticos
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalación del service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.warn('Failed to cache resources:', err);
      })
  );
});

// Estrategia de Cache First para recursos estáticos
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clonar la solicitud para poder usarla
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Verificar si la respuesta es válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clonar la respuesta antes de cachearla
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(err => {
              console.warn('Failed to cache new resource:', err);
            });

          return response;
        }).catch(() => {
          // Fallback para imágenes: servir un placeholder
          if (event.request.destination === 'image') {
            return new Response('<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#ccc"/></svg>', {
              headers: { 'Content-Type': 'image/svg+xml' }
            });
          }
        });
      })
  );
});

// Limpieza de caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});