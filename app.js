/* =============================================================
   ARAI Prep — TKA & SNBP Fakultas Kedokteran
   Belajar berkelanjutan + mesin adaptif (menyesuaikan kemampuan)
   Berjalan penuh di browser, offline, tanpa server.
   ============================================================= */

/* ---------- Konstanta mata uji (format TKA SMA 2026) ---------- */
const MAPEL = {
  bindo: {nama:'Bahasa Indonesia', sing:'B. Indonesia', kel:'wajib',   soalTO:30, menitTO:75, ikon:'fa-book-open',            w:'indigo'},
  mtk:   {nama:'Matematika',       sing:'Matematika',   kel:'wajib',   soalTO:25, menitTO:75, ikon:'fa-square-root-variable', w:'amber'},
  bing:  {nama:'Bahasa Inggris',   sing:'B. Inggris',   kel:'wajib',   soalTO:30, menitTO:75, ikon:'fa-language',             w:'sky'},
  bio:   {nama:'Biologi',          sing:'Biologi',      kel:'pilihan', soalTO:25, menitTO:60, ikon:'fa-dna',                  w:'emerald'},
  kim:   {nama:'Kimia',            sing:'Kimia',        kel:'pilihan', soalTO:25, menitTO:60, ikon:'fa-flask',                w:'rose'}
};
const URUT_MAPEL = ['bindo','mtk','bing','bio','kim'];
const SEBAB_SALAH = ['Konsep belum paham','Salah baca soal','Salah hitung / teledor','Kehabisan waktu','Menebak'];
const INTERVAL = {1:1, 2:2, 3:4, 4:8, 5:16};          // pengulangan berjarak (hari)
const KESULITAN_AWAL = {1:1000, 2:1200, 3:1400};       // rating awal soal menurut tingkat
const RATING_AWAL = 1150;
const TARGET_SUKSES = 0.75;                            // zona belajar optimal: ±75% benar
const DETIK_IDEAL = {bindo:150, mtk:180, bing:150, bio:144, kim:144};

/* ---------- Pesan penyemangat dari Abi & Ummi ---------- */
const PESAN = [
  {dari:'Abi',  k:'umum', t:'Sedikit demi sedikit, lama-lama jadi bukit. Abi bangga kamu mau memulai hari ini.'},
  {dari:'Abi',  k:'umum', t:'Belajar itu ibadah, Nak. Abi doakan setiap langkahmu dimudahkan.'},
  {dari:'Abi',  k:'umum', t:'Dokter yang baik lahir dari kebiasaan teliti. Hari ini kamu sedang melatihnya.'},
  {dari:'Abi',  k:'umum', t:'Kalau capek, istirahat sebentar. Tapi jangan berhenti ya, Nak.'},
  {dari:'Abi',  k:'umum', t:'Abi lebih bangga pada usahamu daripada pada angkanya.'},
  {dari:'Ummi', k:'umum', t:'Ummi selalu sebut namamu dalam doa. Semoga Allah mudahkan pemahamanmu.'},
  {dari:'Ummi', k:'umum', t:'Sudah minum, Nak? Jaga kesehatan, otak juga butuh istirahat.'},
  {dari:'Ummi', k:'umum', t:'Setiap soal yang kamu kerjakan satu langkah lebih dekat ke jas putih itu.'},
  {dari:'Ummi', k:'umum', t:'Yang penting hari ini sedikit lebih baik daripada kemarin.'},
  {dari:'Ummi', k:'umum', t:'Pelan-pelan saja sayang, yang penting paham, bukan cepat selesai.'},
  {dari:'Abi',  k:'bagus', t:'Masya Allah, hasilmu bagus sekali. Abi bangga betul sama kamu.'},
  {dari:'Abi',  k:'bagus', t:'Ini buah dari latihan yang rutin. Pertahankan ritmenya, Nak.'},
  {dari:'Ummi', k:'bagus', t:'Alhamdulillah, kerja kerasmu mulai kelihatan hasilnya. Ummi terharu.'},
  {dari:'Ummi', k:'bagus', t:'Ummi senang lihat kamu makin percaya diri. Terus begini ya sayang.'},
  {dari:'Abi',  k:'kurang', t:'Naik-turun itu biasa, Nak. Yang Abi lihat: kamu tidak berhenti.'},
  {dari:'Abi',  k:'kurang', t:'Salah hari ini adalah soal yang tidak akan salah lagi nanti. Ulangi pelan-pelan.'},
  {dari:'Ummi', k:'kurang', t:'Jangan sedih ya sayang, ini tandanya kamu sedang belajar hal baru.'},
  {dari:'Ummi', k:'kurang', t:'Ummi tahu ini berat. Tapi Ummi percaya kamu kuat menjalaninya.'},
  {dari:'Abi',  k:'target', t:'Target hari ini selesai. Abi bangga sama komitmenmu, Nak.'},
  {dari:'Ummi', k:'target', t:'Target hari ini tuntas! Sekarang istirahat yang cukup ya sayang.'}
];
function pesanOrangTua(kategori){
  const tambahan = [];
  (S.profil.pesanAbi||[]).forEach(t=>tambahan.push({dari:'Abi',k:'umum',t}));
  (S.profil.pesanUmmi||[]).forEach(t=>tambahan.push({dari:'Ummi',k:'umum',t}));
  const semua = PESAN.concat(tambahan);
  let pilih = semua.filter(p=>p.k===kategori);
  if(!pilih.length) pilih = semua.filter(p=>p.k==='umum');
  return pilih[Math.floor(Math.random()*pilih.length)];
}
function kartuPesan(kategori){
  const p = pesanOrangTua(kategori);
  const w = p.dari==='Abi' ? 'sky' : 'rose';
  return `<div class="mt-3 rounded-xl border border-${w}-200 bg-${w}-50 p-3 flex gap-3 items-start">
    <div class="w-9 h-9 rounded-full bg-${w}-500 text-white flex items-center justify-center shrink-0 font-bold text-xs">${p.dari==='Abi'?'A':'U'}</div>
    <div><p class="text-[11px] font-bold text-${w}-700">Pesan dari ${p.dari}</p>
      <p class="text-sm text-${w}-900 leading-relaxed mt-0.5">${esc(p.t)}</p></div></div>`;
}

/* ---------- Penyimpanan ---------- */
const LS = 'araiprep_v1';
const memori = {};
function baca(){ try{ const t=localStorage.getItem(LS); return t?JSON.parse(t):null; }catch(e){ return memori[LS]||null; } }
function tulis(o){ try{ localStorage.setItem(LS, JSON.stringify(o)); }catch(e){ memori[LS]=o; } }
function defaultState(){
  return {
    profil:{nama:'ARAI', tglTKA:'2026-10-26', tglSNBP:'2027-02-15', jamBelajar:2, pilihan:['bio','kim'], pesanAbi:[], pesanUmmi:[],
            kampus:[{nama:'FK Universitas Lampung', catatan:'Target utama'},{nama:'FK Universitas Indonesia', catatan:'Target tantangan'}]},
    stat:{}, kesulitan:{}, rating:{umum:RATING_AWAL, mapel:{}, topik:{}, riwayat:[]},
    sesi:[], tryout:[], rapor:{}, jurnal:[], harian:{}, sesiAktif:null, umpanBalik:[], simulasi:null, simulasiRiwayat:[]
  };
}
let S = Object.assign(defaultState(), baca()||{});
S.profil = Object.assign(defaultState().profil, S.profil||{});
S.rating = Object.assign({umum:RATING_AWAL, mapel:{}, topik:{}, riwayat:[]}, S.rating||{});
function simpan(){ tulis(S); }

/* ---------- Utilitas ---------- */
const $ = s => document.querySelector(s);
const esc = t => String(t==null?'':t).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const js  = t => String(t==null?'':t).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
const pad = n => String(n).padStart(2,'0');
function hariIni(){ const d=new Date(); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function tambahHari(t,n){ const d=new Date(t+'T00:00:00'); d.setDate(d.getDate()+n); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function selisihHari(a,b){ return Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/86400000); }
function fmtTgl(t){ if(!t) return '-'; const bl=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const d=new Date(t+'T00:00:00'); return d.getDate()+' '+bl[d.getMonth()]+' '+d.getFullYear(); }
function acak(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function persen(b,t){ return t?Math.round(b/t*100):0; }
function warnaAkurasi(p){ return p>=80?'text-emerald-600':p>=60?'text-amber-600':'text-rose-600'; }
function bgAkurasi(p){ return p>=80?'bg-emerald-500':p>=60?'bg-amber-500':'bg-rose-500'; }
const BANK = () => (window.BANK_SOAL||[]);
const soalById = id => BANK().find(q=>q.id===id);
const namaPanggil = () => (S.profil.nama||'ARAI').split(' ')[0];
const MAT = () => (window.MATERI||{});
/* Versi berkas ini. Kalau tidak cocok dengan versi pada index.html, berarti
   perangkat masih memakai salinan lama salah satu berkas. */
const VERSI_APPJS = 'v5';
function versiTidakCocok(){ return String(window.APP_VERSI||'').indexOf(VERSI_APPJS) < 0; }
function kartuMateri(m,t,ringkas){
  const d = MAT()[m+'|'+t]; if(!d) return '';
  return `<details class="rounded-xl border border-sky-200 bg-sky-50 p-3 mt-3" ${ringkas?'':'open'}>
    <summary class="text-xs font-bold text-sky-800 cursor-pointer"><i class="fa-solid fa-book-open mr-1"></i>Materi singkat: ${esc(t)}</summary>
    <ul class="text-xs text-sky-900 list-disc ml-4 mt-2 space-y-1">${d.poin.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
    ${d.jebakan?`<p class="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2"><i class="fa-solid fa-triangle-exclamation mr-1"></i><b>Sering jadi jebakan:</b> ${esc(d.jebakan)}</p>`:''}
  </details>`;
}

/* =============================================================
   MESIN ADAPTIF — model kemampuan gaya Elo
   Kemampuan (θ) dan kesulitan soal (d) saling menyesuaikan.
   ============================================================= */
function kesulitan(q){
  if(S.kesulitan[q.id]==null) S.kesulitan[q.id] = KESULITAN_AWAL[q.lv||2];
  return S.kesulitan[q.id];
}
function ratingMapel(m){ return S.rating.mapel[m]!=null ? S.rating.mapel[m] : S.rating.umum; }
function ratingTopik(m,t){ const k=m+'|'+t; return S.rating.topik[k]!=null ? S.rating.topik[k] : ratingMapel(m); }
function harapan(theta, d){ return 1/(1+Math.pow(10,(d-theta)/400)); }
/* Kemampuan efektif: gabungan estimasi topik → mata uji → umum.
   Saat data satu topik masih sedikit, penilaian bersandar pada tingkat di atasnya
   sehingga tidak gampang salah baca hanya karena satu-dua soal. */
function jumlahJawabanFilter(f){
  let n=0; BANK().forEach(q=>{ if(f(q)){ const x=S.stat[q.id]; if(x) n+=x.benar+x.salah; } }); return n;
}
function kemampuanEfektif(m,t){
  const rU=S.rating.umum, rM=S.rating.mapel[m], rT=(t!=null?S.rating.topik[m+'|'+t]:null);
  const nM=jumlahJawabanFilter(q=>q.m===m), nT=(t!=null?jumlahJawabanFilter(q=>q.m===m&&q.t===t):0);
  const wM=nM/(nM+10), wT=nT/(nT+5);
  const dasar = rM!=null ? wM*rM+(1-wM)*rU : rU;
  return rT!=null ? wT*rT+(1-wT)*dasar : dasar;
}
function jumlahJawaban(){ return Object.values(S.stat).reduce((a,x)=>a+x.benar+x.salah,0); }

function perbaruiKemampuan(q, benar){
  const skor = benar?1:0;
  const d = kesulitan(q), k = q.m+'|'+q.t;
  const n = jumlahJawaban();
  const K = n<40 ? 40 : n<120 ? 28 : 20;              // belajar cepat di awal, stabil kemudian
  const thetaT = ratingTopik(q.m,q.t), thetaM = ratingMapel(q.m), thetaU = S.rating.umum;
  S.rating.topik[k] = Math.round(thetaT + K      * (skor - harapan(thetaT, d)));
  S.rating.mapel[q.m]= Math.round(thetaM + K*0.85* (skor - harapan(thetaM, d)));
  S.rating.umum      = Math.round(thetaU + K*0.5 * (skor - harapan(thetaU, d)));
  S.kesulitan[q.id]  = Math.round(d + 8 * (harapan(kemampuanEfektif(q.m,q.t), d) - skor)); // soal ikut dikalibrasi
  // batas wajar
  ['umum'].forEach(()=>{ S.rating.umum = Math.max(700, Math.min(1800, S.rating.umum)); });
  S.rating.mapel[q.m] = Math.max(700, Math.min(1800, S.rating.mapel[q.m]));
  S.rating.topik[k]   = Math.max(700, Math.min(1800, S.rating.topik[k]));
}
function levelDari(r){ return Math.max(1, Math.min(10, Math.floor((r-900)/90)+1)); }
function labelLevel(r){
  const L = levelDari(r);
  return L<=2?'Perlu penguatan dasar':L<=4?'Berkembang':L<=6?'Cukup mantap':L<=8?'Siap bersaing':'Siap tempur';
}
/* Perkiraan skor bila diuji dengan seluruh soal mata uji tersebut.
   Gabungan model kemampuan dan akurasi nyata, supaya angkanya jujur sekaligus stabil. */
function akurasiMapel(m){
  let b=0,s2=0; BANK().filter(q=>q.m===m).forEach(q=>{const x=S.stat[q.id]; if(x){b+=x.benar; s2+=x.salah;}});
  return {b, s:s2, n:b+s2, akur:(b+s2)?b/(b+s2):null};
}
function perkiraanSkor(m){
  const soal = BANK().filter(q=>q.m===m); if(!soal.length) return null;
  const pModel = soal.reduce((a,q)=>a+harapan(kemampuanEfektif(m,q.t), kesulitan(q)),0)/soal.length;
  const a = akurasiMapel(m);
  if(!a.n) return Math.round(pModel*100);
  const w = Math.min(1, a.n/20)*0.7;                 // makin banyak data, makin percaya akurasi nyata
  return Math.round(((1-w)*pModel + w*a.akur)*100);
}
function perkiraanSkorTotal(){
  const nilai = URUT_MAPEL.map(perkiraanSkor).filter(x=>x!=null);
  return nilai.length? Math.round(nilai.reduce((a,b)=>a+b,0)/nilai.length) : 0;
}
function simpanRiwayatRating(){
  const h = hariIni(), r = S.rating.riwayat;
  const ada = r.find(x=>x.tgl===h);
  const data = {tgl:h, umum:S.rating.umum, skor:perkiraanSkorTotal()};
  if(ada) Object.assign(ada, data); else r.push(data);
  S.rating.riwayat = r.slice(-90);
}

/* ---------- Statistik & pengulangan berjarak ---------- */
function st(id){ if(!S.stat[id]) S.stat[id]={benar:0,salah:0,box:0,due:null,terakhir:null,detik:0}; return S.stat[id]; }
function catatJawaban(q, benar, detik){
  const x = st(q.id);
  if(benar){ x.benar++; x.box=Math.min(5,(x.box||0)+1); } else { x.salah++; x.box=1; }
  x.terakhir = hariIni();
  x.detik = detik || x.detik;
  x.due = benar ? tambahHari(hariIni(), INTERVAL[x.box]) : hariIni();
  const h = hariIni();
  S.harian[h] = S.harian[h] || {soal:0, menit:0};
  S.harian[h].total = (S.harian[h].total||0) + 1;
  S.harian[h].benar = (S.harian[h].benar||0) + (benar?1:0);
  perbaruiKemampuan(q, benar);
  simpanRiwayatRating();
}
function jatuhTempo(){ const h=hariIni(); return BANK().filter(q=>{const x=S.stat[q.id]; return x&&x.due&&x.due<=h;}); }

/* ---------- Pemilihan soal adaptif ---------- */
function akurasiTopik(){
  const map={};
  BANK().forEach(q=>{ const x=S.stat[q.id]; if(!x||(x.benar+x.salah)===0) return;
    const k=q.m+'|'+q.t; map[k]=map[k]||{m:q.m,t:q.t,b:0,s:0};
    map[k].b+=x.benar; map[k].s+=x.salah; });
  return Object.values(map).map(o=>Object.assign(o,{tot:o.b+o.s, akur:persen(o.b,o.b+o.s)}));
}
/* Nilai kelayakan sebuah soal untuk disajikan sekarang */
function bobotAdaptif(q){
  const x = S.stat[q.id];
  const p = harapan(kemampuanEfektif(q.m, q.t), kesulitan(q));
  let skor = 100 - Math.abs(p - TARGET_SUKSES)*180;    // makin dekat zona optimal, makin dipilih
  if(!x || (x.benar+x.salah)===0) skor += 18;          // dorong cakupan materi baru
  if(x && x.due && x.due<=hariIni()) skor += 45;       // yang jatuh tempo wajib naik
  if(x && x.box>=4) skor -= 25;                        // yang sudah melekat jangan sering muncul
  if(x && x.salah>x.benar) skor += 20;                 // titik lemah didahulukan
  if(q.lv===3) skor += 6;                              // sedikit dorongan ke soal bernalar
  return skor + Math.random()*8;                       // variasi supaya tidak monoton
}
function pilihSoal({mapel, topik, n, mode, kecuali}){
  let pool = BANK();
  if(mapel && mapel!=='semua') pool = pool.filter(q=>q.m===mapel);
  if(topik && topik!=='semua') pool = pool.filter(q=>q.t===topik);
  if(kecuali && kecuali.length) pool = pool.filter(q=>!kecuali.includes(q.id));
  if(mode==='ulang') pool = pool.filter(q=>{const x=S.stat[q.id]; return x&&x.due&&x.due<=hariIni();});
  if(mode==='salah') pool = pool.filter(q=>{const x=S.stat[q.id]; return x&&x.salah>0;});
  if(mode==='baru')  pool = pool.filter(q=>!S.stat[q.id]||(S.stat[q.id].benar+S.stat[q.id].salah)===0);
  if(!pool.length) return [];
  if(mode==='acak'||mode==='tryout') return acak(pool).slice(0,n);
  return pool.map(q=>({q, b:bobotAdaptif(q)})).sort((a,b)=>b.b-a.b).slice(0,n).map(o=>o.q);
}

/* ---------- Penilaian jawaban ---------- */
function normalisasi(t){ return String(t).toLowerCase().trim().replace(/\s+/g,' ').replace(/,/g,'.').replace(/[^a-z0-9. ]/g,''); }
function periksa(q,jwb){
  if(jwb==null) return false;
  if(q.tipe==='pg') return jwb===q.a;
  if(q.tipe==='bs') return Array.isArray(jwb) && q.st.every((s,i)=>jwb[i]===s.b);
  if(q.tipe==='jamak'){
    if(!Array.isArray(jwb)) return false;
    const pilih=jwb.slice().sort((a,b)=>a-b), kunci=q.a.slice().sort((a,b)=>a-b);
    return pilih.length===kunci.length && pilih.every((x,i)=>x===kunci[i]);
  }
  if(q.tipe==='isian') return [q.a].concat(q.alt||[]).map(normalisasi).includes(normalisasi(jwb));
  return false;
}

/* ---------- Aktivitas harian ---------- */
function catatHarian(jumlah, detik){
  const h=hariIni(); S.harian[h]=S.harian[h]||{soal:0,menit:0};
  S.harian[h].soal+=jumlah; S.harian[h].menit+=Math.round(detik/60);
}
function targetHarian(){ return Math.min(60, Math.max(10, Math.round(S.profil.jamBelajar*60/2.5))); }
function runtutan(){
  let n=0, t=hariIni();
  if(!S.harian[t]||!S.harian[t].soal) t=tambahHari(t,-1);
  while(S.harian[t]&&S.harian[t].soal>0){ n++; t=tambahHari(t,-1); }
  return n;
}

/* =============================================================
   MESIN UMPAN BALIK — pelatih otomatis
   ============================================================= */
function umpanBalikSesi(H){
  const out=[], akur=persen(H.benar,H.total), dtk=Math.round(H.detik/H.total);
  const nm = namaPanggil();
  if(akur>=85) out.push({ikon:'fa-trophy', w:'emerald', t:`Akurasi ${akur}% — di atas zona nyaman. Sistem akan menaikkan tingkat kesulitan soal berikutnya supaya ${nm} tetap tertantang.`});
  else if(akur>=65) out.push({ikon:'fa-bullseye', w:'indigo', t:`Akurasi ${akur}% — tepat di zona belajar optimal. Pertahankan ritme ini, di sinilah kemampuan naik paling cepat.`});
  else out.push({ikon:'fa-life-ring', w:'amber', t:`Akurasi ${akur}%. Bukan gagal — artinya materi ini memang belum matang. Sistem akan menurunkan kesulitan dan mengulang topik yang sama besok.`});

  const ideal = DETIK_IDEAL[H.soal[0].m] || 150;
  if(dtk > ideal*1.35) out.push({ikon:'fa-hourglass-half', w:'rose', t:`Rata-rata ${dtk} detik/soal, sementara di TKA tersedia ±${ideal} detik. Latih kecepatan: baca pertanyaan dulu, baru stimulusnya.`});
  else if(dtk < ideal*0.45 && akur<70) out.push({ikon:'fa-gauge-high', w:'amber', t:`Hanya ${dtk} detik/soal tetapi banyak yang salah. Ini pola terburu-buru, bukan kurang paham. Coba baca ulang soal sekali sebelum memilih.`});
  else out.push({ikon:'fa-clock', w:'sky', t:`Kecepatan ${dtk} detik/soal — masih aman terhadap alokasi waktu TKA (±${ideal} detik/soal).`});

  const topik = Object.entries(H.perTopik).map(([k,v])=>{const [m,t]=k.split('|'); return {m,t,akur:persen(v.b,v.t),tot:v.t};});
  const lemah = topik.filter(o=>o.akur<60).sort((a,b)=>a.akur-b.akur)[0];
  const kuat  = topik.filter(o=>o.akur===100 && o.tot>=2)[0];
  if(lemah) out.push({ikon:'fa-crosshairs', w:'rose', t:`Titik bocor terbesar: <b>${esc(lemah.t)}</b> (${lemah.akur}%). Besok topik ini akan muncul lagi lebih awal.`, aksi:{label:'Perbaiki sekarang', fn:`mulaiTopik('${js(lemah.m)}','${js(lemah.t)}')`}});
  if(kuat) out.push({ikon:'fa-star', w:'emerald', t:`<b>${esc(kuat.t)}</b> sudah bersih 100%. Topik ini akan dijadwalkan lebih jarang supaya waktu dipakai untuk yang belum kuat.`});

  if(H.deltaRating!=null){
    const d=H.deltaRating;
    out.push({ikon: d>=0?'fa-arrow-trend-up':'fa-arrow-trend-down', w: d>=0?'emerald':'amber',
      t:`Estimasi kemampuan ${d>=0?'naik':'turun'} ${Math.abs(d)} poin → perkiraan skor TKA sekarang <b>${perkiraanSkorTotal()}</b>/100.`});
  }
  return out;
}

/* =============================================================
   TAMPILAN
   ============================================================= */
function setNav(r){ document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('on', a.dataset.nav===r)); }
function render(){
  try{ renderIsi(); }
  catch(e){
    if(typeof tampilkanGalat==='function') tampilkanGalat(e && e.message ? e.message+'\n'+(e.stack||'').split('\n')[1] : e);
    else $('#view').innerHTML = '<div class="card p-4 text-sm">Terjadi galat: '+esc(String(e))+'</div>';
  }
}
function renderIsi(){
  const rute = (location.hash||'#/beranda').replace('#/','').split('?')[0];
  setNav(rute);
  window.scrollTo(0,0);
  if(SESI && rute!=='kerja'){ simpanSesiAktif(); hentikanTimer(); SESI=null; }
  const peta = {beranda:viewBeranda, latihan:viewLatihan, tryout:viewTryout, analisis:viewAnalisis, snbp:viewTarget, target:viewTarget, rapor:viewRapor, tka2025:viewTka2025, materi:viewMateri, simulasi:viewSimulasi, ortu:viewOrtu,
                rencana:viewRencana, jurnal:viewJurnal, pengaturan:viewPengaturan, kerja:viewKerja, hasil:viewHasil};
  $('#view').innerHTML = (peta[rute]||viewBeranda)();
  const memuat = document.getElementById('memuat'); if(memuat) memuat.remove();
  if(rute==='kerja') setelahRenderSoal();
}
window.addEventListener('hashchange', render);
function kartuStat(label,nilai,sub,ikon,warna){
  return `<div class="card p-3">
    <div class="flex items-center gap-2 text-${warna}-600 text-xs font-semibold"><i class="fa-solid ${ikon}"></i>${esc(label)}</div>
    <div class="text-2xl font-extrabold mt-1">${nilai}</div>
    <div class="text-[11px] text-slate-500">${sub||''}</div></div>`;
}

/* ---------- BERANDA ---------- */
function viewBeranda(){
  const sisaTKA=selisihHari(hariIni(),S.profil.tglTKA), sisaSNBP=selisihHari(hariIni(),S.profil.tglSNBP);
  const hd=S.harian[hariIni()]||{soal:0,menit:0}, target=targetHarian(), prog=Math.min(100,persen(hd.soal,target));
  const due=jatuhTempo().length;
  let tb=0,ts=0; Object.values(S.stat).forEach(x=>{tb+=x.benar;ts+=x.salah;});
  const akur=persen(tb,tb+ts), skorTKA=perkiraanSkorTotal(), lvl=levelDari(S.rating.umum);
  const perMapel=URUT_MAPEL.map(m=>{
    let b=0,s=0; BANK().filter(q=>q.m===m).forEach(q=>{const x=S.stat[q.id]; if(x){b+=x.benar;s+=x.salah;}});
    return {m,tot:b+s,akur:persen(b,b+s),skor:perkiraanSkor(m),lvl:levelDari(kemampuanEfektif(m,null))};
  });
  const lemah=akurasiTopik().filter(o=>o.tot>=2).sort((a,b)=>a.akur-b.akur).slice(0,3);
  const sa=S.sesiAktif;

  return `
  ${versiTidakCocok()?`<section class="card p-4 mb-3 border-rose-300 bg-rose-50">
    <p class="text-xs font-bold text-rose-800"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Sebagian aplikasi masih versi lama</p>
    <p class="text-xs text-rose-900 mt-1">Perangkat ini menyimpan salinan lama, sehingga ada menu yang belum muncul. Ketuk tombol di bawah untuk memperbarui.</p>
    <button onclick="paksaMuatUlang()" class="w-full btn bg-rose-600 text-white py-2.5 text-sm mt-2">Perbarui sekarang</button>
  </section>`:''}
  ${sa?`<section class="card p-4 mb-3 border-amber-300 bg-amber-50">
    <p class="text-xs font-bold text-amber-800"><i class="fa-solid fa-play mr-1"></i>Sesi belum selesai</p>
    <p class="text-sm text-amber-900 mt-1">${esc(sa.judul)} · ${sa.jawaban.filter(x=>x!=null).length}/${sa.ids.length} soal terjawab</p>
    <div class="grid grid-cols-2 gap-2 mt-3">
      <button onclick="lanjutkanSesi()" class="btn bg-amber-500 text-white py-2.5 text-sm">Lanjutkan</button>
      <button onclick="buangSesi()" class="btn bg-white text-amber-700 py-2.5 text-sm border border-amber-200">Buang</button>
    </div></section>`:''}

  <section class="card p-4 mb-3">
    <div class="flex items-center justify-between gap-3">
      <div><p class="text-xs text-slate-500">Halo, ${esc(S.profil.nama)} 👋</p>
        <h2 class="text-lg font-extrabold">Hitung mundur ujian</h2></div>
      <a href="#/rencana" class="btn text-xs bg-indigo-50 text-indigo-700 px-3 py-2">Rencana <i class="fa-solid fa-arrow-right"></i></a>
    </div>
    <div class="grid grid-cols-2 gap-2 mt-3">
      <div class="rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-3">
        <p class="text-[11px] text-indigo-200 font-semibold uppercase tracking-wide">TKA</p>
        <p class="text-3xl font-extrabold leading-none">${sisaTKA>=0?sisaTKA:0}<span class="text-sm font-semibold"> hari</span></p>
        <p class="text-[11px] text-indigo-100 mt-1">${fmtTgl(S.profil.tglTKA)}</p></div>
      <div class="rounded-xl bg-slate-900 text-white p-3">
        <p class="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">SNBP</p>
        <p class="text-3xl font-extrabold leading-none">${sisaSNBP>=0?sisaSNBP:0}<span class="text-sm font-semibold"> hari</span></p>
        <p class="text-[11px] text-slate-300 mt-1">${fmtTgl(S.profil.tglSNBP)}</p></div>
    </div>
  </section>

  <section class="card p-4 mb-3">
    <div class="flex items-start justify-between">
      <div><h3 class="font-bold">Perkiraan skor TKA</h3>
        <p class="text-[11px] text-slate-500">dihitung dari kemampuan ARAI saat ini terhadap seluruh bank soal</p></div>
      <span class="text-[11px] bg-indigo-50 text-indigo-700 font-bold rounded-lg px-2 py-1">Level ${lvl}/10</span>
    </div>
    <div class="flex items-end gap-3 mt-2">
      <p class="text-5xl font-extrabold ${warnaAkurasi(skorTKA)}">${skorTKA}</p>
      <p class="text-xs text-slate-500 mb-2">/100 · ${labelLevel(S.rating.umum)}</p>
    </div>
    <div class="h-2.5 rounded-full bg-slate-100 overflow-hidden mt-2"><div class="h-full ${bgAkurasi(skorTKA)} transition-all" style="width:${skorTKA}%"></div></div>
    <p class="text-[11px] text-slate-500 mt-2">${jumlahJawaban()<20?`Baru ${jumlahJawaban()} jawaban terekam — angka ini masih kasar. Setelah ±30 soal, perkiraannya jauh lebih stabil.`:'Angka bergerak naik-turun mengikuti hasil latihan terbaru. Fokus pada trennya, bukan angka harian.'}</p>
    ${(function(){ normalisasiKampus(); const u=S.profil.kampus.find(k=>k.utama)||S.profil.kampus[0]; if(!u) return '';
      const g=u.targetTKA-skorTKA;
      return `<a href="#/target" class="block mt-3 rounded-xl border ${g<=0?'border-emerald-200 bg-emerald-50':'border-slate-200 bg-slate-50'} p-3">
        <p class="text-xs font-semibold ${g<=0?'text-emerald-700':'text-slate-700'}">
          <i class="fa-solid fa-bullseye mr-1"></i>Target utama: ${esc(u.nama)}</p>
        <p class="text-[11px] ${g<=0?'text-emerald-700':'text-slate-500'} mt-0.5">${g<=0?'Patokan sudah terlampaui — jaga konsistensi.':`Kurang <b>${g} poin</b> dari patokan ${u.targetTKA}.`} Ketuk untuk lihat semua target →</p></a>`;
    })()}
  </section>

  <section class="card p-4 mb-3">
    <div class="flex items-center justify-between mb-2">
      <h3 class="font-bold">Target hari ini</h3>
      <span class="text-xs text-slate-500">${hd.soal}/${target} soal · ${hd.menit} menit</span>
    </div>
    <div class="h-3 rounded-full bg-slate-100 overflow-hidden"><div class="h-full bg-indigo-600 transition-all" style="width:${prog}%"></div></div>
    <div class="grid grid-cols-3 gap-2 mt-3 text-center">
      <div><p class="text-xl font-extrabold">${runtutan()}</p><p class="text-[11px] text-slate-500">hari beruntun</p></div>
      <div><p class="text-xl font-extrabold ${warnaAkurasi(akur)}">${akur}%</p><p class="text-[11px] text-slate-500">akurasi total</p></div>
      <div><p class="text-xl font-extrabold">${Object.values(S.stat).filter(x=>x.box>=4).length}</p><p class="text-[11px] text-slate-500">soal dikuasai</p></div>
    </div>
    <button onclick="mulaiBerkelanjutan()" class="w-full btn bg-indigo-600 text-white py-3.5 mt-3 text-sm">
      <i class="fa-solid fa-infinity mr-1"></i> Belajar berkelanjutan <span class="text-indigo-200 font-normal">· soal menyesuaikan kemampuan</span></button>
    <div class="grid grid-cols-2 gap-2 mt-2">
      <button onclick="mulaiCepat()" class="btn bg-slate-100 text-slate-700 py-2.5 text-sm"><i class="fa-solid fa-bolt mr-1"></i>Sesi 10 soal</button>
      <button onclick="mulaiUlang()" class="btn ${due?'bg-amber-500 text-white':'bg-slate-100 text-slate-400'} py-2.5 text-sm" ${due?'':'disabled'}>
        <i class="fa-solid fa-rotate-left mr-1"></i>Ulangi (${due})</button>
    </div>
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Kemampuan per mata uji</h3>
    ${perMapel.map(o=>`
      <div class="mb-2.5">
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold"><i class="fa-solid ${MAPEL[o.m].ikon} text-${MAPEL[o.m].w}-500 mr-1"></i>${MAPEL[o.m].nama}
            ${MAPEL[o.m].kel==='pilihan'?'<span class="text-[10px] text-slate-400">(pilihan FK)</span>':''}</span>
          <span class="${o.tot?warnaAkurasi(o.skor):'text-slate-400'}">${o.tot?'skor ~'+o.skor+' · lvl '+o.lvl:'belum dikerjakan'}</span>
        </div>
        <div class="h-2 rounded-full bg-slate-100 overflow-hidden"><div class="h-full ${o.tot?bgAkurasi(o.skor):'bg-slate-200'}" style="width:${o.tot?o.skor:0}%"></div></div>
      </div>`).join('')}
  </section>

  ${lemah.length?`<section class="card p-4 mb-3 border-rose-200 bg-rose-50/50">
    <h3 class="font-bold mb-2 text-rose-700"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Prioritas perbaikan</h3>
    ${lemah.map(o=>`<button onclick="mulaiTopik('${js(o.m)}','${js(o.t)}')" class="w-full text-left flex justify-between items-center bg-white border border-rose-100 rounded-xl px-3 py-2 mb-1.5">
      <span class="text-sm font-semibold">${esc(o.t)} <span class="text-[11px] text-slate-400">· ${MAPEL[o.m].sing}</span></span>
      <span class="text-sm font-bold ${warnaAkurasi(o.akur)}">${o.akur}%</span></button>`).join('')}
  </section>`:''}

  ${S.umpanBalik.length?`<section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Catatan pelatih terakhir</h3>
    ${S.umpanBalik.slice(0,3).map(f=>`<div class="flex gap-2 items-start text-xs text-slate-700 mb-2">
      <i class="fa-solid ${f.ikon} text-${f.w}-500 mt-0.5"></i><p>${f.t}</p></div>`).join('')}
  </section>`:''}

  <section class="grid grid-cols-3 gap-2 mb-3">
    <a href="#/tka2025" class="card p-3 text-center ring-1 ring-violet-200"><i class="fa-solid fa-file-pen text-violet-500 text-xl"></i><p class="text-xs font-semibold mt-1">TKA 2025</p><p class="text-[10px] text-slate-500">soal asli + kunci</p></a>
    <a href="#/materi" class="card p-3 text-center"><i class="fa-solid fa-book-open text-sky-500 text-xl"></i><p class="text-xs font-semibold mt-1">Materi</p><p class="text-[10px] text-slate-500">rumus &amp; konsep</p></a>
    <a href="#/simulasi" class="card p-3 text-center"><i class="fa-solid fa-calendar-check text-emerald-500 text-xl"></i><p class="text-xs font-semibold mt-1">Simulasi</p><p class="text-[10px] text-slate-500">5 mata uji</p></a>
  </section>
  <section class="grid grid-cols-3 gap-2 mb-3">
    <a href="#/ortu" class="card p-3 text-center"><i class="fa-solid fa-user-shield text-amber-500 text-xl"></i><p class="text-xs font-semibold mt-1">Abi &amp; Ummi</p><p class="text-[10px] text-slate-500">pantau &amp; rapor</p></a>
    <a href="#/jurnal" class="card p-3 text-center"><i class="fa-solid fa-book-bookmark text-indigo-500 text-xl"></i><p class="text-xs font-semibold mt-1">Jurnal salah</p><p class="text-[10px] text-slate-500">${S.jurnal.length} catatan</p></a>
    <a href="#/target" class="card p-3 text-center"><i class="fa-solid fa-bullseye text-emerald-500 text-xl"></i><p class="text-xs font-semibold mt-1">Target FK</p><p class="text-[10px] text-slate-500">patokan kampus</p></a>
  </section>

  <section class="card p-4 mb-3 bg-slate-50">
    <h3 class="font-bold text-sm mb-1"><i class="fa-solid fa-circle-info text-slate-400 mr-1"></i>Format TKA SMA 2026</h3>
    <p class="text-xs text-slate-600 leading-relaxed">5 mata uji: 3 wajib (B. Indonesia 30 soal/75 menit, Matematika 25 soal/75 menit, B. Inggris 30 soal/75 menit)
      + 2 mata uji pilihan (masing-masing 25 soal/60 menit). Untuk Fakultas Kedokteran, pilihan paling relevan: <b>Biologi</b> dan <b>Kimia</b>.
      Bentuk soal: pilihan ganda, benar–salah, isian singkat, dan soal bernalar berstimulus. Nilai TKA melengkapi nilai rapor pada seleksi SNBP.</p>
    <p class="text-[11px] text-slate-400 mt-2">Jadwal dan ketentuan dapat berubah — cek pengumuman sekolah, Kemendikdasmen, dan SNPMB. Tanggal bisa diubah di menu ⚙.</p>
  </section>`;
}
function mulaiCepat(){ mulaiSesi({mode:'adaptif', mapel:'semua', n:10, judul:'Sesi adaptif 10 soal'}); }
function mulaiUlang(){ mulaiSesi({mode:'ulang', mapel:'semua', n:15, judul:'Pengulangan berjarak'}); }
function mulaiTopik(m,t){ mulaiSesi({mode:'adaptif', mapel:m, topik:t, n:8, judul:t}); }
function mulaiBerkelanjutan(){ mulaiSesi({mode:'adaptif', mapel:'semua', n:5, judul:'Belajar berkelanjutan', tanpaBatas:true}); }

/* ---------- LATIHAN ---------- */
function viewLatihan(){
  const topikPer={}; BANK().forEach(q=>{ topikPer[q.m]=topikPer[q.m]||new Set(); topikPer[q.m].add(q.t); });
  const akur = akurasiTopik();
  return `
  <section class="card p-4 mb-3">
    <h2 class="text-lg font-extrabold mb-1">Latihan soal</h2>
    <p class="text-xs text-slate-500 mb-3">Sistem memilih soal yang peluang benarnya sekitar 75% bagi ${esc(namaPanggil())} — cukup menantang untuk naik level, tidak sampai bikin patah semangat.</p>
    <button onclick="mulaiBerkelanjutan()" class="w-full btn bg-indigo-600 text-white py-3.5 text-sm mb-2"><i class="fa-solid fa-infinity mr-1"></i>Belajar berkelanjutan (tanpa batas soal)</button>
    <a href="#/tka2025" class="w-full btn bg-violet-600 text-white py-3 text-sm mb-2 block text-center"><i class="fa-solid fa-file-pen mr-1"></i>Paket soal TKA 2025 + pembahasan</a>
    <div class="grid grid-cols-2 gap-2">
      <button onclick="mulaiCepat()" class="btn bg-slate-800 text-white py-3 text-sm"><i class="fa-solid fa-bolt mr-1"></i>Adaptif (10)</button>
      <button onclick="mulaiSesi({mode:'salah',mapel:'semua',n:15,judul:'Bank soal salah'})" class="btn bg-rose-500 text-white py-3 text-sm"><i class="fa-solid fa-repeat mr-1"></i>Pernah salah</button>
      <button onclick="mulaiSesi({mode:'baru',mapel:'semua',n:15,judul:'Soal baru'})" class="btn bg-emerald-600 text-white py-3 text-sm"><i class="fa-solid fa-seedling mr-1"></i>Soal baru</button>
      <button onclick="mulaiSesi({mode:'acak',mapel:'semua',n:20,judul:'Campur acak'})" class="btn bg-slate-600 text-white py-3 text-sm"><i class="fa-solid fa-shuffle mr-1"></i>Campur acak</button>
    </div>
  </section>
  ${URUT_MAPEL.map(m=>{
    const topik=Array.from(topikPer[m]||[]).sort(), jml=BANK().filter(q=>q.m===m).length;
    return `<section class="card p-4 mb-3">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-bold"><i class="fa-solid ${MAPEL[m].ikon} text-${MAPEL[m].w}-500 mr-1"></i>${MAPEL[m].nama}</h3>
        <button onclick="mulaiSesi({mode:'adaptif',mapel:'${m}',n:10,judul:'${js(MAPEL[m].nama)}'})" class="btn text-xs bg-${MAPEL[m].w}-50 text-${MAPEL[m].w}-700 px-3 py-1.5">Latih 10 soal</button>
      </div>
      <p class="text-[11px] text-slate-400 mb-2">${jml} soal · ${topik.length} topik · level ${levelDari(kemampuanEfektif(m,null))}/10</p>
      <div class="flex flex-wrap gap-1.5">
        ${topik.map(t=>{ const o=akur.find(x=>x.m===m&&x.t===t);
          const w=o?(o.akur>=80?'bg-emerald-50 text-emerald-700 border-emerald-200':o.akur>=60?'bg-amber-50 text-amber-700 border-amber-200':'bg-rose-50 text-rose-700 border-rose-200'):'bg-slate-50 text-slate-600 border-slate-200';
          return `<button onclick="mulaiTopik('${m}','${js(t)}')" class="text-[11px] border ${w} rounded-lg px-2 py-1">${esc(t)}${o?' · '+o.akur+'%':''}</button>`;
        }).join('')}
      </div></section>`;
  }).join('')}`;
}

/* ---------- TRYOUT ---------- */
function viewTryout(){
  const riwayat=S.tryout.slice(-8).reverse();
  return `
  <section class="card p-4 mb-3">
    <h2 class="text-lg font-extrabold mb-1">Tryout bertimer</h2>
    <p class="text-xs text-slate-500 mb-3">Simulasi satu mata uji sesuai format resmi TKA 2026. Pembahasan ditahan sampai selesai, persis seperti ujian sungguhan.</p>
    ${URUT_MAPEL.map(m=>{
      const tersedia=BANK().filter(q=>q.m===m).length, n=Math.min(MAPEL[m].soalTO,tersedia);
      return `<button onclick="mulaiTryout('${m}')" class="w-full flex items-center justify-between border border-slate-200 rounded-xl px-3 py-3 mb-2 text-left">
        <span><i class="fa-solid ${MAPEL[m].ikon} text-${MAPEL[m].w}-500 mr-2"></i><b>${MAPEL[m].nama}</b>
        <span class="block text-[11px] text-slate-500 ml-6">${n} soal · ${MAPEL[m].menitTO} menit</span></span>
        <i class="fa-solid fa-play text-slate-400"></i></button>`;
    }).join('')}
    <button onclick="mulaiTryout('paket')" class="w-full btn bg-slate-900 text-white py-3 mt-1 text-sm"><i class="fa-solid fa-layer-group mr-1"></i>Paket campuran 25 soal (45 menit)</button>
    <a href="#/simulasi" class="w-full btn bg-violet-600 text-white py-3 mt-2 text-sm block text-center"><i class="fa-solid fa-calendar-check mr-1"></i>Simulasi hari-H · 5 mata uji penuh</a>
  </section>
  <section class="card p-4">
    <h3 class="font-bold mb-2">Riwayat tryout</h3>
    ${riwayat.length? riwayat.map(t=>`
      <div class="flex items-center justify-between border-b border-slate-100 py-2 last:border-0">
        <div><p class="text-sm font-semibold">${t.mapel==='paket'?'Paket campuran':MAPEL[t.mapel].nama}</p>
        <p class="text-[11px] text-slate-500">${fmtTgl(t.tgl)} · ${t.benar}/${t.total} benar · ${t.menit} menit</p></div>
        <span class="text-xl font-extrabold ${warnaAkurasi(t.skor)}">${t.skor}</span></div>`).join('')
      : '<p class="text-xs text-slate-400">Belum ada tryout. Idealnya 1–2 kali seminggu menjelang ujian.</p>'}
  </section>`;
}
function mulaiTryout(m){
  if(m==='paket') return mulaiSesi({mode:'tryout',mapel:'semua',n:25,detik:45*60,judul:'Paket campuran',tryout:'paket'});
  mulaiSesi({mode:'tryout',mapel:m,n:MAPEL[m].soalTO,detik:MAPEL[m].menitTO*60,judul:'Tryout '+MAPEL[m].nama,tryout:m});
}

/* =============================================================
   MESIN PENGERJAAN SOAL (mendukung sesi tanpa batas & lanjut otomatis)
   ============================================================= */
let SESI=null, TIMER=null, MULAI_SOAL=Date.now();
function hentikanTimer(){ if(TIMER){ clearInterval(TIMER); TIMER=null; } }

function mulaiSesi(o){
  const soal = pilihSoal({mapel:o.mapel, topik:o.topik, n:o.n, mode:o.mode});
  if(!soal.length){ alert('Belum ada soal yang cocok untuk pilihan ini. Coba mode lain.'); return; }
  SESI = {soal, i:0, jawaban:new Array(soal.length).fill(null), dikunci:new Array(soal.length).fill(false),
          judul:o.judul||'Latihan', tryout:o.tryout||null, simulasi:o.simulasi||null, tanpaBatas:!!o.tanpaBatas,
          mapel:o.mapel||'semua', topik:o.topik||null, mode:o.mode,
          sisa:o.detik||null, mulai:Date.now(), langsung:!o.tryout, ratingAwal:S.rating.umum, waktuSoal:[]};
  MULAI_SOAL=Date.now();
  simpanSesiAktif();
  if(location.hash==='#/kerja') render(); else location.hash='#/kerja';
}
function simpanSesiAktif(){
  if(!SESI){ return; }
  S.sesiAktif = {ids:SESI.soal.map(q=>q.id), i:SESI.i, jawaban:SESI.jawaban, dikunci:SESI.dikunci, judul:SESI.judul,
                 tryout:SESI.tryout, simulasi:SESI.simulasi, tanpaBatas:SESI.tanpaBatas, mapel:SESI.mapel, topik:SESI.topik, mode:SESI.mode,
                 sisa:SESI.sisa, ratingAwal:SESI.ratingAwal, waktuSoal:SESI.waktuSoal, tgl:hariIni()};
  simpan();
}
function lanjutkanSesi(){
  const a=S.sesiAktif; if(!a) return;
  const soal=a.ids.map(soalById).filter(Boolean);
  if(!soal.length){ buangSesi(); return; }
  SESI={soal, i:Math.min(a.i,soal.length-1), jawaban:a.jawaban, dikunci:a.dikunci, judul:a.judul, tryout:a.tryout, simulasi:a.simulasi,
        tanpaBatas:a.tanpaBatas, mapel:a.mapel, topik:a.topik, mode:a.mode, sisa:a.sisa, mulai:Date.now(),
        langsung:!a.tryout, ratingAwal:a.ratingAwal!=null?a.ratingAwal:S.rating.umum, waktuSoal:a.waktuSoal||[]};
  MULAI_SOAL=Date.now();
  location.hash='#/kerja'; render();
}
function buangSesi(){ S.sesiAktif=null; simpan(); render(); }

function tambahSoalBaru(){
  const dipakai = SESI.soal.map(q=>q.id);
  const baru = pilihSoal({mapel:SESI.mapel, topik:SESI.topik, n:1, mode:'adaptif', kecuali:dipakai});
  if(!baru.length){ // bank habis: ulangi yang paling lemah
    const ulang = pilihSoal({mapel:SESI.mapel, topik:SESI.topik, n:1, mode:'adaptif'});
    if(!ulang.length) return false;
    SESI.soal.push(ulang[0]);
  } else SESI.soal.push(baru[0]);
  SESI.jawaban.push(null); SESI.dikunci.push(false);
  return true;
}

function viewKerja(){
  if(!SESI) return '<div class="card p-6 text-center"><p class="text-sm text-slate-500">Sesi selesai.</p><a href="#/beranda" class="btn inline-block mt-3 bg-indigo-600 text-white px-4 py-2">Kembali</a></div>';
  const q=SESI.soal[SESI.i], dikunci=SESI.dikunci[SESI.i], jwb=SESI.jawaban[SESI.i];
  const benar = dikunci ? periksa(q,jwb) : null;
  const pelu = Math.round(harapan(kemampuanEfektif(q.m,q.t), kesulitan(q))*100);

  let isi='';
  if(q.tipe==='pg'){
    isi=q.o.map((o,i)=>{
      let k='opt w-full text-left px-3 py-2.5 mb-2 text-sm flex gap-2';
      if(dikunci){ if(i===q.a) k+=' benar'; else if(i===jwb) k+=' salah'; } else if(i===jwb) k+=' sel';
      return `<button class="${k}" onclick="pilihJawaban(${i})" ${dikunci?'disabled':''}>
        <span class="font-bold text-slate-400">${String.fromCharCode(65+i)}.</span><span>${esc(o)}</span></button>`;
    }).join('');
  } else if(q.tipe==='jamak'){
    const dipilih = Array.isArray(jwb)?jwb:[];
    isi = `<p class="text-[11px] text-slate-500 mb-2"><i class="fa-solid fa-hand-pointer mr-1"></i>Pilih semua yang benar — jawaban benar lebih dari satu.</p>` +
      q.o.map((o,i)=>{
        let k='opt w-full text-left px-3 py-2.5 mb-2 text-sm flex gap-2 items-start';
        const ada = dipilih.includes(i), kunci = q.a.includes(i);
        if(dikunci){ if(kunci) k+=' benar'; else if(ada) k+=' salah'; }
        else if(ada) k+=' sel';
        return `<button class="${k}" onclick="pilihJamak(${i})" ${dikunci?'disabled':''}>
          <span class="w-5 h-5 rounded border-2 ${ada?'bg-indigo-600 border-indigo-600 text-white':'border-slate-300'} flex items-center justify-center shrink-0 text-[10px]">${ada?'<i class="fa-solid fa-check"></i>':''}</span>
          <span>${esc(o)}${dikunci&&kunci?' <span class="text-[10px] text-emerald-700 font-bold">(kunci)</span>':''}</span></button>`;
      }).join('');
  } else if(q.tipe==='bs'){
    isi=q.st.map((s,i)=>{
      const v=jwb?jwb[i]:null;
      const tanda=dikunci?(v===s.b?'<i class="fa-solid fa-check text-emerald-600 ml-1"></i>':'<i class="fa-solid fa-xmark text-rose-600 ml-1"></i>'):'';
      return `<div class="opt px-3 py-2.5 mb-2 text-sm">
        <p class="mb-2">${esc(s.p)} ${tanda}${dikunci?`<span class="text-[11px] text-slate-500 block mt-1">Kunci: ${s.b?'Benar':'Salah'}</span>`:''}</p>
        <div class="flex gap-2">
          <button onclick="pilihBS(${i},true)" ${dikunci?'disabled':''} class="btn text-xs px-3 py-1.5 ${v===true?'bg-indigo-600 text-white':'bg-slate-100 text-slate-600'}">Benar</button>
          <button onclick="pilihBS(${i},false)" ${dikunci?'disabled':''} class="btn text-xs px-3 py-1.5 ${v===false?'bg-indigo-600 text-white':'bg-slate-100 text-slate-600'}">Salah</button>
        </div></div>`;
    }).join('');
  } else {
    isi=`<input id="isian" ${dikunci?'disabled':''} value="${jwb?esc(jwb):''}" oninput="SESI.jawaban[SESI.i]=this.value"
      class="w-full border-2 ${dikunci?(benar?'border-emerald-400 bg-emerald-50':'border-rose-400 bg-rose-50'):'border-slate-200'} rounded-xl px-3 py-3 text-sm" placeholder="Ketik jawaban singkat…">
      ${dikunci?`<p class="text-xs mt-2">Kunci: <b>${esc(q.a)}</b></p>`:''}`;
  }

  const nomor=SESI.soal.map((s,i)=>{
    const w=SESI.dikunci[i]?(periksa(SESI.soal[i],SESI.jawaban[i])?'bg-emerald-500 text-white':'bg-rose-500 text-white')
      :(SESI.jawaban[i]!=null?'bg-indigo-200 text-indigo-800':'bg-slate-100 text-slate-500');
    return `<button onclick="keSoal(${i})" class="w-7 h-7 rounded-lg text-[11px] font-bold ${w} ${i===SESI.i?'ring-2 ring-indigo-600':''}">${i+1}</button>`;
  }).join('');

  const cek = SESI.tanpaBatas && dikunci && (SESI.i+1)%10===0 ? checkpoint() : '';

  return `
  <section class="card p-4 mb-3">
    <div class="flex items-center justify-between mb-2">
      <div class="min-w-0">
        <p class="text-[11px] text-slate-500 truncate">${esc(SESI.judul)}${SESI.tanpaBatas?' · tanpa batas':''}</p>
        <p class="text-sm font-bold">Soal ${SESI.i+1} <span class="text-slate-400 font-medium">${SESI.tanpaBatas?'':'/ '+SESI.soal.length}</span></p>
      </div>
      ${SESI.sisa!=null?`<div id="timer" class="font-mono font-bold text-lg ${SESI.sisa<300?'text-rose-600':'text-slate-700'}">${pad(Math.floor(SESI.sisa/60))}:${pad(SESI.sisa%60)}</div>`
        :`<button onclick="akhiriSesi()" class="btn text-xs bg-slate-100 text-slate-600 px-3 py-2">Selesai &amp; lihat hasil</button>`}
    </div>
    ${SESI.tanpaBatas?'':`<div class="flex flex-wrap gap-1.5 mb-3">${nomor}</div>`}
    <div class="text-[11px] text-slate-500 mb-2">
      <span class="bg-${MAPEL[q.m].w}-50 text-${MAPEL[q.m].w}-700 rounded px-2 py-0.5 font-semibold">${MAPEL[q.m].sing}</span>
      <span class="ml-1">${esc(q.t)}</span>
      <span class="ml-1">· ${q.lv===3?'HOTS':q.lv===2?'Sedang':'Dasar'}</span>
      <span class="ml-1">· ${q.tipe==='pg'?'Pilihan ganda':q.tipe==='bs'?'Benar–salah':q.tipe==='jamak'?'Pilihan jamak':'Isian singkat'}</span>
      ${q.pkt?`<span class="ml-1 bg-violet-100 text-violet-700 rounded px-1.5 py-0.5 font-semibold">${esc(q.asal||'Paket TKA 2025')}</span>`:''}
      ${!SESI.tryout?`<span class="ml-1 text-slate-400">· peluang benarmu ±${pelu}%</span>`:''}
    </div>
    ${q.s?`<div class="bg-slate-50 border-l-4 border-slate-300 rounded-r-lg p-3 text-sm mb-3 leading-relaxed">${esc(q.s)}</div>`:''}
    <p class="font-semibold mb-3 leading-relaxed">${esc(q.q)}</p>
    ${isi}
    ${dikunci?`
      <div class="mt-3 rounded-xl p-3 ${benar?'bg-emerald-50 border border-emerald-200':'bg-rose-50 border border-rose-200'}">
        <p class="font-bold text-sm ${benar?'text-emerald-700':'text-rose-700'} mb-1">
          <i class="fa-solid ${benar?'fa-circle-check':'fa-circle-xmark'} mr-1"></i>${benar?'Benar':'Belum tepat'}</p>
        <p class="text-sm leading-relaxed text-slate-700">${esc(q.e)}</p>
        ${!benar?kartuMateri(q.m,q.t,true):''}
        ${!benar?`<div class="mt-2"><p class="text-[11px] font-semibold text-slate-500 mb-1">Kenapa salah? (masuk jurnal)</p>
          <div class="flex flex-wrap gap-1">${SEBAB_SALAH.map(s=>`<button onclick="catatJurnal('${q.id}','${js(s)}',this)" class="text-[11px] bg-white border border-slate-200 rounded-lg px-2 py-1">${s}</button>`).join('')}</div></div>`:''}
      </div>`:''}
    ${cek}
    <div class="grid grid-cols-2 gap-2 mt-4">
      ${SESI.langsung && !dikunci
        ? `<button onclick="kunciJawaban()" class="btn bg-indigo-600 text-white py-3 col-span-2">Periksa jawaban</button>`
        : (SESI.tanpaBatas
            ? `<button onclick="akhiriSesi()" class="btn bg-slate-100 text-slate-600 py-3">Cukup, lihat hasil</button>
               <button onclick="keSoal(${SESI.i+1})" class="btn bg-indigo-600 text-white py-3">Soal berikutnya</button>`
            : `<button onclick="keSoal(${SESI.i-1})" class="btn bg-slate-100 text-slate-600 py-3" ${SESI.i===0?'disabled':''}>Sebelumnya</button>
               ${SESI.i===SESI.soal.length-1
                 ? `<button onclick="akhiriSesi()" class="btn bg-emerald-600 text-white py-3">Selesai</button>`
                 : `<button onclick="keSoal(${SESI.i+1})" class="btn bg-indigo-600 text-white py-3">Berikutnya</button>`}`)}
    </div>
  </section>`;
}
function checkpoint(){
  const n=SESI.i+1, mulai=Math.max(0,n-10);
  let b=0; for(let i=mulai;i<n;i++){ if(periksa(SESI.soal[i],SESI.jawaban[i])) b++; }
  const p=persen(b,n-mulai);
  const pesan = p>=85?'Menguasai. Sistem menaikkan kesulitan soal berikutnya.'
    : p>=60?'Zona belajar optimal. Terus lanjut, ritmenya pas.'
    : 'Sistem menurunkan kesulitan dan mengulang topik yang tadi bocor. Santai, ini bagian dari proses.';
  return `<div class="mt-3 rounded-xl border border-indigo-200 bg-indigo-50 p-3">
    <p class="text-xs font-bold text-indigo-800"><i class="fa-solid fa-flag-checkered mr-1"></i>Cek poin ${n} soal · ${b}/10 benar (${p}%)</p>
    <p class="text-xs text-indigo-900 mt-1">${pesan} Perkiraan skor TKA sekarang <b>${perkiraanSkorTotal()}</b>/100.</p>
    ${kartuPesan(p>=80?'bagus':p<60?'kurang':'umum')}</div>`;
}
function setelahRenderSoal(){
  if(SESI && SESI.sisa!=null && !TIMER){
    TIMER=setInterval(()=>{
      if(!SESI){ hentikanTimer(); return; }
      SESI.sisa--;
      const el=$('#timer');
      if(el){ el.textContent=pad(Math.floor(SESI.sisa/60))+':'+pad(SESI.sisa%60); if(SESI.sisa<300) el.className='font-mono font-bold text-lg text-rose-600'; }
      if(SESI.sisa%15===0) simpanSesiAktif();
      if(SESI.sisa<=0){ hentikanTimer(); alert('Waktu habis. Jawaban otomatis dikumpulkan.'); akhiriSesi(); }
    },1000);
  }
}
function pilihJawaban(i){
  if(SESI.dikunci[SESI.i]) return;
  SESI.jawaban[SESI.i]=i;
  if(SESI.langsung) kunciJawaban(); else { simpanSesiAktif(); render(); }
}
function pilihJamak(i){
  if(SESI.dikunci[SESI.i]) return;
  const kini = Array.isArray(SESI.jawaban[SESI.i]) ? SESI.jawaban[SESI.i].slice() : [];
  const pos = kini.indexOf(i);
  if(pos>=0) kini.splice(pos,1); else kini.push(i);
  SESI.jawaban[SESI.i] = kini; simpanSesiAktif(); render();
}
function pilihBS(i,v){
  if(SESI.dikunci[SESI.i]) return;
  SESI.jawaban[SESI.i]=SESI.jawaban[SESI.i]||new Array(SESI.soal[SESI.i].st.length).fill(null);
  SESI.jawaban[SESI.i][i]=v; render();
}
function kunciJawaban(){
  const q=SESI.soal[SESI.i], j=SESI.jawaban[SESI.i];
  if(j==null||(q.tipe==='bs'&&j.some(x=>x==null))||(q.tipe==='isian'&&!String(j).trim())||(q.tipe==='jamak'&&(!j.length))){ alert('Isi jawabanmu dulu ya.'); return; }
  const detik=Math.round((Date.now()-MULAI_SOAL)/1000);
  SESI.waktuSoal[SESI.i]=detik;
  SESI.dikunci[SESI.i]=true;
  catatJawaban(q, periksa(q,j), detik);
  simpan(); simpanSesiAktif(); render();
}
function keSoal(i){
  if(i<0) return;
  if(i>=SESI.soal.length){
    if(SESI.tanpaBatas){ if(!tambahSoalBaru()) { alert('Bank soal sudah habis untuk mode ini. Sesi diselesaikan.'); return akhiriSesi(); } }
    else return;
  }
  if(SESI.langsung && !SESI.dikunci[SESI.i] && SESI.jawaban[SESI.i]!=null) kunciJawaban();
  SESI.i=i; MULAI_SOAL=Date.now(); simpanSesiAktif(); render();
}
function catatJurnal(qid, sebab, el){
  S.jurnal.unshift({tgl:hariIni(), qid, sebab}); S.jurnal=S.jurnal.slice(0,300); simpan();
  if(el){ el.parentElement.innerHTML=`<span class="text-[11px] text-emerald-700 font-semibold"><i class="fa-solid fa-check mr-1"></i>Tercatat: ${esc(sebab)}</span>`; }
}

let HASIL=null;
function akhiriSesi(){
  if(!SESI) return;
  hentikanTimer();
  const detik=Math.round((Date.now()-SESI.mulai)/1000);
  const terjawab = SESI.soal.filter((q,i)=>SESI.jawaban[i]!=null||SESI.dikunci[i]);
  let benar=0;
  SESI.soal.forEach((q,i)=>{
    const ok=periksa(q,SESI.jawaban[i]);
    if(!SESI.dikunci[i]){ catatJawaban(q, ok, SESI.waktuSoal[i]||0); SESI.dikunci[i]=true; }
    if(ok) benar++;
  });
  const perTopik={};
  SESI.soal.forEach((q,i)=>{ const k=q.m+'|'+q.t; perTopik[k]=perTopik[k]||{b:0,t:0};
    perTopik[k].t++; if(periksa(q,SESI.jawaban[i])) perTopik[k].b++; });
  HASIL={judul:SESI.judul, soal:SESI.soal, jawaban:SESI.jawaban, benar, total:SESI.soal.length, detik, perTopik,
         deltaRating: S.rating.umum - (SESI.ratingAwal!=null?SESI.ratingAwal:S.rating.umum)};
  HASIL.umpan = umpanBalikSesi(HASIL);
  S.umpanBalik = HASIL.umpan;
  catatHarian(SESI.soal.length, detik);
  S.sesi.push({tgl:hariIni(), judul:SESI.judul, benar, total:SESI.soal.length, menit:Math.round(detik/60), skor:persen(benar,SESI.soal.length)});
  S.sesi=S.sesi.slice(-300);
  if(SESI.simulasi){ simulasiAktif().selesai[SESI.simulasi]={skor:persen(benar,SESI.soal.length), benar, total:SESI.soal.length, menit:Math.round(detik/60), tgl:hariIni()}; }
  if(SESI.tryout) S.tryout.push({tgl:hariIni(), mapel:SESI.tryout, benar, total:SESI.soal.length, skor:persen(benar,SESI.soal.length), menit:Math.round(detik/60)});
  S.sesiAktif=null; simpan(); SESI=null;
  location.hash='#/hasil'; render();
}

function viewHasil(){
  if(!HASIL) return '<div class="card p-6 text-center text-sm text-slate-500">Belum ada hasil. <a class="text-indigo-600 font-semibold" href="#/latihan">Mulai latihan</a></div>';
  const H=HASIL, skor=persen(H.benar,H.total);
  const salah=H.soal.map((q,i)=>({q,i})).filter(o=>!periksa(o.q,H.jawaban[o.i]));
  const topik=Object.entries(H.perTopik).map(([k,v])=>{const [m,t]=k.split('|'); return {m,t,b:v.b,tot:v.t,akur:persen(v.b,v.t)};}).sort((a,b)=>a.akur-b.akur);
  return `
  <section class="card p-5 mb-3 text-center">
    <p class="text-xs text-slate-500">${esc(H.judul)}</p>
    <p class="text-5xl font-extrabold my-1 ${warnaAkurasi(skor)}">${skor}</p>
    <p class="text-sm text-slate-600">${H.benar} benar dari ${H.total} soal · ${Math.round(H.detik/60)} menit · ${Math.round(H.detik/H.total)} detik/soal</p>
    ${kartuPesan((S.harian[hariIni()]||{soal:0}).soal>=targetHarian()?'target':(skor>=80?'bagus':skor<60?'kurang':'umum'))}
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2"><i class="fa-solid fa-comment-dots text-indigo-500 mr-1"></i>Umpan balik untuk ${esc(namaPanggil())}</h3>
    ${H.umpan.map(f=>`<div class="flex gap-2 items-start mb-2.5">
      <i class="fa-solid ${f.ikon} text-${f.w}-500 mt-0.5"></i>
      <div class="flex-1"><p class="text-sm text-slate-700 leading-relaxed">${f.t}</p>
      ${f.aksi?`<button onclick="${f.aksi.fn}" class="btn text-[11px] bg-indigo-50 text-indigo-700 px-2 py-1 mt-1">${f.aksi.label}</button>`:''}</div>
    </div>`).join('')}
    <div class="grid grid-cols-2 gap-2 mt-2">
      <button onclick="mulaiBerkelanjutan()" class="btn bg-indigo-600 text-white py-3 text-sm">Lanjut belajar</button>
      <a href="#/beranda" class="btn bg-slate-100 text-slate-700 py-3 text-sm text-center">Beranda</a>
    </div>
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Rincian per topik</h3>
    ${topik.map(o=>`<div class="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
      <span class="text-sm">${esc(o.t)} <span class="text-[11px] text-slate-400">· ${MAPEL[o.m].sing}</span></span>
      <span class="text-sm font-bold ${warnaAkurasi(o.akur)}">${o.b}/${o.tot}</span></div>`).join('')}
  </section>

  <section class="card p-4">
    <h3 class="font-bold mb-2">Pembahasan soal yang salah (${salah.length})</h3>
    ${salah.length? salah.map(o=>`
      <details class="border border-slate-200 rounded-xl p-3 mb-2">
        <summary class="text-sm font-semibold cursor-pointer">${esc(o.q.t)} · ${MAPEL[o.q.m].sing}</summary>
        ${o.q.s?`<p class="text-xs bg-slate-50 rounded p-2 my-2 leading-relaxed">${esc(o.q.s)}</p>`:''}
        <p class="text-sm mt-2 font-medium">${esc(o.q.q)}</p>
        ${o.q.tipe==='pg'?`<p class="text-sm mt-1 text-emerald-700"><b>Kunci:</b> ${String.fromCharCode(65+o.q.a)}. ${esc(o.q.o[o.q.a])}</p>`:''}
        ${o.q.tipe==='isian'?`<p class="text-sm mt-1 text-emerald-700"><b>Kunci:</b> ${esc(o.q.a)}</p>`:''}
        ${o.q.tipe==='bs'?`<ul class="text-sm mt-1 text-emerald-700 list-disc ml-5">${o.q.st.map(s=>`<li>${esc(s.p)} — <b>${s.b?'Benar':'Salah'}</b></li>`).join('')}</ul>`:''}
        ${o.q.tipe==='jamak'?`<p class="text-sm mt-1 text-emerald-700"><b>Kunci:</b> ${o.q.a.map(i=>esc(o.q.o[i])).join(' · ')}</p>`:''}
        <p class="text-sm mt-2 text-slate-700 leading-relaxed">${esc(o.q.e)}</p>
      </details>`).join('') : '<p class="text-xs text-emerald-600 font-semibold">Sempurna! Tidak ada yang salah pada sesi ini.</p>'}
  </section>`;
}

/* ---------- ANALISIS ---------- */
function viewAnalisis(){
  const topik=akurasiTopik().sort((a,b)=>a.akur-b.akur);
  let tb=0,ts=0; Object.values(S.stat).forEach(x=>{tb+=x.benar;ts+=x.salah;});
  const hari14=[]; for(let i=13;i>=0;i--){ const t=tambahHari(hariIni(),-i); hari14.push({t,d:S.harian[t]||{soal:0,menit:0}}); }
  const maks=Math.max(10,...hari14.map(h=>h.d.soal));
  const kotak=[1,2,3,4,5].map(b=>Object.values(S.stat).filter(x=>x.box===b).length);
  const rh=S.rating.riwayat.slice(-20);
  const minS=Math.min(...rh.map(r=>r.skor),0), maksS=Math.max(...rh.map(r=>r.skor),100);
  return `
  <section class="grid grid-cols-2 gap-2 mb-3">
    ${kartuStat('Perkiraan skor TKA', perkiraanSkorTotal(), 'level '+levelDari(S.rating.umum)+'/10','fa-bullseye','indigo')}
    ${kartuStat('Akurasi total', persen(tb,tb+ts)+'%', (tb+ts)+' jawaban','fa-check-double','emerald')}
    ${kartuStat('Cakupan bank soal', persen(Object.keys(S.stat).length,BANK().length)+'%', Object.keys(S.stat).length+'/'+BANK().length+' soal','fa-layer-group','sky')}
    ${kartuStat('Hari beruntun', runtutan(), Object.values(S.harian).reduce((a,b)=>a+b.menit,0)+' menit total','fa-fire','amber')}
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-1">Tren kemampuan</h3>
    <p class="text-[11px] text-slate-500 mb-3">Perkiraan skor TKA dari waktu ke waktu. Yang penting arah garisnya naik.</p>
    ${rh.length>1?`<div class="flex items-end gap-1 h-24">
      ${rh.map(r=>`<div class="flex-1 flex flex-col justify-end items-center" title="${r.tgl}: ${r.skor}">
        <div class="w-full rounded-t bg-gradient-to-t from-indigo-500 to-violet-400" style="height:${Math.max(6,(r.skor-Math.max(0,minS-10))/(Math.max(1,maksS-Math.max(0,minS-10)))*100)}%"></div></div>`).join('')}
    </div>
    <div class="flex justify-between text-[10px] text-slate-400 mt-1"><span>${fmtTgl(rh[0].tgl)}</span><span>hari ini · ${rh[rh.length-1].skor}</span></div>`
    :'<p class="text-xs text-slate-400">Butuh minimal dua hari latihan agar tren muncul.</p>'}
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-3">Aktivitas 14 hari</h3>
    <div class="flex items-end gap-1 h-24">
      ${hari14.map(h=>`<div class="flex-1 flex flex-col justify-end items-center" title="${h.t}: ${h.d.soal} soal">
        <div class="w-full rounded-t ${h.d.soal?'bg-indigo-500':'bg-slate-100'}" style="height:${Math.max(4,h.d.soal/maks*100)}%"></div></div>`).join('')}
    </div>
    <div class="flex justify-between text-[10px] text-slate-400 mt-1"><span>${fmtTgl(hari14[0].t)}</span><span>hari ini</span></div>
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-1">Tahap penguasaan</h3>
    <p class="text-[11px] text-slate-500 mb-2">Kotak 1 = baru salah, kotak 5 = sudah melekat. Naik satu kotak tiap kali dijawab benar, dan jeda pengulangannya makin panjang.</p>
    <div class="flex gap-1">
      ${kotak.map((n,i)=>`<div class="flex-1 text-center">
        <div class="rounded-lg py-2 ${i<2?'bg-rose-100 text-rose-700':i<4?'bg-amber-100 text-amber-700':'bg-emerald-100 text-emerald-700'} font-bold">${n}</div>
        <p class="text-[10px] text-slate-500 mt-1">Kotak ${i+1}</p></div>`).join('')}
    </div>
  </section>

  <section class="card p-4">
    <h3 class="font-bold mb-2">Peta kekuatan per topik</h3>
    ${topik.length? topik.map(o=>`
      <div class="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0">
        <span class="w-1.5 h-8 rounded ${bgAkurasi(o.akur)}"></span>
        <span class="flex-1 min-w-0"><span class="text-sm font-medium block truncate">${esc(o.t)}</span>
          <span class="text-[11px] text-slate-400">${MAPEL[o.m].sing} · ${o.tot} jawaban · level ${levelDari(kemampuanEfektif(o.m,o.t))}</span></span>
        <span class="text-sm font-bold ${warnaAkurasi(o.akur)}">${o.akur}%</span>
        <button onclick="mulaiTopik('${js(o.m)}','${js(o.t)}')" class="btn text-[11px] bg-indigo-50 text-indigo-700 px-2 py-1">Latih</button>
      </div>`).join('') : '<p class="text-xs text-slate-400">Belum ada data. Kerjakan latihan dulu supaya peta kelemahan muncul.</p>'}
  </section>`;
}

/* ---------- RENCANA ---------- */
function viewRencana(){
  const sisa=selisihHari(hariIni(),S.profil.tglTKA), target=targetHarian();
  const lemah=akurasiTopik().sort((a,b)=>a.akur-b.akur);
  const siklus=['bio','mtk','kim','bing','bio','kim','bindo'];
  const rencana=[];
  for(let i=0;i<Math.min(14,Math.max(0,sisa));i++){
    const tgl=tambahHari(hariIni(),i), d=new Date(tgl+'T00:00:00').getDay();
    const m=siklus[d===0?6:d-1];
    const tLemah=lemah.find(o=>o.m===m);
    const semua=Array.from(new Set(BANK().filter(q=>q.m===m).map(q=>q.t)));
    rencana.push({tgl, m, fokus: tLemah?tLemah.t:semua[i%semua.length], menjelang:(sisa-i)<=7});
  }
  const fase = sisa>60?'Fase penguatan konsep':sisa>21?'Fase pendalaman & latihan intensif':sisa>7?'Fase simulasi ujian':'Fase pemantapan akhir';
  const saran = sisa>60?'Kejar cakupan materi: utamakan tombol “Soal baru” agar seluruh topik pernah disentuh.'
    : sisa>21?'Perbanyak mode adaptif dan pengulangan berjarak. Tryout 1× seminggu.'
    : sisa>7?'Tryout 2–3× seminggu dengan timer penuh, sisanya perbaiki topik bocor dari hasil tryout.'
    : 'Kurangi soal baru. Fokus mengulang soal yang pernah salah, tidur cukup, dan jaga kondisi.';
  return `
  <section class="card p-4 mb-3">
    <h2 class="text-lg font-extrabold">Rencana belajar ${esc(namaPanggil())}</h2>
    <p class="text-xs text-slate-500 mt-1">${S.profil.jamBelajar} jam/hari → target <b>${target} soal/hari</b>. Sisa ${sisa>0?sisa:0} hari menuju TKA.</p>
    <div class="mt-3 rounded-xl bg-indigo-600 text-white p-3">
      <p class="text-xs font-bold">${fase}</p><p class="text-xs text-indigo-100 mt-1">${saran}</p>
    </div>
    <div class="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-3">
      <p class="text-xs font-bold text-slate-700 mb-1">Pola harian yang disarankan</p>
      <ol class="text-xs text-slate-600 list-decimal ml-4 space-y-0.5">
        <li>10 menit: ulangi soal jatuh tempo</li>
        <li>40 menit: belajar berkelanjutan pada topik fokus + baca semua pembahasan</li>
        <li>20 menit: kerjakan ulang soal yang tadi salah tanpa melihat pembahasan</li>
        <li>5 menit: tandai sebab kesalahan di jurnal</li>
      </ol>
    </div>
  </section>
  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">14 hari ke depan</h3>
    ${rencana.length? rencana.map((r,i)=>`
      <div class="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0 ${i===0?'bg-indigo-50/50 rounded-xl px-2':''}">
        <div class="text-center w-12 shrink-0">
          <p class="text-[10px] text-slate-400">${['Min','Sen','Sel','Rab','Kam','Jum','Sab'][new Date(r.tgl+'T00:00:00').getDay()]}</p>
          <p class="text-sm font-bold">${new Date(r.tgl+'T00:00:00').getDate()}</p></div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate"><i class="fa-solid ${MAPEL[r.m].ikon} text-${MAPEL[r.m].w}-500 mr-1"></i>${esc(r.fokus)}</p>
          <p class="text-[11px] text-slate-500">${MAPEL[r.m].nama} · ${target} soal${r.menjelang?' · perbanyak tryout':''}</p></div>
        ${i===0?`<button onclick="mulaiTopik('${js(r.m)}','${js(r.fokus)}')" class="btn text-xs bg-indigo-600 text-white px-3 py-2">Mulai</button>`:''}
      </div>`).join('') : '<p class="text-xs text-slate-400">Tanggal ujian sudah lewat atau belum diatur.</p>'}
  </section>
  <section class="card p-4">
    <h3 class="font-bold mb-2">Cara aplikasi ini menyesuaikan diri</h3>
    <ul class="text-xs text-slate-600 space-y-1.5 list-disc ml-4">
      <li><b>Model kemampuan</b> — tiap jawaban memperbarui estimasi kemampuan ARAI per topik, per mata uji, dan keseluruhan.</li>
      <li><b>Kesulitan menyesuaikan</b> — soal dipilih pada peluang benar ±75%: cukup menantang untuk naik, tidak sampai membuat menyerah.</li>
      <li><b>Pengulangan berjarak</b> — yang salah muncul lagi besok, yang sudah dikuasai makin jarang.</li>
      <li><b>Latihan menyebar</b> — topik dicampur supaya otak berlatih memilih strategi, bukan menghafal pola.</li>
      <li><b>Umpan balik langsung</b> — pembahasan dan analisis muncul seketika, termasuk sebab kesalahan.</li>
    </ul>
  </section>`;
}

/* ---------- JURNAL ---------- */
function viewJurnal(){
  const rekap={}; S.jurnal.forEach(j=>rekap[j.sebab]=(rekap[j.sebab]||0)+1);
  const total=S.jurnal.length;
  const dominan=Object.entries(rekap).sort((a,b)=>b[1]-a[1])[0];
  const nasihat = !dominan?'' : dominan[0]==='Konsep belum paham'
    ? 'Penyebab utamanya materi. Sebelum menambah soal baru, baca ulang pembahasan topik terkait lalu kerjakan ulang soal yang sama besok.'
    : dominan[0]==='Salah baca soal' ? 'Penyebab utamanya ketelitian membaca. Biasakan menggarisbawahi kata kunci: kecuali, bukan, paling tepat, urutan.'
    : dominan[0]==='Salah hitung / teledor' ? 'Materi sudah paham, eksekusinya yang bocor. Tulis langkah hitung, jangan lompat di kepala.'
    : dominan[0]==='Kehabisan waktu' ? 'Latih strategi waktu: lewati soal yang macet lebih dari 2 menit, kembali di akhir.'
    : 'Terlalu sering menebak berarti materi belum dikuasai. Pakai mode “Pernah salah” dan baca pembahasan sampai paham.';
  return `
  <section class="card p-4 mb-3">
    <h2 class="text-lg font-extrabold">Jurnal kesalahan</h2>
    <p class="text-xs text-slate-500 mt-1">Kesalahan yang dicatat sebabnya jauh lebih jarang terulang.</p>
  </section>
  ${total?`<section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Pola penyebab (${total} catatan)</h3>
    ${Object.entries(rekap).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`
      <div class="mb-2"><div class="flex justify-between text-xs mb-1"><span>${esc(k)}</span><span class="font-semibold">${v} (${persen(v,total)}%)</span></div>
      <div class="h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-indigo-500" style="width:${persen(v,total)}%"></div></div></div>`).join('')}
    <div class="mt-2 rounded-xl bg-amber-50 border border-amber-200 p-3"><p class="text-xs text-amber-900"><i class="fa-solid fa-lightbulb mr-1"></i>${nasihat}</p></div>
  </section>`:''}
  <section class="card p-4">
    <h3 class="font-bold mb-2">Catatan terakhir</h3>
    ${S.jurnal.length? S.jurnal.slice(0,30).map(j=>{ const q=soalById(j.qid);
      return `<div class="border-b border-slate-100 py-2 last:border-0">
        <p class="text-[11px] text-slate-400">${fmtTgl(j.tgl)} · ${q?MAPEL[q.m].sing+' · '+esc(q.t):'-'}</p>
        <p class="text-sm">${q?esc(q.q.slice(0,110))+(q.q.length>110?'…':''):'(soal tidak ditemukan)'}</p>
        <span class="inline-block text-[11px] bg-rose-50 text-rose-700 rounded px-2 py-0.5 mt-1">${esc(j.sebab)}</span></div>`;
    }).join('') : '<p class="text-xs text-slate-400">Belum ada catatan.</p>'}
  </section>`;
}

/* ---------- TARGET KAMPUS & SNBP ---------- */
const MAPEL_RAPOR=['Matematika','Bahasa Indonesia','Bahasa Inggris','Biologi','Kimia','Fisika'];
/* Patokan internal (bukan passing grade resmi — tidak ada yang dipublikasikan negara).
   tka  = target persentase benar pada latihan/tryout aplikasi ini
   rapor= target rata-rata rapor untuk jalur SNBP
   Semua angka bisa diubah sendiri. */
const PTN_FK = [
  {nama:'FK Universitas Indonesia',            sing:'FK UI',      tka:88, rapor:92, ket:'Paling ketat secara nasional'},
  {nama:'FK Universitas Gadjah Mada',          sing:'FK UGM',     tka:87, rapor:91, ket:'Sangat ketat'},
  {nama:'FK Universitas Padjadjaran',          sing:'FK Unpad',   tka:86, rapor:90, ket:'Sangat ketat'},
  {nama:'FK Universitas Airlangga',            sing:'FK Unair',   tka:86, rapor:90, ket:'Sangat ketat'},
  {nama:'FK Universitas Diponegoro',           sing:'FK Undip',   tka:85, rapor:89, ket:'Ketat'},
  {nama:'FK Universitas Brawijaya',            sing:'FK UB',      tka:84, rapor:89, ket:'Ketat'},
  {nama:'FK Universitas Sebelas Maret',        sing:'FK UNS',     tka:83, rapor:88, ket:'Ketat'},
  {nama:'FK Universitas Sumatera Utara',       sing:'FK USU',     tka:82, rapor:87, ket:'Ketat'},
  {nama:'FK Universitas Hasanuddin',           sing:'FK Unhas',   tka:82, rapor:87, ket:'Ketat'},
  {nama:'FK Universitas Andalas',              sing:'FK Unand',   tka:81, rapor:87, ket:'Menengah–ketat'},
  {nama:'FK Universitas Sriwijaya',            sing:'FK Unsri',   tka:81, rapor:87, ket:'Menengah–ketat'},
  {nama:'FK Universitas Jenderal Soedirman',   sing:'FK Unsoed',  tka:81, rapor:87, ket:'Menengah–ketat'},
  {nama:'FK UPN Veteran Jakarta',              sing:'FK UPNVJ',   tka:82, rapor:87, ket:'Ketat'},
  {nama:'FK Universitas Jember',               sing:'FK Unej',    tka:80, rapor:86, ket:'Menengah'},
  {nama:'FK Universitas Syiah Kuala',          sing:'FK USK',     tka:79, rapor:86, ket:'Menengah'},
  {nama:'FK Universitas Lampung',              sing:'FK Unila',   tka:80, rapor:86, ket:'Menengah'},
  {nama:'FK Universitas Riau',                 sing:'FK UNRI',    tka:79, rapor:85, ket:'Menengah'},
  {nama:'FK Universitas Mulawarman',           sing:'FK Unmul',   tka:78, rapor:85, ket:'Menengah'},
  {nama:'FK Universitas Udayana',              sing:'FK Unud',    tka:83, rapor:88, ket:'Ketat'},
  {nama:'FK Universitas Negeri Semarang',      sing:'FK Unnes',   tka:80, rapor:86, ket:'Menengah'}
];
function normalisasiKampus(){
  S.profil.kampus = (S.profil.kampus||[]).map(k=>{
    if(k.targetTKA!=null) return k;
    const ref = PTN_FK.find(p=>p.nama===k.nama);
    return {nama:k.nama, targetTKA: ref?ref.tka:82, targetRapor: ref?ref.rapor:88, utama: !!(k.catatan&&/utama/i.test(k.catatan))};
  });
  if(S.profil.kampus.length && !S.profil.kampus.some(k=>k.utama)) S.profil.kampus[0].utama = true;
}
function rataRapor(m){ const v=(S.rapor[m]||{}); const a=[1,2,3,4,5].map(i=>parseFloat(v['s'+i])).filter(x=>!isNaN(x)); return a.length?a.reduce((x,y)=>x+y,0)/a.length:null; }
function indeksRapor(){
  const nilai=MAPEL_RAPOR.map(rataRapor).filter(x=>x!=null);
  const pend=['Biologi','Kimia'].map(rataRapor).filter(x=>x!=null);
  if(!nilai.length||!pend.length) return null;
  const semua=nilai.reduce((a,b)=>a+b,0)/nilai.length, p=pend.reduce((a,b)=>a+b,0)/pend.length;
  return {semua, pendukung:p, indeks: semua*0.5 + p*0.5};
}
/* laju kenaikan skor per minggu, dari riwayat 14 hari terakhir */
function lajuMingguan(){
  const r=(S.rating.riwayat||[]).filter(x=>selisihHari(x.tgl,hariIni())<=14);
  if(r.length<2) return null;
  const hari=Math.max(1, selisihHari(r[0].tgl, r[r.length-1].tgl));
  return ((r[r.length-1].skor - r[0].skor)/hari)*7;
}
function statusTarget(sekarang, target){
  const gap = target - sekarang;
  if(gap<=0) return {label:'Target tercapai', w:'emerald', gap:0};
  if(gap<=5) return {label:'Tinggal sedikit', w:'sky', gap};
  if(gap<=12) return {label:'Dalam jangkauan', w:'amber', gap};
  return {label:'Perlu kerja keras', w:'rose', gap};
}
function viewTarget(){
  normalisasiKampus();
  const skor=perkiraanSkorTotal(), ir=indeksRapor(), laju=lajuMingguan();
  const utama=S.profil.kampus.find(k=>k.utama)||S.profil.kampus[0];
  const sisaHari=selisihHari(hariIni(),S.profil.tglTKA);
  let ramalan='';
  if(utama){
    const g=utama.targetTKA-skor;
    if(g<=0) ramalan=`Perkiraan skor sudah melampaui patokan ${esc(utama.nama)}. Sekarang tugasnya menjaga konsistensi sampai hari-H.`;
    else if(laju && laju>0.5){
      const minggu=Math.ceil(g/laju);
      const cukup = minggu*7 <= sisaHari;
      ramalan=`Dengan laju sekarang (+${laju.toFixed(1)} poin/minggu), patokan ${esc(utama.nama)} tercapai sekitar <b>${minggu} minggu</b> lagi — ${cukup?'masih muat sebelum TKA':'melewati tanggal TKA, perlu menaikkan porsi latihan'}.`;
    } else ramalan=`Butuh <b>${g} poin</b> lagi menuju patokan ${esc(utama.nama)}. Laju kenaikan belum terbaca — latihan minimal 5 hari berturut supaya trennya terukur.`;
  }
  return `
  <section class="card p-4 mb-3">
    <h2 class="text-lg font-extrabold">Target ${esc(namaPanggil())}</h2>
    <p class="text-xs text-slate-500 mt-1">Patokan tiap FK di bawah ini adalah <b>target internal aplikasi</b>, bukan passing grade resmi — PTN tidak pernah menerbitkan angka resmi. Gunakan sebagai sasaran latihan, dan ubah kalau ARAI punya info lebih akurat.</p>
    <div class="grid grid-cols-2 gap-2 mt-3">
      <div class="rounded-xl bg-indigo-600 text-white p-3"><p class="text-[11px] text-indigo-200 font-semibold uppercase">Skor TKA sekarang</p>
        <p class="text-3xl font-extrabold leading-none">${skor}</p><p class="text-[11px] text-indigo-100 mt-1">level ${levelDari(S.rating.umum)}/10</p></div>
      <div class="rounded-xl bg-emerald-600 text-white p-3"><p class="text-[11px] text-emerald-100 font-semibold uppercase">Indeks rapor</p>
        <p class="text-3xl font-extrabold leading-none">${ir?ir.indeks.toFixed(1):'—'}</p><p class="text-[11px] text-emerald-100 mt-1">${ir?'rapor 50% + Bio/Kim 50%':'isi nilai rapor di bawah'}</p></div>
    </div>
    ${ramalan?`<div class="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-3"><p class="text-xs text-slate-700"><i class="fa-solid fa-route text-indigo-500 mr-1"></i>${ramalan}</p></div>`:''}
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Daftar target</h3>
    ${S.profil.kampus.length? S.profil.kampus.map((k,i)=>{
      const sT=statusTarget(skor,k.targetTKA), sR=ir?statusTarget(ir.indeks,k.targetRapor):null;
      return `<div class="border border-slate-200 rounded-xl p-3 mb-2">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="text-sm font-bold truncate">${esc(k.nama)} ${k.utama?'<span class="text-[10px] bg-indigo-100 text-indigo-700 rounded px-1.5 py-0.5 align-middle">utama</span>':''}</p>
            <p class="text-[11px] text-${sT.w}-600 font-semibold">${sT.label}${sT.gap?` · kurang ${sT.gap} poin TKA`:''}</p>
          </div>
          <div class="flex gap-1 shrink-0">
            ${k.utama?'':`<button onclick="jadikanUtama(${i})" class="text-slate-300 hover:text-indigo-600 px-1" title="Jadikan target utama"><i class="fa-solid fa-star"></i></button>`}
            <button onclick="hapusKampus(${i})" class="text-slate-300 hover:text-rose-500 px-1"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <div class="mt-2">
          <div class="flex justify-between text-[11px] mb-1"><span>Skor TKA</span><span class="font-semibold">${skor} / target ${k.targetTKA}</span></div>
          <div class="h-2 rounded-full bg-slate-100 overflow-hidden relative">
            <div class="h-full ${skor>=k.targetTKA?'bg-emerald-500':'bg-indigo-500'}" style="width:${Math.min(100,persen(skor,k.targetTKA))}%"></div>
          </div>
        </div>
        <div class="mt-2">
          <div class="flex justify-between text-[11px] mb-1"><span>Indeks rapor (SNBP)</span><span class="font-semibold">${ir?ir.indeks.toFixed(1):'—'} / target ${k.targetRapor}</span></div>
          <div class="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div class="h-full ${ir&&ir.indeks>=k.targetRapor?'bg-emerald-500':'bg-emerald-400'}" style="width:${ir?Math.min(100,persen(ir.indeks,k.targetRapor)):0}%"></div>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-2">
          <label class="text-[11px] text-slate-500">Target TKA</label>
          <input type="number" min="50" max="100" value="${k.targetTKA}" onchange="ubahTarget(${i},'targetTKA',this.value)" class="w-16 border border-slate-200 rounded-lg text-center text-xs py-1">
          <label class="text-[11px] text-slate-500">Target rapor</label>
          <input type="number" min="50" max="100" value="${k.targetRapor}" onchange="ubahTarget(${i},'targetRapor',this.value)" class="w-16 border border-slate-200 rounded-lg text-center text-xs py-1">
        </div>
      </div>`;
    }).join('') : '<p class="text-xs text-slate-400 mb-2">Belum ada target. Pilih dari daftar di bawah.</p>'}
    <div class="flex gap-2 mt-2">
      <select id="pilihPTN" class="flex-1 border border-slate-200 rounded-xl px-2 py-2 text-xs">
        <option value="">— pilih FK PTN —</option>
        ${PTN_FK.filter(p=>!S.profil.kampus.some(k=>k.nama===p.nama)).map(p=>`<option value="${esc(p.nama)}">${esc(p.sing)} · patokan TKA ${p.tka} · ${esc(p.ket)}</option>`).join('')}
      </select>
      <button onclick="tambahDariDaftar()" class="btn bg-indigo-600 text-white px-4 text-sm">Tambah</button>
    </div>
    <div class="flex gap-2 mt-2">
      <input id="kampusBaru" placeholder="atau ketik kampus/prodi lain" class="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm">
      <button onclick="tambahKampus()" class="btn bg-slate-100 text-slate-700 px-4 text-sm">Tambah</button>
    </div>
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Peta patokan FK PTN</h3>
    <p class="text-[11px] text-slate-500 mb-2">Garis vertikal = posisi ARAI sekarang (${skor}). Kampus di sebelah kiri garis sudah terlampaui secara latihan.</p>
    <div class="space-y-1.5">
      ${PTN_FK.slice().sort((a,b)=>b.tka-a.tka).map(p=>`
        <div class="flex items-center gap-2">
          <span class="w-20 text-[11px] font-semibold shrink-0 truncate">${esc(p.sing)}</span>
          <div class="flex-1 h-4 bg-slate-100 rounded relative overflow-hidden">
            <div class="absolute inset-y-0 left-0 ${skor>=p.tka?'bg-emerald-200':'bg-slate-200'}" style="width:${p.tka}%"></div>
            <div class="absolute inset-y-0 w-0.5 bg-indigo-600" style="left:${Math.min(100,skor)}%"></div>
            <span class="absolute right-1 top-0 text-[10px] leading-4 text-slate-600">${p.tka}</span>
          </div>
        </div>`).join('')}
    </div>
  </section>

  <section class="card p-4 mb-3 overflow-x-auto">
    <h3 class="font-bold mb-2">Nilai rapor semester 1–5</h3>
    <table class="w-full text-xs">
      <thead><tr class="text-slate-500"><th class="text-left py-1">Mapel</th>${[1,2,3,4,5].map(i=>`<th class="py-1">S${i}</th>`).join('')}<th class="py-1">Rata</th></tr></thead>
      <tbody>${MAPEL_RAPOR.map(m=>`<tr class="border-t border-slate-100">
        <td class="py-1.5 pr-2 font-medium whitespace-nowrap">${m}${['Biologi','Kimia'].includes(m)?' <span class="text-[9px] bg-emerald-100 text-emerald-700 rounded px-1">pendukung</span>':''}</td>
        ${[1,2,3,4,5].map(i=>`<td class="py-1"><input type="number" min="0" max="100" step="0.01" value="${(S.rapor[m]||{})['s'+i]||''}"
          onchange="setRapor('${m}',${i},this.value)" class="w-12 text-center border border-slate-200 rounded-lg py-1"></td>`).join('')}
        <td class="py-1 text-center font-bold">${rataRapor(m)!=null?rataRapor(m).toFixed(1):'-'}</td></tr>`).join('')}
      </tbody></table>
    ${ir?`<p class="text-[11px] text-slate-500 mt-2">Rata-rata semua mapel <b>${ir.semua.toFixed(2)}</b> · Biologi &amp; Kimia <b>${ir.pendukung.toFixed(2)}</b> → indeks <b>${ir.indeks.toFixed(2)}</b>.</p>`:'<p class="text-[11px] text-slate-400 mt-2">Isi minimal satu semester untuk melihat indeks.</p>'}
  </section>

  <section class="card p-4">
    <h3 class="font-bold mb-2 text-sm">Yang perlu dipastikan sendiri</h3>
    <ul class="text-xs text-slate-600 space-y-1.5 list-disc ml-4">
      <li>Tidak ada passing grade resmi. Angka di sini patokan latihan; keketatan sesungguhnya bergantung daya tampung dan jumlah pendaftar tahun berjalan.</li>
      <li>Status <b>eligible</b> SNBP ditentukan sekolah berdasarkan peringkat dan kuota akreditasi — tanyakan posisi peringkat ${esc(namaPanggil())} ke wali kelas/BK.</li>
      <li>Nilai TKA melengkapi penilaian SNBP; pastikan ${esc(namaPanggil())} terdaftar sebagai peserta TKA di sekolah.</li>
      <li>Bobot mapel pendukung berbeda antar-PTN. Cek laman resmi PTN target dan SNPMB sebelum menetapkan pilihan.</li>
      <li>Siapkan jalur SNBT (UTBK) dan mandiri sebagai rencana cadangan sejak sekarang.</li>
    </ul>
  </section>`;
}
function setRapor(m,i,v){ S.rapor[m]=S.rapor[m]||{}; S.rapor[m]['s'+i]=v; simpan(); render(); }
function tambahKampus(){ const el=$('#kampusBaru'); const v=(el.value||'').trim(); if(!v) return;
  S.profil.kampus.push({nama:v, targetTKA:82, targetRapor:88, utama:!S.profil.kampus.length}); simpan(); render(); }
function tambahDariDaftar(){ const v=$('#pilihPTN').value; if(!v) return;
  const p=PTN_FK.find(x=>x.nama===v); if(!p) return;
  S.profil.kampus.push({nama:p.nama, targetTKA:p.tka, targetRapor:p.rapor, utama:!S.profil.kampus.length}); simpan(); render(); }
function hapusKampus(i){ S.profil.kampus.splice(i,1); normalisasiKampus(); simpan(); render(); }
function jadikanUtama(i){ S.profil.kampus.forEach((k,j)=>k.utama=(i===j)); simpan(); render(); }
function ubahTarget(i,k,v){ const n=parseFloat(v); if(isNaN(n)) return; S.profil.kampus[i][k]=Math.max(0,Math.min(100,n)); simpan(); render(); }

/* ---------- MATERI ---------- */
function viewMateri(){
  const q = (location.hash.split('?')[1]||'').replace('m=','');
  const per = {};
  Object.keys(MAT()).forEach(k=>{ const [m,t]=k.split('|'); (per[m]=per[m]||[]).push(t); });
  return `
  <section class="card p-4 mb-3">
    <h2 class="text-lg font-extrabold">Ringkasan materi</h2>
    <p class="text-xs text-slate-500 mt-1">Rangkuman konsep dan rumus kunci tiap topik, plus jebakan yang paling sering bikin salah. Baca sebentar sebelum latihan topik itu.</p>
  </section>
  ${URUT_MAPEL.filter(m=>per[m]).map(m=>`
    <section class="card p-4 mb-3">
      <h3 class="font-bold mb-2"><i class="fa-solid ${MAPEL[m].ikon} text-${MAPEL[m].w}-500 mr-1"></i>${MAPEL[m].nama}</h3>
      ${per[m].sort().map(t=>{
        const a = akurasiTopik().find(o=>o.m===m&&o.t===t);
        return `<details class="border border-slate-200 rounded-xl p-3 mb-2" ${q===m+'|'+t?'open':''}>
          <summary class="text-sm font-semibold cursor-pointer flex items-center justify-between">
            <span>${esc(t)}</span>
            ${a?`<span class="text-[11px] font-bold ${warnaAkurasi(a.akur)}">${a.akur}%</span>`:'<span class="text-[11px] text-slate-300">belum dilatih</span>'}
          </summary>
          <ul class="text-xs text-slate-700 list-disc ml-4 mt-2 space-y-1">${MAT()[m+'|'+t].poin.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
          ${MAT()[m+'|'+t].jebakan?`<p class="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2"><b>Jebakan:</b> ${esc(MAT()[m+'|'+t].jebakan)}</p>`:''}
          <button onclick="mulaiTopik('${js(m)}','${js(t)}')" class="btn text-[11px] bg-indigo-600 text-white px-3 py-1.5 mt-2">Latihan topik ini</button>
        </details>`;
      }).join('')}
    </section>`).join('')}`;
}

/* ---------- SIMULASI HARI-H (5 mata uji penuh) ---------- */
function simulasiAktif(){
  if(!S.simulasi) S.simulasi = {mulai:hariIni(), selesai:{}};
  return S.simulasi;
}
function viewSimulasi(){
  const sim = simulasiAktif();
  const selesai = URUT_MAPEL.filter(m=>sim.selesai[m]);
  const semua = selesai.length===URUT_MAPEL.length;
  const rata = selesai.length? Math.round(selesai.reduce((a,m)=>a+sim.selesai[m].skor,0)/selesai.length) : 0;
  normalisasiKampus();
  const u=S.profil.kampus.find(k=>k.utama)||S.profil.kampus[0];
  return `
  <section class="card p-4 mb-3">
    <h2 class="text-lg font-extrabold">Simulasi hari-H</h2>
    <p class="text-xs text-slate-500 mt-1">Lima mata uji penuh sesuai format TKA 2026. Aturan resminya satu mata uji per hari, jadi boleh dicicil — kemajuannya tersimpan sampai lengkap.</p>
    <div class="mt-3 grid grid-cols-2 gap-2">
      <div class="rounded-xl bg-indigo-600 text-white p-3"><p class="text-[11px] text-indigo-200 font-semibold uppercase">Rata-rata</p>
        <p class="text-3xl font-extrabold leading-none">${rata}</p><p class="text-[11px] text-indigo-100 mt-1">${selesai.length}/5 mata uji</p></div>
      <div class="rounded-xl bg-slate-900 text-white p-3"><p class="text-[11px] text-slate-400 font-semibold uppercase">Mulai</p>
        <p class="text-lg font-extrabold leading-tight mt-1">${fmtTgl(sim.mulai)}</p>
        <p class="text-[11px] text-slate-300">${semua?'lengkap':'sedang berjalan'}</p></div>
    </div>
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Jadwal mata uji</h3>
    ${URUT_MAPEL.map(m=>{
      const h=sim.selesai[m];
      return `<div class="flex items-center gap-3 border border-slate-200 rounded-xl p-3 mb-2">
        <i class="fa-solid ${MAPEL[m].ikon} text-${MAPEL[m].w}-500 text-lg w-6 text-center"></i>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold">${MAPEL[m].nama}</p>
          <p class="text-[11px] text-slate-500">${Math.min(MAPEL[m].soalTO, BANK().filter(q=>q.m===m).length)} soal · ${MAPEL[m].menitTO} menit${h?` · dikerjakan ${fmtTgl(h.tgl)}`:''}</p>
        </div>
        ${h?`<span class="text-xl font-extrabold ${warnaAkurasi(h.skor)}">${h.skor}</span>
             <button onclick="ulangSimulasi('${m}')" class="btn text-[11px] bg-slate-100 text-slate-600 px-2 py-1.5">Ulang</button>`
           :`<button onclick="mulaiSimulasi('${m}')" class="btn text-xs bg-indigo-600 text-white px-3 py-2">Kerjakan</button>`}
      </div>`;
    }).join('')}
  </section>

  ${semua?`<section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Hasil simulasi lengkap</h3>
    <p class="text-sm text-slate-700 mb-2">Rata-rata lima mata uji: <b class="${warnaAkurasi(rata)}">${rata}</b>/100.
      ${u?(rata>=u.targetTKA?`Sudah melampaui patokan ${esc(u.nama)} (${u.targetTKA}).`:`Patokan ${esc(u.nama)} adalah ${u.targetTKA}, kurang ${u.targetTKA-rata} poin.`):''}</p>
    ${URUT_MAPEL.map(m=>{const h=sim.selesai[m];
      return `<div class="mb-2"><div class="flex justify-between text-xs mb-1"><span>${MAPEL[m].nama}</span>
        <span class="font-semibold ${warnaAkurasi(h.skor)}">${h.skor} · ${h.benar}/${h.total} · ${h.menit} menit</span></div>
        <div class="h-2 rounded-full bg-slate-100 overflow-hidden"><div class="h-full ${bgAkurasi(h.skor)}" style="width:${h.skor}%"></div></div></div>`;}).join('')}
    <div class="rounded-xl bg-slate-50 border border-slate-200 p-3 mt-3">
      <p class="text-xs text-slate-700"><i class="fa-solid fa-lightbulb text-amber-500 mr-1"></i>
      ${(function(){ const lemah=URUT_MAPEL.slice().sort((a,b)=>sim.selesai[a].skor-sim.selesai[b].skor)[0];
        return `Mata uji paling perlu digenjot: <b>${MAPEL[lemah].nama}</b> (${sim.selesai[lemah].skor}). Jadikan fokus utama dua minggu ke depan.`; })()}</p>
    </div>
    <div class="grid grid-cols-2 gap-2 mt-3">
      <a href="#/rapor" class="btn bg-slate-100 text-slate-700 py-3 text-sm text-center">Lihat rapor</a>
      <button onclick="simulasiBaru()" class="btn bg-indigo-600 text-white py-3 text-sm">Simulasi baru</button>
    </div>
  </section>`:''}

  ${(S.simulasiRiwayat||[]).length?`<section class="card p-4">
    <h3 class="font-bold mb-2">Riwayat simulasi</h3>
    ${S.simulasiRiwayat.slice().reverse().map(r=>`<div class="flex justify-between items-center border-b border-slate-100 py-2 last:border-0">
      <span class="text-xs text-slate-600">${fmtTgl(r.tgl)}</span>
      <span class="text-sm font-bold ${warnaAkurasi(r.rata)}">${r.rata}</span></div>`).join('')}
  </section>`:''}`;
}
function mulaiSimulasi(m){
  mulaiSesi({mode:'tryout', mapel:m, n:MAPEL[m].soalTO, detik:MAPEL[m].menitTO*60,
             judul:'Simulasi hari-H · '+MAPEL[m].nama, tryout:m, simulasi:m});
}
function ulangSimulasi(m){ if(confirm('Kerjakan ulang '+MAPEL[m].nama+'? Nilai sebelumnya diganti.')){ delete simulasiAktif().selesai[m]; simpan(); mulaiSimulasi(m); } }
function simulasiBaru(){
  const sim=simulasiAktif(); const nilai=URUT_MAPEL.filter(m=>sim.selesai[m]);
  if(nilai.length){ S.simulasiRiwayat=S.simulasiRiwayat||[];
    S.simulasiRiwayat.push({tgl:hariIni(), rata:Math.round(nilai.reduce((a,m)=>a+sim.selesai[m].skor,0)/nilai.length)});
    S.simulasiRiwayat=S.simulasiRiwayat.slice(-20); }
  S.simulasi={mulai:hariIni(), selesai:{}}; simpan(); render();
}

/* ---------- HALAMAN ABI & UMMI ---------- */
function viewOrtu(){
  const r7=ringkasanPeriode(7), r30=ringkasanPeriode(30);
  const hari14=[]; for(let i=13;i>=0;i--){ const t=tambahHari(hariIni(),-i); hari14.push({t,d:S.harian[t]||{soal:0,menit:0}}); }
  const maks=Math.max(10,...hari14.map(h=>h.d.soal));
  normalisasiKampus();
  const u=S.profil.kampus.find(k=>k.utama)||S.profil.kampus[0];
  const nm=namaPanggil();
  return `
  <section class="card p-4 mb-3">
    <h2 class="text-lg font-extrabold">Halaman Abi &amp; Ummi</h2>
    <p class="text-xs text-slate-500 mt-1">Ringkasan perkembangan ${esc(nm)} dan tempat menitipkan pesan untuknya.</p>
  </section>

  <section class="grid grid-cols-2 gap-2 mb-3">
    ${kartuStat('7 hari terakhir', r7.soal+' soal', r7.aktif+' hari aktif · akurasi '+r7.akur+'%','fa-calendar-week','indigo')}
    ${kartuStat('30 hari terakhir', r30.soal+' soal', r30.aktif+' hari aktif · akurasi '+r30.akur+'%','fa-calendar','sky')}
    ${kartuStat('Perkiraan skor TKA', perkiraanSkorTotal(), 'level '+levelDari(S.rating.umum)+'/10','fa-bullseye','emerald')}
    ${kartuStat('Menuju TKA', Math.max(0,selisihHari(hariIni(),S.profil.tglTKA))+' hari', fmtTgl(S.profil.tglTKA),'fa-hourglass-half','amber')}
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Konsistensi 14 hari</h3>
    <div class="flex items-end gap-1 h-20">
      ${hari14.map(h=>`<div class="flex-1 flex flex-col justify-end items-center" title="${h.t}: ${h.d.soal} soal">
        <div class="w-full rounded-t ${h.d.soal>=targetHarian()?'bg-emerald-500':h.d.soal?'bg-amber-400':'bg-slate-100'}" style="height:${Math.max(4,h.d.soal/maks*100)}%"></div></div>`).join('')}
    </div>
    <p class="text-[11px] text-slate-500 mt-2">Hijau = target harian tercapai, kuning = belajar tapi belum penuh, abu = kosong.
      ${r7.aktif>=5?'Ritmenya sudah bagus — cukup dijaga.':'Kalau banyak yang abu, biasanya bukan malas, tapi jadwalnya belum tetap. Sepakati jam belajar yang sama tiap hari.'}</p>
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Per mata uji</h3>
    ${URUT_MAPEL.map(m=>{const a=akurasiMapel(m), sk=perkiraanSkor(m);
      return `<div class="mb-2"><div class="flex justify-between text-xs mb-1">
        <span>${MAPEL[m].nama}</span><span class="${warnaAkurasi(sk)} font-semibold">${sk} · ${a.n} soal</span></div>
        <div class="h-2 rounded-full bg-slate-100 overflow-hidden"><div class="h-full ${bgAkurasi(sk)}" style="width:${sk}%"></div></div></div>`;}).join('')}
    ${u?`<p class="text-xs text-slate-600 mt-2">Target utama <b>${esc(u.nama)}</b> (patokan ${u.targetTKA}) — ${u.targetTKA-perkiraanSkorTotal()<=0?'sudah terlampaui':'kurang '+(u.targetTKA-perkiraanSkorTotal())+' poin'}.</p>`:''}
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Titipkan pesan untuk ${esc(nm)}</h3>
    <p class="text-[11px] text-slate-500 mb-2">Pesan ini muncul di layar ${esc(nm)} tiap 10 soal dan di akhir sesi latihan.</p>
    <div class="flex gap-2 mb-2">
      <button onclick="PENGIRIM='Abi';render()" class="btn text-xs px-4 py-2 ${PENGIRIM==='Abi'?'bg-sky-600 text-white':'bg-slate-100 text-slate-600'}">Dari Abi</button>
      <button onclick="PENGIRIM='Ummi';render()" class="btn text-xs px-4 py-2 ${PENGIRIM==='Ummi'?'bg-rose-600 text-white':'bg-slate-100 text-slate-600'}">Dari Ummi</button>
    </div>
    <textarea id="pesanBaru" class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm h-20" placeholder="Tulis pesan singkat untuk ${esc(nm)}…"></textarea>
    <button onclick="kirimPesan()" class="w-full btn bg-indigo-600 text-white py-2.5 text-sm mt-2"><i class="fa-solid fa-paper-plane mr-1"></i>Simpan pesan</button>
    ${(function(){
      const daftar=[].concat((S.profil.pesanAbi||[]).map(t=>({d:'Abi',t})), (S.profil.pesanUmmi||[]).map(t=>({d:'Ummi',t})));
      return daftar.length? `<div class="mt-3 space-y-1.5">${daftar.map(x=>`
        <div class="flex items-start gap-2 text-xs bg-slate-50 rounded-lg p-2">
          <span class="font-bold text-${x.d==='Abi'?'sky':'rose'}-600 shrink-0">${x.d}</span>
          <span class="flex-1">${esc(x.t)}</span>
          <button onclick="hapusPesan('${x.d}','${js(x.t)}')" class="text-slate-300 hover:text-rose-500"><i class="fa-solid fa-xmark"></i></button>
        </div>`).join('')}</div>` : '<p class="text-[11px] text-slate-400 mt-2">Belum ada pesan tersimpan. Pesan bawaan tetap muncul.</p>';
    })()}
  </section>

  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Cara mendampingi yang membantu</h3>
    <ul class="text-xs text-slate-600 space-y-1.5 list-disc ml-4">
      <li>Tanyakan <b>berapa lama belajar dan topik apa</b>, bukan hanya "dapat nilai berapa". Proses yang konsisten lebih meramalkan hasil.</li>
      <li>Skor harian naik-turun itu normal; yang dilihat adalah tren dua mingguan di halaman Analisis.</li>
      <li>Saat skornya turun setelah masuk topik baru, itu tanda sedang belajar hal sulit — bukan kemunduran.</li>
      <li>Tidur 7–8 jam dan makan teratur berpengaruh besar terhadap ketelitian; banyak kesalahan lahir dari lelah, bukan dari tidak paham.</li>
      <li>Rencanakan jalur cadangan (SNBT dan mandiri) sejak awal supaya tekanannya tidak menumpuk pada satu jalur.</li>
    </ul>
  </section>

  <section class="card p-4">
    <h3 class="font-bold mb-2">Rapor</h3>
    <p class="text-xs text-slate-500 mb-2">Ringkasan lengkap yang bisa disimpan atau dikirim ke keluarga.</p>
    <a href="#/rapor" class="btn bg-indigo-600 text-white py-3 text-sm block text-center">Buka rapor belajar</a>
  </section>`;
}
let PENGIRIM='Ummi';
function kirimPesan(){
  const el=$('#pesanBaru'); const t=(el.value||'').trim(); if(!t) return;
  const kunci = PENGIRIM==='Abi'?'pesanAbi':'pesanUmmi';
  S.profil[kunci]=S.profil[kunci]||[]; S.profil[kunci].push(t); simpan(); render();
  alert('Pesan dari '+PENGIRIM+' tersimpan. Akan muncul saat '+namaPanggil()+' latihan.');
}
function hapusPesan(dari,teks){
  const kunci = dari==='Abi'?'pesanAbi':'pesanUmmi';
  S.profil[kunci]=(S.profil[kunci]||[]).filter(x=>x!==teks); simpan(); render();
}

/* ---------- PAKET TKA 2025 (soal asli tahun lalu) ---------- */
const T25 = () => (window.TKA2025||{});
function jumlahPkt(m,p){ return BANK().filter(q=>q.m===m && q.pkt===p).length; }
function viewTka2025(){
  const mp = (location.hash.split('?')[1]||'').replace('m=','') || 'bio';
  const daftar = (T25()[mp]||[]);
  const ada = Object.keys(T25());
  return `
  <section class="card p-4 mb-3">
    <h2 class="text-lg font-extrabold">Soal asli TKA 2025</h2>
    <p class="text-xs text-slate-500 mt-1">Naskah asli beredar tanpa kunci dan tanpa pembahasan. Di sini tersedia <b>kunci hasil analisis dan pembahasan lengkap</b> tiap nomor, ditambah paket soal tiruan yang bisa dikerjakan langsung.</p>
    <div class="flex gap-2 mt-3 flex-wrap">
      ${URUT_MAPEL.filter(m=>ada.includes(m)).map(m=>`<button onclick="location.hash='#/tka2025?m=${m}'" class="btn text-xs px-3 py-2 ${mp===m?'bg-indigo-600 text-white':'bg-slate-100 text-slate-600'}">${MAPEL[m].sing} (${(T25()[m]||[]).length})</button>`).join('')}
    </div>
    ${ada.includes(mp)?`<div class="grid grid-cols-2 gap-2 mt-3">
      <button onclick="mulaiPaket('${mp}','TKA25')" class="btn bg-violet-600 text-white py-3 text-sm"><i class="fa-solid fa-file-pen mr-1"></i>Kerjakan replika (${jumlahPkt(mp,'TKA25')})</button>
      <button onclick="mulaiPaket('${mp}','TKA25V')" class="btn bg-slate-800 text-white py-3 text-sm"><i class="fa-solid fa-clone mr-1"></i>Soal variasi (${jumlahPkt(mp,'TKA25V')})</button>
    </div>`:''}
  </section>

  <section class="card p-4 mb-3 bg-amber-50 border-amber-200">
    <p class="text-xs text-amber-900"><i class="fa-solid fa-lightbulb mr-1"></i><b>Cara pakai yang paling efektif:</b>
    buka berkas PDF soal aslinya, kerjakan satu mata uji tanpa melihat apa pun, baru cocokkan dengan kunci di bawah dan baca pembahasannya.
    Setelah itu kerjakan paket replika di aplikasi — soalnya berbeda angka dan konteks tetapi menguji konsep yang persis sama, sehingga ketahuan apakah ARAI benar-benar paham atau sekadar ingat jawaban.</p>
  </section>

  <section class="card p-4">
    <h3 class="font-bold mb-2">Kunci &amp; pembahasan · ${MAPEL[mp]?MAPEL[mp].nama:''}</h3>
    ${daftar.length? daftar.map(d=>`
      <details class="border border-slate-200 rounded-xl p-3 mb-2">
        <summary class="text-sm font-semibold cursor-pointer flex items-start gap-2">
          <span class="bg-slate-900 text-white rounded-lg px-2 py-0.5 text-[11px] shrink-0">No ${d.no}</span>
          <span class="flex-1">${esc(d.ringkas)}</span>
        </summary>
        <div class="mt-2 text-[11px] text-slate-500">${esc(d.el)} · ${esc(d.sub)}<br>Indikator: ${esc(d.ind)} · Bentuk: ${d.tipe==='pg'?'pilihan ganda':d.tipe==='bs'?'benar–salah':d.tipe==='jamak'?'pilihan jamak':d.tipe==='sesuai'?'sesuai / tidak sesuai':esc(d.tipe)}</div>
        <p class="text-sm mt-2 bg-emerald-50 border border-emerald-200 rounded-lg p-2"><b class="text-emerald-800">Kunci:</b> ${esc(d.kunci)}</p>
        <p class="text-sm mt-2 text-slate-700 leading-relaxed">${esc(d.pembahasan)}</p>
        <p class="text-xs mt-2 bg-sky-50 border border-sky-200 rounded-lg p-2 text-sky-900"><b>Konsep yang diuji:</b> ${esc(d.konsep)}</p>
        ${d.catatan?`<p class="text-xs mt-2 bg-amber-50 border border-amber-200 rounded-lg p-2 text-amber-900"><b>Catatan:</b> ${esc(d.catatan)}</p>`:''}
        ${(function(){ const r=BANK().find(q=>q.pkt==='TKA25'&&q.m===mp&&q.no===d.no);
          return r?`<button onclick="mulaiSatuSoal('${r.id}')" class="btn text-[11px] bg-indigo-600 text-white px-3 py-1.5 mt-2">Kerjakan soal tiruan nomor ini</button>`:''; })()}
      </details>`).join('') : '<p class="text-xs text-slate-400">Mata uji ini belum tersedia. Kirimkan berkas soalnya untuk ditambahkan.</p>'}
  </section>`;
}
function mulaiPaket(m,pkt){
  const soal = BANK().filter(q=>q.m===m && q.pkt===pkt).sort((a,b)=>a.no-b.no);
  if(!soal.length){ alert('Paket belum tersedia untuk mata uji ini.'); return; }
  SESI = {soal, i:0, jawaban:new Array(soal.length).fill(null), dikunci:new Array(soal.length).fill(false),
          judul:(pkt==='TKA25'?'Replika TKA 2025 · ':'Variasi TKA 2025 · ')+MAPEL[m].nama,
          tryout:null, simulasi:null, tanpaBatas:false, mapel:m, topik:null, mode:'paket',
          sisa:null, mulai:Date.now(), langsung:true, ratingAwal:S.rating.umum, waktuSoal:[]};
  MULAI_SOAL=Date.now(); simpanSesiAktif();
  location.hash='#/kerja'; render();
}
function mulaiSatuSoal(id){
  const q = BANK().find(x=>x.id===id); if(!q) return;
  SESI = {soal:[q], i:0, jawaban:[null], dikunci:[false], judul:q.asal||'Soal tiruan', tryout:null, simulasi:null,
          tanpaBatas:false, mapel:q.m, topik:q.t, mode:'paket', sisa:null, mulai:Date.now(), langsung:true,
          ratingAwal:S.rating.umum, waktuSoal:[]};
  MULAI_SOAL=Date.now(); simpanSesiAktif(); location.hash='#/kerja'; render();
}

/* ---------- RAPOR (bisa dibagikan ke Abi / Ummi) ---------- */
let PERIODE = 7;
function setPeriode(n){ PERIODE=n; render(); }
function ringkasanPeriode(hari){
  const batas = hari? tambahHari(hariIni(), -(hari-1)) : '0000-00-00';
  let soal=0, menit=0, aktif=0, hBenar=0, hTotal=0;
  Object.entries(S.harian).forEach(([t,d])=>{ if(t>=batas){ soal+=d.soal; menit+=d.menit; if(d.soal>0||d.total>0) aktif++;
    hBenar += d.benar||0; hTotal += d.total||0; } });
  const sesi = S.sesi.filter(x=>x.tgl>=batas);
  /* utamakan catatan per jawaban; sesi dipakai bila data harian belum ada (data lama) */
  const benar = hTotal ? hBenar : sesi.reduce((a,b)=>a+b.benar,0);
  const total = hTotal ? hTotal : sesi.reduce((a,b)=>a+b.total,0);
  const tryout = S.tryout.filter(x=>x.tgl>=batas);
  const rh = (S.rating.riwayat||[]).filter(x=>x.tgl>=batas);
  const naik = rh.length>=2 ? rh[rh.length-1].skor - rh[0].skor : null;
  return {soal, menit, aktif, hari:hari||Math.max(1,Object.keys(S.harian).length), benar, total,
          akur:persen(benar,total), tryout, naik, sesi:sesi.length};
}
function catatanRapor(r){
  const nm=namaPanggil(), out=[];
  if(!r.soal) return [`${nm} belum mengerjakan soal pada periode ini. Ajak mulai dari sesi 10 soal supaya kebiasaannya terbentuk lagi.`];
  out.push(`${nm} mengerjakan ${r.soal} soal dalam ${r.menit} menit selama ${r.aktif} hari aktif dari ${r.hari} hari terakhir, dengan akurasi ${r.akur}%.`);
  if(r.aktif >= r.hari*0.7) out.push('Konsistensinya bagus — belajar hampir setiap hari, dan inilah faktor yang paling menentukan hasil akhir.');
  else if(r.aktif >= r.hari*0.4) out.push('Konsistensinya cukup, tetapi masih ada jeda. Sesi pendek 20 menit setiap hari lebih berdampak daripada satu sesi panjang seminggu sekali.');
  else out.push('Frekuensi belajarnya masih jarang. Sebaiknya disepakati jam tetap tiap hari, meski hanya 20 menit.');
  if(r.naik!=null) out.push(r.naik>0 ? `Perkiraan skor TKA naik ${r.naik} poin pada periode ini — arahnya sudah benar.`
    : r.naik===0 ? 'Perkiraan skor stabil pada periode ini; perlu porsi soal baru agar naik lagi.'
    : `Perkiraan skor turun ${Math.abs(r.naik)} poin. Biasanya karena masuk ke topik baru yang belum dikuasai — wajar, asal terus diulang.`);
  const lemah = akurasiTopik().filter(o=>o.tot>=2).sort((a,b)=>a.akur-b.akur).slice(0,2);
  if(lemah.length) out.push('Topik yang paling perlu bantuan: ' + lemah.map(o=>`${o.t} (${MAPEL[o.m].sing}, ${o.akur}%)`).join(' dan ') + '.');
  const jur={}; S.jurnal.forEach(j=>jur[j.sebab]=(jur[j.sebab]||0)+1);
  const dom=Object.entries(jur).sort((a,b)=>b[1]-a[1])[0];
  if(dom) out.push(`Penyebab kesalahan yang paling sering dicatat: ${dom[0].toLowerCase()}.`);
  return out;
}
function teksRapor(){
  const r=ringkasanPeriode(PERIODE), nm=S.profil.nama;
  const per = URUT_MAPEL.map(m=>{ const a=akurasiMapel(m); return `- ${MAPEL[m].nama}: skor ~${perkiraanSkor(m)} (${a.n} soal, akurasi ${a.akur!=null?Math.round(a.akur*100):0}%)`; }).join('\n');
  normalisasiKampus();
  const u=S.profil.kampus.find(k=>k.utama)||S.profil.kampus[0];
  const gap=u?u.targetTKA-perkiraanSkorTotal():null;
  return `RAPOR BELAJAR ${nm.toUpperCase()}
Periode: ${PERIODE?PERIODE+' hari terakhir':'seluruh waktu'} (${fmtTgl(hariIni())})

RINGKASAN
- Soal dikerjakan: ${r.soal}
- Waktu belajar: ${r.menit} menit
- Hari aktif: ${r.aktif} dari ${r.hari} hari
- Akurasi: ${r.akur}%
- Perkiraan skor TKA: ${perkiraanSkorTotal()}/100 (level ${levelDari(S.rating.umum)}/10)${r.naik!=null?`, ${r.naik>=0?'naik':'turun'} ${Math.abs(r.naik)} poin`:''}
- Hari beruntun: ${runtutan()}

PER MATA UJI
${per}

TARGET
${u?`- ${u.nama}: patokan ${u.targetTKA} → ${gap<=0?'sudah terlampaui':'kurang '+gap+' poin'}`:'- Belum ada target kampus'}
- Sisa waktu menuju TKA: ${Math.max(0,selisihHari(hariIni(),S.profil.tglTKA))} hari

CATATAN
${catatanRapor(r).map(x=>'• '+x).join('\n')}

— Dibuat otomatis oleh ARAI Prep`;
}
async function bagikanRapor(){
  const teks=teksRapor();
  if(navigator.share){ try{ await navigator.share({title:'Rapor Belajar '+S.profil.nama, text:teks}); return; }catch(e){} }
  salinRapor();
}
function salinRapor(){
  const teks=teksRapor();
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(teks).then(()=>alert('Rapor disalin. Tinggal tempel di WhatsApp Abi atau Ummi.'),()=>tampilTeksRapor());
  } else tampilTeksRapor();
}
function tampilTeksRapor(){
  const el=document.getElementById('teksRapor'); if(el){ el.classList.remove('hidden'); el.select&&el.select(); }
}
function waRapor(){ window.open('https://wa.me/?text='+encodeURIComponent(teksRapor()), '_blank'); }

function viewRapor(){
  const r=ringkasanPeriode(PERIODE);
  normalisasiKampus();
  const u=S.profil.kampus.find(k=>k.utama)||S.profil.kampus[0];
  const gap=u?u.targetTKA-perkiraanSkorTotal():null;
  const topik=akurasiTopik().filter(o=>o.tot>=2);
  const kuat=topik.slice().sort((a,b)=>b.akur-a.akur).slice(0,3);
  const lemah=topik.slice().sort((a,b)=>a.akur-b.akur).slice(0,3);
  return `
  <section class="card p-4 mb-3 no-print">
    <h2 class="text-lg font-extrabold">Rapor belajar</h2>
    <p class="text-xs text-slate-500 mt-1">Ringkasan perkembangan ${esc(namaPanggil())} yang bisa langsung dikirim ke Abi atau Ummi.</p>
    <div class="flex gap-2 mt-3">
      ${[[7,'7 hari'],[30,'30 hari'],[0,'Semua']].map(([n,l])=>`<button onclick="setPeriode(${n})" class="btn text-xs px-3 py-2 ${PERIODE===n?'bg-indigo-600 text-white':'bg-slate-100 text-slate-600'}">${l}</button>`).join('')}
    </div>
  </section>

  <section class="card p-4 mb-3 print-area">
    <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
      <div><p class="text-[11px] text-slate-500">Rapor Belajar</p>
        <h3 class="font-extrabold">${esc(S.profil.nama)}</h3></div>
      <div class="text-right"><p class="text-[11px] text-slate-500">${PERIODE?PERIODE+' hari terakhir':'seluruh waktu'}</p>
        <p class="text-[11px] text-slate-500">${fmtTgl(hariIni())}</p></div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="rounded-xl bg-indigo-50 p-3"><p class="text-[11px] text-indigo-700 font-semibold">Perkiraan skor TKA</p>
        <p class="text-3xl font-extrabold text-indigo-700">${perkiraanSkorTotal()}<span class="text-sm">/100</span></p>
        <p class="text-[11px] text-indigo-600">level ${levelDari(S.rating.umum)}/10${r.naik!=null?` · ${r.naik>=0?'+':''}${r.naik} poin`:''}</p></div>
      <div class="rounded-xl bg-emerald-50 p-3"><p class="text-[11px] text-emerald-700 font-semibold">Akurasi periode ini</p>
        <p class="text-3xl font-extrabold text-emerald-700">${r.akur}<span class="text-sm">%</span></p>
        <p class="text-[11px] text-emerald-600">${r.benar} benar / ${r.total} soal</p></div>
    </div>
    <div class="grid grid-cols-3 gap-2 mt-2 text-center">
      <div class="bg-slate-50 rounded-xl py-2"><p class="text-lg font-extrabold">${r.soal}</p><p class="text-[10px] text-slate-500">soal</p></div>
      <div class="bg-slate-50 rounded-xl py-2"><p class="text-lg font-extrabold">${r.menit}</p><p class="text-[10px] text-slate-500">menit</p></div>
      <div class="bg-slate-50 rounded-xl py-2"><p class="text-lg font-extrabold">${r.aktif}/${r.hari}</p><p class="text-[10px] text-slate-500">hari aktif</p></div>
    </div>

    <h4 class="font-bold text-sm mt-4 mb-1">Per mata uji</h4>
    <table class="w-full text-xs">
      <thead><tr class="text-slate-500 text-left"><th class="py-1">Mata uji</th><th>Soal</th><th>Akurasi</th><th>Skor</th></tr></thead>
      <tbody>${URUT_MAPEL.map(m=>{const a=akurasiMapel(m); const sk=perkiraanSkor(m);
        return `<tr class="border-t border-slate-100"><td class="py-1.5">${MAPEL[m].nama}</td><td>${a.n}</td>
          <td class="${a.akur!=null?warnaAkurasi(Math.round(a.akur*100)):''}">${a.akur!=null?Math.round(a.akur*100)+'%':'-'}</td>
          <td class="font-bold ${warnaAkurasi(sk)}">${sk}</td></tr>`;}).join('')}</tbody>
    </table>

    ${kuat.length?`<h4 class="font-bold text-sm mt-4 mb-1">Sudah kuat</h4>
      <p class="text-xs text-slate-600">${kuat.map(o=>esc(o.t)+' ('+o.akur+'%)').join(' · ')}</p>`:''}
    ${lemah.length?`<h4 class="font-bold text-sm mt-3 mb-1">Perlu bantuan</h4>
      <p class="text-xs text-slate-600">${lemah.map(o=>esc(o.t)+' ('+o.akur+'%)').join(' · ')}</p>`:''}

    ${u?`<h4 class="font-bold text-sm mt-4 mb-1">Target</h4>
      <p class="text-xs text-slate-600">${esc(u.nama)} — patokan ${u.targetTKA}. ${gap<=0?'<b>Sudah terlampaui.</b>':'Kurang <b>'+gap+' poin</b>.'}
      Sisa ${Math.max(0,selisihHari(hariIni(),S.profil.tglTKA))} hari menuju TKA.</p>`:''}

    <h4 class="font-bold text-sm mt-4 mb-1">Catatan</h4>
    <ul class="text-xs text-slate-600 list-disc ml-4 space-y-1">${catatanRapor(r).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
    ${kartuPesan(r.akur>=80?'bagus':r.akur&&r.akur<60?'kurang':'umum')}
  </section>

  <section class="card p-4 no-print">
    <h3 class="font-bold mb-2">Bagikan</h3>
    <div class="grid grid-cols-2 gap-2">
      <button onclick="bagikanRapor()" class="btn bg-indigo-600 text-white py-3 text-sm"><i class="fa-solid fa-share-nodes mr-1"></i>Bagikan</button>
      <button onclick="waRapor()" class="btn bg-emerald-600 text-white py-3 text-sm"><i class="fa-brands fa-whatsapp mr-1"></i>WhatsApp</button>
      <button onclick="salinRapor()" class="btn bg-slate-100 text-slate-700 py-3 text-sm"><i class="fa-solid fa-copy mr-1"></i>Salin teks</button>
      <button onclick="window.print()" class="btn bg-slate-100 text-slate-700 py-3 text-sm"><i class="fa-solid fa-print mr-1"></i>Cetak / PDF</button>
    </div>
    <textarea id="teksRapor" readonly class="hidden w-full mt-3 border border-slate-200 rounded-xl p-2 text-[11px] h-48">${esc(teksRapor())}</textarea>
  </section>`;
}

/* ---------- PENGATURAN ---------- */
function viewPengaturan(){
  return `
  <section class="card p-4 mb-3">
    <h2 class="text-lg font-extrabold mb-3">Pengaturan</h2>
    <label class="block text-xs font-semibold text-slate-600 mb-1">Nama</label>
    <input value="${esc(S.profil.nama)}" onchange="S.profil.nama=this.value;simpan()" class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm mb-3">
    <label class="block text-xs font-semibold text-slate-600 mb-1">Tanggal TKA</label>
    <input type="date" value="${S.profil.tglTKA}" onchange="S.profil.tglTKA=this.value;simpan();render()" class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm mb-3">
    <label class="block text-xs font-semibold text-slate-600 mb-1">Perkiraan pendaftaran SNBP</label>
    <input type="date" value="${S.profil.tglSNBP}" onchange="S.profil.tglSNBP=this.value;simpan();render()" class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm mb-3">
    <label class="block text-xs font-semibold text-slate-600 mb-1">Jam belajar per hari: <span id="jamLabel">${S.profil.jamBelajar}</span> jam</label>
    <input type="range" min="0.5" max="6" step="0.5" value="${S.profil.jamBelajar}"
      oninput="document.getElementById('jamLabel').textContent=this.value"
      onchange="S.profil.jamBelajar=parseFloat(this.value);simpan();render()" class="w-full mb-1">
    <p class="text-[11px] text-slate-500">Target otomatis: ${targetHarian()} soal/hari.</p>
  </section>
  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Pesan dari Abi &amp; Ummi</h3>
    <p class="text-xs text-slate-500 mb-2">Pesan ini muncul saat ${esc(namaPanggil())} menyelesaikan sesi dan tiap 10 soal. Tulis satu pesan per baris; pesan bawaan tetap ikut tampil.</p>
    <label class="block text-xs font-semibold text-sky-700 mb-1">Pesan Abi</label>
    <textarea onchange="S.profil.pesanAbi=this.value.split('\n').map(x=>x.trim()).filter(Boolean);simpan()"
      class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm mb-3 h-24" placeholder="Contoh: Abi doakan kamu selalu, Nak.">${esc((S.profil.pesanAbi||[]).join('\n'))}</textarea>
    <label class="block text-xs font-semibold text-rose-700 mb-1">Pesan Ummi</label>
    <textarea onchange="S.profil.pesanUmmi=this.value.split('\n').map(x=>x.trim()).filter(Boolean);simpan()"
      class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm h-24" placeholder="Contoh: Jangan lupa makan ya sayang.">${esc((S.profil.pesanUmmi||[]).join('\n'))}</textarea>
  </section>
  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Kalibrasi ulang kemampuan</h3>
    <p class="text-xs text-slate-500 mb-3">Estimasi kemampuan sekarang: <b>${S.rating.umum}</b> (level ${levelDari(S.rating.umum)}/10, ${labelLevel(S.rating.umum)}).
      Kalau merasa penilaiannya meleset jauh, setel ulang tanpa menghapus riwayat latihan.</p>
    <button onclick="resetRating()" class="w-full btn bg-slate-100 text-slate-700 py-2.5 text-sm">Setel ulang estimasi kemampuan</button>
  </section>
  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Cadangkan data</h3>
    <p class="text-xs text-slate-500 mb-3">Progres tersimpan di browser perangkat ini. Kalau ganti HP atau data browser dihapus, progres hilang. Ekspor berkala ya.</p>
    <div class="grid grid-cols-2 gap-2">
      <button onclick="ekspor()" class="btn bg-slate-900 text-white py-3 text-sm"><i class="fa-solid fa-download mr-1"></i>Ekspor</button>
      <label class="btn bg-slate-100 text-slate-700 py-3 text-sm text-center cursor-pointer"><i class="fa-solid fa-upload mr-1"></i>Impor
        <input type="file" accept="application/json" class="hidden" onchange="impor(this)"></label>
    </div>
    <button onclick="paksaMuatUlang()" class="w-full btn bg-slate-100 text-slate-700 py-3 text-sm mt-2"><i class="fa-solid fa-rotate mr-1"></i>Bersihkan cache &amp; muat ulang</button>
    <button onclick="resetData()" class="w-full btn bg-rose-50 text-rose-600 py-3 text-sm mt-2"><i class="fa-solid fa-trash mr-1"></i>Hapus semua data</button>
  </section>
  <section class="card p-4 mb-3">
    <h3 class="font-bold mb-2">Status aplikasi</h3>
    <div class="text-xs text-slate-600 space-y-1">
      <div class="flex justify-between"><span>Versi</span><b>${esc(window.APP_VERSI||'-')}</b></div>
      <div class="flex justify-between"><span>Bank soal termuat</span><b>${BANK().length} butir</b></div>
      <div class="flex justify-between"><span>Kartu materi</span><b>${Object.keys(MAT()).length}</b></div>
      <div class="flex justify-between"><span>Pembahasan TKA 2025</span><b>${Object.values(T25()).reduce((a,b)=>a+b.length,0)} nomor</b></div>
      <div class="flex justify-between"><span>Mode offline</span><b>${('serviceWorker' in navigator)?'aktif':'tidak didukung'}</b></div>
    </div>
    <p class="text-[11px] text-slate-400 mt-2">Kalau angka bank soal di bawah 360, versi yang terbuka masih versi lama — ketuk "Bersihkan cache &amp; muat ulang" di atas.</p>
  </section>
  <section class="card p-4">
    <h3 class="font-bold mb-2 text-sm">Tentang</h3>
    <p class="text-xs text-slate-600 leading-relaxed">ARAI Prep: latihan mandiri TKA dan seleksi Fakultas Kedokteran, adaptif terhadap kemampuan penggunanya.
      Berjalan penuh di perangkat, bisa dipasang ke layar utama, dan tetap jalan tanpa internet. Tidak ada data yang dikirim ke mana pun.
      Bank soal: <b>${BANK().length} soal</b> berpembahasan (${URUT_MAPEL.map(m=>MAPEL[m].sing+' '+BANK().filter(q=>q.m===m).length).join(', ')}).</p>
  </section>`;
}
function resetRating(){
  if(!confirm('Setel ulang estimasi kemampuan ke titik awal? Riwayat latihan tetap tersimpan.')) return;
  S.rating={umum:RATING_AWAL, mapel:{}, topik:{}, riwayat:S.rating.riwayat||[]}; S.kesulitan={}; simpan(); render();
}
function ekspor(){
  const blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='arai-prep-'+hariIni()+'.json'; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),2000);
}
function impor(input){
  const f=input.files[0]; if(!f) return;
  const fr=new FileReader();
  fr.onload=e=>{ try{ const d=JSON.parse(e.target.result); if(!d.stat) throw new Error('format');
      S=Object.assign(defaultState(),d); S.rating=Object.assign({umum:RATING_AWAL,mapel:{},topik:{},riwayat:[]},d.rating||{});
      simpan(); alert('Data berhasil dipulihkan.'); render();
    }catch(err){ alert('Berkas tidak dikenali.'); } };
  fr.readAsText(f);
}
function resetData(){
  if(!confirm('Hapus seluruh progres, statistik, dan nilai rapor? Tindakan ini tidak bisa dibatalkan.')) return;
  S=defaultState(); simpan(); location.hash='#/beranda'; render();
}

/* ---------- Mulai ---------- */
window.addEventListener('beforeunload', ()=>{ if(SESI) simpanSesiAktif(); });
if('serviceWorker' in navigator){ window.addEventListener('load', ()=>navigator.serviceWorker.register('sw.js?v=5').catch(()=>{})); }
if(!location.hash) location.hash='#/beranda';
render();
