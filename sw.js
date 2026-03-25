self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return new Response("Você está offline, mas o app está instalado!");
    })
  );
});