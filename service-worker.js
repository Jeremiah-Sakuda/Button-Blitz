self.addEventListener('install', event => {
    event.waitUntil( // Waiting for installation process to complete
       caches.open('my-pwa-cache') // Opening a new cache named "my cache"
       .then(cache => {
          return cache.addAll([ // adding resources to be cached
             '/',
             '/index.html',
             '/styles.css',
             '/app.js',
             '/images/buttonblitzicon.png',
             '/images/mainbutton.png',
             '/images/playbutton.png',
             '/images/upgradesbutton.png'
          ]);
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