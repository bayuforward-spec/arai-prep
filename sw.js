/* Service worker: aplikasi tetap jalan tanpa internet */
const CACHE = 'arai-prep-v2';
const ASET = [
  './', './index.html', './app.js', './manifest.json', './icon.svg',
  './data/materi.js', './data/bank-bindo.js', './data/bank-mtk.js', './data/bank-bing.js', './data/bank-bio.js', './data/bank-kim.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASET)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(c => c || fetch(e.request).then(r => {
      const salinan = r.clone();
      caches.open(CACHE).then(ch => ch.put(e.request, salinan)).catch(() => {});
      return r;
    }).catch(() => caches.match('./index.html')))
  );
});
