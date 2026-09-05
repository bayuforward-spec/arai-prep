/* Service worker: aplikasi tetap jalan tanpa internet.
   Strategi: network-first untuk halaman dan skrip supaya pembaruan langsung terpakai,
   cache dipakai sebagai cadangan ketika jaringan tidak tersedia. */
const CACHE = 'arai-prep-v5';
const ASET = [
  './', './index.html', './app.js?v=5', './manifest.json', './icon.svg',
  './data/materi.js?v=5', './data/tka2025.js?v=5',
  './data/bank-bindo.js?v=5', './data/bank-mtk.js?v=5', './data/bank-bing.js?v=5',
  './data/bank-bio.js?v=5', './data/bank-kim.js?v=5',
  './data/bank-tka25-bio.js?v=5', './data/bank-tka25-kim.js?v=5', './data/bank-tka25-mtk.js?v=5'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASET)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const utama = e.request.mode === 'navigate' || url.pathname.endsWith('.js') || url.pathname.endsWith('.html');
  if (utama) {
    // Ambil dari jaringan dulu agar versi terbaru selalu terpakai.
    e.respondWith(
      fetch(e.request).then(r => {
        const salinan = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, salinan)).catch(() => {});
        return r;
      }).catch(() => caches.match(e.request).then(c => c || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(c => c || fetch(e.request).then(r => {
      const salinan = r.clone();
      caches.open(CACHE).then(ch => ch.put(e.request, salinan)).catch(() => {});
      return r;
    }))
  );
});
