// Nome do "depósito" de arquivos no celular
const CACHE_NAME = 'adpaz-v1';

// Lista de arquivos que o app vai "baixar" para funcionar offline
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo-icon.png',
  './icon-512.png',
  './auripaz.png',
  './logo1.png'
];

// 1. INSTALAÇÃO: Salva os arquivos acima no celular do usuário
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('App Adpaz: Guardando arquivos para uso offline');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. ATIVAÇÃO: Limpa versões velhas do app se você fizer mudanças no futuro
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

// 3. BUSCA (FETCH): Tenta carregar do celular primeiro, se não tiver, busca na internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se o arquivo estiver no "depósito" (cache), usa ele
        if (response) {
          return response;
        }
        // Se não, tenta baixar da internet
        return fetch(event.request).catch(() => {
          // Se a internet falhar totalmente, mostra esta mensagem
          return new Response("Você está offline. Conecte-se para buscar sua credencial.");
        });
      })
  );
});
