# ARAI Prep — TKA & SNBP Fakultas Kedokteran

Aplikasi latihan mandiri untuk persiapan **TKA (Tes Kemampuan Akademik)** dan seleksi masuk
**Fakultas Kedokteran** lewat SNBP/SNBT. Berjalan penuh di browser, tanpa server, tanpa biaya,
dan tetap bisa dipakai tanpa internet setelah sekali dibuka.

**Alamat:** `https://bayuforward-spec.github.io/arai-prep/` (aktif setelah Pages dinyalakan di Settings → Pages → Source: GitHub Actions)

## Isi

| Berkas | Keterangan |
|---|---|
| `index.html` | Kerangka aplikasi (Tailwind CDN + Font Awesome) |
| `.github/workflows/pages.yml` | Deploy otomatis ke GitHub Pages tiap push ke `main` |
| `app.js` | Seluruh logika: mesin adaptif, sesi, rapor, target |
| `data/bank-*.js` | Bank soal per mata uji beserta pembahasan (360 soal) |
| `data/tka2025.js` | Kunci dan pembahasan tiap nomor soal asli TKA 2025 (Biologi, Kimia, Matematika) |
| `data/bank-tka25-*.js` | Paket soal tiruan dan variasi yang meniru tiap nomor TKA 2025 |
| `data/materi.js` | Ringkasan materi, rumus kunci, dan jebakan tiap topik (77 kartu) |
| `sw.js`, `manifest.json` | Dukungan offline & pemasangan ke layar utama (PWA) |

## Fitur

- **Mesin adaptif** — tiap jawaban memperbarui estimasi kemampuan (model gaya Elo) di tiga tingkat:
  topik → mata uji → keseluruhan. Soal berikutnya dipilih pada peluang benar ±75%, yaitu zona
  belajar paling produktif.
- **Belajar berkelanjutan** — sesi tanpa batas soal; berhenti kapan saja, dilanjutkan kapan saja
  (sesi yang belum selesai otomatis tersimpan dan ditawarkan lagi di beranda).
- **Pengulangan berjarak (Leitner 5 kotak)** — soal yang salah kembali besok, yang sudah dikuasai
  makin jarang muncul.
- **Tryout bertimer** sesuai format resmi TKA 2026 (lihat di bawah).
- **Umpan balik otomatis** setiap sesi: akurasi, kecepatan per soal dibanding alokasi waktu ujian,
  topik yang bocor, dan perubahan estimasi kemampuan.
- **Jurnal kesalahan** — mencatat *sebab* salah (konsep / salah baca / teledor / kehabisan waktu /
  menebak) lalu merangkum polanya.
- **Target kampus FK** — patokan skor untuk FK UI, UGM, Unpad, Unair, Undip, dan belasan PTN lain,
  lengkap dengan selisih poin dan perkiraan waktu tempuh berdasarkan laju kenaikan.
- **Simulasi SNBP** — nilai rapor semester 1–5, indeks (rapor 50% + mapel pendukung Bio/Kim 50%),
  dan tren antar-semester.
- **Pesan dari Abi & Ummi** — muncul tiap 10 soal dan di akhir sesi; teksnya bisa ditambah sendiri
  lewat menu ⚙.
- **Rapor belajar** — ringkasan 7 hari / 30 hari / seluruh waktu yang bisa dibagikan lewat
  WhatsApp, tombol Bagikan bawaan HP, disalin, atau dicetak ke PDF.
- **Paket TKA 2025** — kunci dan pembahasan tiap nomor naskah asli tahun lalu (naskah yang beredar
  tidak memuat kunci), ditambah soal tiruan 1 : 1 per nomor dan soal variasi yang menguji konsep sama
  dengan angka serta konteks berbeda.
- **Ringkasan materi** — 77 kartu konsep, rumus kunci, dan jebakan yang sering menjebak, muncul
  otomatis saat menjawab salah dan bisa dibaca sendiri di halaman Materi.
- **Simulasi hari-H** — lima mata uji penuh, boleh dicicil satu mata uji per hari sesuai aturan
  TKA 2026, lalu dirangkum dalam satu laporan.
- **Halaman Abi & Ummi** — pemantauan konsistensi, capaian per mata uji, dan tempat menitipkan
  pesan yang akan muncul di layar ARAI saat berlatih.

## Format TKA SMA 2026 yang dipakai aplikasi

| Mata uji | Jumlah soal | Waktu |
|---|---|---|
| Bahasa Indonesia (wajib) | 30 | 75 menit |
| Matematika (wajib) | 25 | 75 menit |
| Bahasa Inggris (wajib) | 30 | 75 menit |
| Mata uji pilihan 1 — Biologi | 25 | 60 menit |
| Mata uji pilihan 2 — Kimia | 25 | 60 menit |

Bentuk soal: pilihan ganda, benar–salah, isian singkat, dan soal bernalar berstimulus.
Tanggal ujian dan pendaftaran SNBP bisa diubah sendiri di menu ⚙ — **selalu verifikasi ke sekolah,
Kemendikdasmen, dan SNPMB** karena ketentuan dapat berubah.

## Data & privasi

Semua progres disimpan di `localStorage` perangkat, tidak dikirim ke mana pun. Karena itu:

- Ganti HP atau bersihkan data browser = progres hilang → pakai **Ekspor** di menu ⚙ secara berkala.
- Berkas ekspor berupa JSON dan bisa diimpor kembali di perangkat lain.

## Menambah soal

Tambahkan objek ke salah satu `data/bank-*.js`:

```js
{id:'BIO-031', m:'bio', t:'Genetika', lv:2, tipe:'pg',
 s:'stimulus opsional',
 q:'pertanyaan',
 o:['A','B','C','D','E'], a:1,
 e:'pembahasan lengkap'}
```

- `m`: `bindo` | `mtk` | `bing` | `bio` | `kim`
- `lv`: 1 dasar · 2 sedang · 3 HOTS
- `tipe`: `pg` (pilihan ganda, `a` = indeks kunci) · `bs` (benar–salah, pakai `st:[{p,b}]`) ·
  `jamak` (pilihan jamak, `a` = array indeks kunci) · `isian` (jawaban singkat, `a` kunci utama, `alt` alternatif)
- `pkt`: `TKA25` untuk soal tiruan naskah 2025, `TKA25V` untuk variasinya; `no` menandai nomor asalnya

Setelah menambah soal, naikkan versi cache di `sw.js` (`const CACHE = 'arai-prep-v2'`) supaya
perangkat mengambil versi terbaru.

## Sumber soal

Seluruh butir soal di aplikasi ini ditulis sendiri, bukan salinan naskah ujian mana pun. Untuk paket
TKA 2025, yang dijadikan acuan adalah struktur resminya (elemen, subelemen, indikator, bentuk soal,
dan tingkat kesulitan tiap nomor) pada naskah yang beredar di m4th-lab.net; butirnya kemudian ditulis
ulang dengan konteks dan angka berbeda. Kunci serta pembahasan pada `data/tka2025.js` adalah hasil
analisis sendiri karena naskah aslinya tidak memuat kunci maupun pembahasan.

## Catatan tentang angka target

PTN tidak menerbitkan passing grade resmi. Angka patokan di halaman Target adalah **sasaran latihan
internal aplikasi** dan bisa diubah sendiri; jangan diperlakukan sebagai ambang kelulusan.
