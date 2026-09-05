/* Service worker: aplikasi tetap jalan tanpa internet.
   Strategi: network-first untuk halaman dan skrip supaya pembaruan langsung terpakai,
   cache dipakai sebagai cadangan ketika jaringan tidak tersedia. */
const CACHE = 'arai-prep-v5';
const ASET = [
  './', './index.html', './app.js', './manifest.json', './icon.svg',
  './data/materi.js', './data/tka2025.js',
  './data/bank-bindo.js', './data/bank-mtk.js', './data/bank-bing.js',
  './data/bank-bio.js', './data/bank-kim.js',
  './data/bank-tka25-bio.js', './data/bank-tka25-kim.js', './data/bank-tka25-mtk.js'
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
