/* Ringkasan materi & rumus kunci per topik.
   Kunci = "kodeMapel|namaTopik" persis seperti pada bank soal. */
window.MATERI = {
'bio|Sel & Transpor':{poin:[
 'Transpor pasif (tanpa energi): difusi, difusi terfasilitasi, osmosis. Selalu mengikuti gradien konsentrasi.',
 'Transpor aktif melawan gradien: primer (langsung pakai ATP, contoh pompa Na⁺/K⁺ 3 keluar : 2 masuk) dan sekunder (menumpang gradien ion).',
 'Larutan hipertonis → air keluar sel (hewan: krenasi, tumbuhan: plasmolisis). Hipotonis → air masuk (hewan: hemolisis, tumbuhan: turgid).',
 'Endositosis (fagositosis/pinositosis) & eksositosis untuk partikel besar.'],
 jebakan:'Yang berpindah pada osmosis adalah AIR, bukan zat terlarut. Dinding sel tumbuhan tidak ikut mengerut saat plasmolisis.'},
'bio|Metabolisme & Enzim':{poin:[
 'Enzim = protein biokatalis: menurunkan energi aktivasi, tidak mengubah ΔH, bekerja spesifik, dapat dipakai berulang.',
 'Dipengaruhi suhu (optimum ±37 °C pada manusia), pH, konsentrasi substrat/enzim, inhibitor.',
 'Inhibitor kompetitif menempel di sisi aktif (bisa dikalahkan dengan menambah substrat); nonkompetitif di sisi alosterik.',
 'Respirasi aerob: glikolisis (sitoplasma, net 2 ATP + 2 NADH) → dekarboksilasi oksidatif → siklus Krebs (matriks mitokondria) → transpor elektron (krista, ±34 ATP). Total ±36–38 ATP.',
 'Fermentasi hanya 2 ATP; laktat pada otot, etanol + CO₂ pada ragi.'],
 jebakan:'Denaturasi enzim karena suhu tinggi bersifat permanen; enzim tidak "mati" karena habis dipakai.'},
'bio|Genetika':{poin:[
 'Monohibrid F2 = 3:1; dihibrid F2 = 9:3:3:1; testcross untuk menguji genotipe.',
 'Penyimpangan semu: epistasis-hipostasis 12:3:1, komplementer 9:7, kriptomeri 9:3:4, polimeri 15:1, atavisme 9:3:3:1 (bentuk jengger).',
 'Golongan darah ABO: alel ganda I^A, I^B, I^O. Rhesus: Rh⁺ dominan.',
 'Pautan seks pada kromosom X: buta warna & hemofilia. Anak laki-laki hanya menerima X dari ibu.',
 'Hardy-Weinberg: p + q = 1 dan p² + 2pq + q² = 1.'],
 jebakan:'Ayah buta warna tidak menurunkan buta warna ke anak laki-lakinya (ayah memberi Y), tetapi semua anak perempuannya menjadi pembawa.'},
'bio|Materi Genetik':{poin:[
 'DNA: gula deoksiribosa, basa A-T dan G-C, rantai ganda. RNA: ribosa, A-U dan G-C, rantai tunggal.',
 'Replikasi semikonservatif; transkripsi DNA→mRNA di inti; translasi di ribosom.',
 'Kodon start AUG (metionin); kodon stop UAA, UAG, UGA. mRNA komplementer dan antiparalel terhadap rantai template.',
 'Mitosis: 2 sel anak diploid identik. Meiosis: 4 sel haploid, ada pindah silang di profase I.'],
 jebakan:'Rantai sense/template dibaca 3’→5’, mRNA dibentuk 5’→3’. Ganti T dengan U saat menulis mRNA.'},
'bio|Sistem Pencernaan':{poin:[
 'Mulut: amilase (ptialin) → amilum jadi maltosa. Lambung: HCl + pepsin (protein → pepton), renin pada bayi.',
 'Usus halus: tripsin, lipase, amilase pankreas; empedu dari hati mengemulsi lemak.',
 'Penyerapan di jejunum-ileum lewat vili; lemak lewat pembuluh kil (limfe), glukosa & asam amino lewat kapiler darah.',
 'Usus besar: penyerapan air dan pembusukan oleh E. coli.'],
 jebakan:'Empedu BUKAN enzim. Gangguan empedu mengganggu penyerapan lemak dan vitamin A, D, E, K.'},
'bio|Sistem Sirkulasi':{poin:[
 'Peredaran kecil: ventrikel kanan → arteri pulmonalis → paru → vena pulmonalis → atrium kiri.',
 'Peredaran besar: ventrikel kiri → aorta → tubuh → vena kava → atrium kanan.',
 'Golongan darah: A punya anti-B, B punya anti-A, AB tanpa antibodi (resipien universal), O tanpa antigen (donor universal).',
 'Pembekuan darah: trombosit pecah → tromboplastin → protrombin jadi trombin (butuh Ca²⁺ & vit. K) → fibrinogen jadi fibrin.'],
 jebakan:'Arteri pulmonalis satu-satunya arteri berisi darah miskin oksigen; vena pulmonalis satu-satunya vena kaya oksigen.'},
'bio|Sistem Pernapasan':{poin:[
 'Inspirasi = kontraksi diafragma & otot antariga luar (aktif); ekspirasi biasa bersifat pasif.',
 'Volume tidal ±500 mL; kapasitas vital = tidal + cadangan inspirasi + cadangan ekspirasi; volume residu tidak dapat dikeluarkan.',
 'O₂ diangkut hemoglobin (oksihemoglobin); CO₂ 70% sebagai HCO₃⁻, 23% karbaminohemoglobin, 7% larut plasma.',
 'Pusat napas di medula oblongata, dipicu terutama oleh kadar CO₂/H⁺, bukan O₂.'],
 jebakan:'Kapasitas total paru = kapasitas vital + volume residu. Hiperventilasi menurunkan CO₂ → alkalosis.'},
'bio|Sistem Ekskresi':{poin:[
 'Tahap pembentukan urine: filtrasi (glomerulus → urine primer), reabsorpsi (tubulus proksimal → urine sekunder), augmentasi (tubulus distal → urine sesungguhnya).',
 'ADH menaikkan reabsorpsi air; aldosteron menaikkan reabsorpsi Na⁺.',
 'Hati mengekskresi bilirubin & urea; kulit mengekskresi keringat; paru mengeluarkan CO₂ dan uap air.'],
 jebakan:'Protein/glukosa dalam urine menandai gangguan filtrasi (glomerulus) atau reabsorpsi (tubulus proksimal), bukan augmentasi.'},
'bio|Sistem Saraf & Hormon':{poin:[
 'Serebrum: berpikir & kesadaran; serebelum: keseimbangan & koordinasi; medula oblongata: napas, denyut jantung; hipotalamus: suhu, lapar, haus, hormon.',
 'Gerak sadar: reseptor → saraf sensorik → otak → saraf motorik → efektor. Gerak refleks memotong jalur lewat sumsum tulang belakang.',
 'Insulin menurunkan gula darah; glukagon & adrenalin menaikkan. Tiroksin mengatur metabolisme.'],
 jebakan:'Simpatis mempercepat kerja jantung dan memperlambat pencernaan; parasimpatis kebalikannya.'},
'bio|Imunitas':{poin:[
 'Nonspesifik: kulit, mukosa, fagosit, inflamasi. Spesifik: limfosit B (antibodi/humoral) dan limfosit T (seluler).',
 'Aktif alami = sembuh dari penyakit; aktif buatan = vaksin; pasif alami = ASI/plasenta; pasif buatan = serum antibodi.',
 'Respons sekunder lebih cepat & kuat karena sel memori; dasar pemberian booster.'],
 jebakan:'Vaksin memicu tubuh membuat antibodi sendiri (aktif); serum berisi antibodi jadi (pasif, perlindungan singkat).'},
'bio|Reproduksi':{poin:[
 'Siklus menstruasi: fase menstruasi → folikel (FSH, estrogen naik) → ovulasi (lonjakan LH ±hari 14) → luteal (progesteron).',
 'Fertilisasi di tuba falopi (ampula); implantasi di endometrium ±hari ke-6–7.',
 'Spermatogenesis menghasilkan 4 sperma fungsional; oogenesis 1 ovum + 3 badan polar.'],
 jebakan:'FSH menumbuhkan folikel, LH memicu ovulasi, estrogen menebalkan endometrium, progesteron mempertahankannya.'},
'bio|Bioteknologi':{poin:[
 'Konvensional: fermentasi (tempe, yoghurt, kecap). Modern: DNA rekombinan, kultur jaringan, kloning, hibridoma, PCR.',
 'Insulin manusia dibuat dengan menyisipkan gen insulin ke plasmid bakteri (enzim restriksi + ligase).',
 'PCR menggandakan DNA (denaturasi 95 °C → annealing 55 °C → ekstensi 72 °C); elektroforesis memisahkan fragmen berdasarkan ukuran.'],
 jebakan:'Antibodi monoklonal dari teknik hibridoma (sel B + sel mieloma), bukan dari plasmid.'},
'bio|Jaringan':{poin:[
 'Epitel pipih selapis untuk difusi (alveolus, kapiler); silindris bersilia di saluran napas; transisional di kandung kemih.',
 'Jaringan ikat: longgar, padat, tulang, darah, lemak. Otot: lurik (sadar), polos (tak sadar), jantung (tak sadar, bercabang, berinti satu di tengah).',
 'Tumbuhan: epidermis, parenkim, kolenkim, sklerenkim, xilem (air), floem (hasil fotosintesis), kambium (pertumbuhan sekunder).'],
 jebakan:'Otot jantung punya ciri lurik tetapi bekerja di luar kesadaran.'},
'bio|Evolusi':{poin:[
 'Darwin: variasi sudah ada, lingkungan menyeleksi yang paling sesuai. Lamarck: sifat yang diperoleh diwariskan (ditolak).',
 'Bukti: fosil, homologi (asal sama fungsi beda), analogi (fungsi sama asal beda), embriologi, biokimia.',
 'Frekuensi alel berubah karena seleksi alam, mutasi, migrasi, hanyutan genetik, dan perkawinan tak acak.'],
 jebakan:'Antibiotik/pestisida tidak "menyebabkan" kekebalan; keduanya hanya menyeleksi individu yang sudah resisten.'},
'bio|Ekologi':{poin:[
 'Rantai makanan: produsen → konsumen I → II → III → dekomposer. Energi berkurang ±90% tiap tingkat trofik.',
 'Simbiosis: mutualisme (+/+), komensalisme (+/0), parasitisme (+/−).',
 'Daur biogeokimia: karbon, nitrogen (fiksasi–nitrifikasi–denitrifikasi), air, fosfor.'],
 jebakan:'Hilangnya predator puncak membuat populasi mangsanya melonjak dan produsen tertekan.'},
'bio|Pertumbuhan':{poin:[
 'Auksin: pemanjangan sel, dominansi apikal, menjauhi cahaya. Giberelin: perkecambahan & pemanjangan batang. Sitokinin: pembelahan sel.',
 'Asam absisat: dormansi & menutup stomata. Etilen: pematangan buah.',
 'Faktor luar: cahaya, suhu, air, nutrisi, kelembapan. Etiolasi = tumbuh cepat tapi pucat karena gelap.'],
 jebakan:'Cahaya menghambat auksin, sehingga auksin menumpuk di sisi gelap dan batang membelok ke arah cahaya.'},

'kim|Struktur Atom & SPU':{poin:[
 'Urutan pengisian: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p.',
 'Ion positif melepas elektron dari kulit terluar dulu (4s sebelum 3d).',
 'Periode = jumlah kulit; golongan A = elektron valensi (s + p).',
 'Dalam satu periode ke kanan: jari-jari mengecil, keelektronegatifan & energi ionisasi naik. Dalam satu golongan ke bawah: kebalikannya.'],
 jebakan:'Konfigurasi setengah penuh (d⁵) dan penuh (d¹⁰) lebih stabil: Cr = [Ar]3d⁵4s¹, Cu = [Ar]3d¹⁰4s¹.'},
'kim|Ikatan Kimia':{poin:[
 'Ionik: logam + nonlogam, titik leleh tinggi, menghantar listrik dalam lelehan/larutan.',
 'Kovalen: sesama nonlogam; polar bila beda keelektronegatifan dan bentuk asimetris.',
 'Bentuk molekul (VSEPR): 2 domain linear, 3 segitiga datar, 4 tetrahedral; tiap pasangan elektron bebas memperkecil sudut ikatan.',
 'Gaya antarmolekul: London < dipol-dipol < ikatan hidrogen (H terikat N, O, atau F).'],
 jebakan:'Mendidih memutus gaya antarmolekul, bukan ikatan kovalen di dalam molekul.'},
'kim|Stoikiometri':{poin:[
 'mol = massa/Mr = volume STP/22,4 = jumlah partikel/6,02×10²³ = M × V(L).',
 'Perbandingan koefisien = perbandingan mol. Tentukan pereaksi pembatas dengan membagi mol dengan koefisien.',
 'Kadar unsur = (n × Ar / Mr) × 100%.',
 'Pengenceran: M₁V₁ = M₂V₂. Netralisasi: (M × V × valensi) asam = (M × V × valensi) basa.'],
 jebakan:'H₂SO₄ menyumbang 2 H⁺ dan Ca(OH)₂ menyumbang 2 OH⁻ — valensi wajib dimasukkan.'},
'kim|Termokimia':{poin:[
 'Eksoterm: melepas kalor, ΔH negatif, entalpi produk lebih rendah. Endoterm sebaliknya.',
 'ΔH reaksi = ΣΔHf produk − ΣΔHf reaktan. ΔHf unsur bebas = 0.',
 'Lewat energi ikatan: ΔH = Σ ikatan putus (reaktan) − Σ ikatan terbentuk (produk).',
 'Hukum Hess: ΔH tidak bergantung jalur reaksi.'],
 jebakan:'Perhatikan arah pengurangan: dengan ΔHf pakai produk − reaktan, dengan energi ikatan pakai reaktan − produk.'},
'kim|Laju Reaksi':{poin:[
 'v = k[A]^m[B]^n; orde ditentukan percobaan, bukan koefisien.',
 'Faktor: konsentrasi, luas permukaan, suhu, katalis.',
 'Aturan kelipatan suhu: v₂ = v₁ × n^(ΔT/10) dan t₂ = t₁ ÷ n^(ΔT/10).',
 'Katalis menurunkan energi aktivasi, tidak mengubah ΔH maupun posisi kesetimbangan.'],
 jebakan:'Menaikkan suhu mempercepat reaksi eksoterm maupun endoterm; yang berbeda hanya arah pergeseran kesetimbangannya.'},
'kim|Kesetimbangan':{poin:[
 'Kc = [produk]^koef / [reaktan]^koef (hanya gas dan larutan; padatan & cairan murni tidak ditulis).',
 'Le Chatelier: tambah konsentrasi → bergeser menjauh; tekanan naik → ke jumlah mol gas lebih kecil; suhu naik → ke arah endoterm.',
 'Kp = Kc (RT)^Δn dengan Δn = mol gas produk − mol gas reaktan.'],
 jebakan:'Katalis dan gas inert pada volume tetap tidak menggeser kesetimbangan.'},
'kim|Asam Basa':{poin:[
 'Asam kuat: [H⁺] = M × valensi → pH = −log[H⁺]. Basa kuat: pOH = −log[OH⁻], pH = 14 − pOH.',
 'Asam lemah: [H⁺] = √(Ka × M). Basa lemah: [OH⁻] = √(Kb × M).',
 'Derajat ionisasi α = √(Ka/M).',
 'Indikator: lakmus, fenolftalein (tak berwarna di asam, merah muda di basa), metil jingga.'],
 jebakan:'Asam kuat pekat belum tentu ber-pH sangat rendah bila sangat encer; hitung dulu, jangan menebak dari kata "kuat".'},
'kim|Buffer & Hidrolisis':{poin:[
 'Buffer asam: asam lemah + basa konjugatnya → [H⁺] = Ka × (mol asam / mol garam).',
 'Buffer basa: basa lemah + asam konjugatnya → [OH⁻] = Kb × (mol basa / mol garam).',
 'Bila mol asam = mol garam, maka pH = pKa.',
 'Hidrolisis garam: asam lemah + basa kuat → basa; asam kuat + basa lemah → asam; kuat + kuat → netral.'],
 jebakan:'pH buffer ditentukan RASIO mol, sehingga pengenceran sedikit hampir tidak mengubah pH. Buffer darah: H₂CO₃/HCO₃⁻.'},
'kim|Ksp':{poin:[
 'AB: Ksp = s². A₂B atau AB₂: Ksp = 4s³. A₂B₃: Ksp = 108 s⁵.',
 'Qc > Ksp → mengendap; Qc = Ksp → tepat jenuh; Qc < Ksp → larut.',
 'Ion senama menurunkan kelarutan.'],
 jebakan:'Bandingkan Ksp antarsenyawa hanya bila rumusnya setipe; kalau tidak, hitung dulu kelarutannya.'},
'kim|Redoks & Elektrokimia':{poin:[
 'Oksidasi = naik biloks = melepas elektron (di anode). Reduksi = turun biloks (di katode).',
 'Sel Volta: E°sel = E°katode − E°anode (harus positif agar spontan). Elektron mengalir anode → katode.',
 'Deret Volta: Li K Ba Ca Na Mg Al Mn Zn Cr Fe Ni Sn Pb H Cu Hg Ag Pt Au. Logam kiri mereduksi ion logam di kanannya.',
 'Elektrolisis: hukum Faraday m = (e × i × t)/96500.'],
 jebakan:'Pada sel Volta anode negatif, pada elektrolisis anode positif. Galvanisasi (Zn) melindungi besi meski lapisan tergores.'},
'kim|Sifat Koligatif':{poin:[
 'ΔTb = Kb × m × i; ΔTf = Kf × m × i; π = M R T i.',
 'Faktor van’t Hoff i = 1 + (n−1)α; nonelektrolit i = 1, NaCl i = 2, CaCl₂ i = 3.',
 'Sifat koligatif bergantung JUMLAH partikel, bukan jenisnya.'],
 jebakan:'Molalitas (mol/kg pelarut) berbeda dengan molaritas (mol/L larutan).'},
'kim|Koloid':{poin:[
 'Sifat: efek Tyndall, gerak Brown, adsorpsi, koagulasi, dialisis, elektroforesis.',
 'Pembuatan: kondensasi (reaksi kimia) dan dispersi (mekanik, peptisasi, busur Bredig).',
 'Contoh medis: cuci darah memanfaatkan dialisis; norit menyerap racun lewat adsorpsi.'],
 jebakan:'Ukuran partikel koloid 1–100 nm; larutan sejati lebih kecil, suspensi lebih besar.'},
'kim|Hidrokarbon':{poin:[
 'Alkana C_nH_(2n+2) jenuh; alkena C_nH_2n satu rangkap dua; alkuna C_nH_(2n−2) rangkap tiga.',
 'Tata nama: pilih rantai terpanjang, beri nomor dari ujung terdekat cabang, cabang disusun alfabetis.',
 'Isomer: rangka, posisi, fungsi, geometri (cis-trans pada alkena).'],
 jebakan:'Rantai terpanjang tidak selalu yang tergambar mendatar; telusuri semua arah.'},
'kim|Senyawa Karbon':{poin:[
 'Gugus fungsi: −OH alkohol, −O− eter, −CHO aldehid, −CO− keton, −COOH asam karboksilat, −COO− ester, −NH₂ amina.',
 'Oksidasi alkohol primer → aldehid → asam karboksilat; alkohol sekunder → keton; tersier sulit teroksidasi.',
 'Esterifikasi: asam karboksilat + alkohol ⇌ ester + air (beraroma buah).',
 'Uji: aldehid positif Fehling/Tollens, keton negatif.'],
 jebakan:'Alkohol dan eter berisomer fungsi, begitu pula aldehid dengan keton, dan asam karboksilat dengan ester.'},
'kim|Biomolekul':{poin:[
 'Karbohidrat: monosakarida (glukosa, fruktosa), disakarida (sukrosa, laktosa, maltosa), polisakarida (amilum, glikogen, selulosa).',
 'Protein tersusun dari asam amino berikatan peptida; struktur primer–kuartener; denaturasi oleh panas/asam.',
 'Uji: lugol untuk amilum (biru kehitaman), Benedict/Fehling untuk gula pereduksi (merah bata), Biuret untuk protein (ungu), Xantoproteat untuk protein bercincin benzena (jingga).'],
 jebakan:'Sukrosa BUKAN gula pereduksi sehingga negatif terhadap uji Benedict.'},
'kim|Kimia Unsur':{poin:[
 'Halogen: daya oksidasi F > Cl > Br > I; halogen atas mendesak halogen bawah dari senyawanya.',
 'Alkali & alkali tanah sangat reaktif, uji nyala khas (Na kuning, K ungu, Ca jingga-merah, Sr merah, Ba hijau).',
 'Unsur periode 3: sifat logam berkurang, keasaman oksida bertambah dari Na ke Cl.'],
 jebakan:'Sifat pereduksi halogen justru berlawanan dengan sifat pengoksidasinya: I⁻ pereduksi terkuat.'},

'mtk|Eksponen & Logaritma':{poin:[
 'aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ/aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1; a⁻ⁿ = 1/aⁿ.',
 'ᵃlog(bc) = ᵃlog b + ᵃlog c; ᵃlog(b/c) = ᵃlog b − ᵃlog c; ᵃlog bⁿ = n·ᵃlog b.',
 'Ganti basis: ᵃlog b = (ᶜlog b)/(ᶜlog a). ᵃlog a = 1, ᵃlog 1 = 0.',
 'Persamaan eksponen: samakan basis lalu samakan pangkat.'],
 jebakan:'Syarat logaritma: numerus > 0 dan basis > 0 serta ≠ 1 — sering jadi kunci soal.'},
'mtk|Fungsi Kuadrat':{poin:[
 'Akar: x = (−b ± √D)/2a dengan D = b² − 4ac.',
 'x₁ + x₂ = −b/a; x₁·x₂ = c/a; x₁² + x₂² = (x₁+x₂)² − 2x₁x₂.',
 'D > 0 dua akar berbeda; D = 0 kembar (menyinggung sumbu X); D < 0 tidak punya akar real.',
 'Titik puncak: x = −b/2a, nilai ekstrem y = −D/4a. a > 0 minimum, a < 0 maksimum.'],
 jebakan:'"Definit positif" berarti a > 0 dan D < 0 (grafik selalu di atas sumbu X).'},
'mtk|Barisan & Deret':{poin:[
 'Aritmetika: Un = a + (n−1)b; Sn = n/2 (2a + (n−1)b).',
 'Geometri: Un = a·rⁿ⁻¹; Sn = a(rⁿ−1)/(r−1); S∞ = a/(1−r) untuk |r| < 1.',
 'Suku tengah aritmetika = rata-rata suku pengapitnya.',
 'Pertumbuhan/peluruhan: Mn = M₀(1 ± p)ⁿ; pembelahan sel = M₀ × 2^(t/periode).'],
 jebakan:'Deret tak hingga hanya konvergen bila −1 < r < 1.'},
'mtk|Sistem Persamaan':{poin:[
 'Metode: substitusi, eliminasi, campuran, dan determinan (Cramer).',
 'Soal cerita: definisikan variabel dulu, tulis dua/tiga persamaan, baru selesaikan.',
 'Periksa jawaban dengan memasukkan kembali ke persamaan awal.'],
 jebakan:'Pertanyaan sering meminta kombinasi (misalnya harga 5 barang), bukan nilai satu variabel saja.'},
'mtk|Trigonometri':{poin:[
 'sin 30 = 1/2, sin 45 = ½√2, sin 60 = ½√3; cos kebalikan urutannya; tan 30 = ⅓√3, tan 45 = 1, tan 60 = √3.',
 'Kuadran: I semua +, II sinus +, III tangen +, IV kosinus +.',
 'Aturan sinus: a/sin A = b/sin B = c/sin C. Aturan kosinus: c² = a² + b² − 2ab cos C.',
 'Luas segitiga = ½ ab sin C. Identitas: sin²x + cos²x = 1.'],
 jebakan:'sin(180° − x) = sin x, tetapi cos(180° − x) = −cos x.'},
'mtk|Statistika':{poin:[
 'Mean = Σx/n; median = nilai tengah data terurut; modus = paling sering muncul.',
 'Data berkelompok: median = Tb + ((n/2 − F)/f) × p.',
 'Kuartil Q1, Q2, Q3; jangkauan = maks − min; jangkauan antarkuartil = Q3 − Q1.',
 'Ragam = Σ(x − x̄)²/n; simpangan baku = akar ragam.'],
 jebakan:'Menambah data baru mengubah mean tetapi belum tentu mengubah median atau modus.'},
'mtk|Peluang':{poin:[
 'Permutasi (urutan penting): P(n,r) = n!/(n−r)!. Kombinasi (urutan tidak penting): C(n,r) = n!/(r!(n−r)!).',
 'P(A) = n(A)/n(S); P(A atau B) = P(A) + P(B) − P(A∩B).',
 'Kejadian saling bebas: P(A∩B) = P(A) × P(B). Bersyarat: P(B|A) = P(A∩B)/P(A).',
 'Pengambilan sekaligus = kombinasi; frekuensi harapan = P × banyak percobaan.'],
 jebakan:'Tanpa pengembalian, penyebut berkurang pada pengambilan berikutnya.'},
'mtk|Limit':{poin:[
 'Bentuk 0/0: faktorkan, bagi dengan faktor sekawan, atau pakai L’Hôpital (turunkan pembilang dan penyebut).',
 'Limit tak hingga fungsi rasional: bandingkan derajat pangkat tertinggi.',
 'lim(x→0) sin x/x = 1 dan lim(x→0) tan x/x = 1.'],
 jebakan:'Substitusi langsung dulu; kalau hasilnya bukan bentuk tak tentu, itulah jawabannya.'},
'mtk|Turunan':{poin:[
 'f(x) = axⁿ → f’(x) = anxⁿ⁻¹. Aturan hasil kali: (uv)’ = u’v + uv’. Hasil bagi: (u/v)’ = (u’v − uv’)/v².',
 'Aturan rantai: y = f(g(x)) → y’ = f’(g(x)) · g’(x).',
 'f’(x) = 0 menandai titik stasioner; f’’ > 0 minimum, f’’ < 0 maksimum.',
 'f’ > 0 fungsi naik, f’ < 0 fungsi turun.'],
 jebakan:'Soal optimasi (biaya minimum, luas maksimum) hampir selalu diselesaikan dengan f’(x) = 0.'},
'mtk|Integral':{poin:[
 '∫axⁿ dx = a xⁿ⁺¹/(n+1) + C (n ≠ −1).',
 'Integral tentu: F(b) − F(a). Luas daerah = ∫(atas − bawah) dx.',
 'Substitusi untuk fungsi komposisi; integral parsial ∫u dv = uv − ∫v du.'],
 jebakan:'Jangan lupa +C pada integral tak tentu; pada integral tentu, C saling menghapus.'},
'mtk|Matriks':{poin:[
 'det [[a,b],[c,d]] = ad − bc. Invers = (1/det)[[d,−b],[−c,a]], ada hanya bila det ≠ 0.',
 'Perkalian matriks tidak komutatif: AB ≠ BA.',
 'Ordo hasil kali A(m×n) × B(n×p) adalah m×p.'],
 jebakan:'Sistem persamaan bisa diselesaikan dengan X = A⁻¹B — pastikan urutan perkaliannya benar.'},
'mtk|Program Linear':{poin:[
 'Terjemahkan kendala menjadi pertidaksamaan, gambar daerah penyelesaian, uji titik pojok.',
 'Nilai maksimum/minimum fungsi tujuan selalu berada di titik pojok.',
 'Titik pojok diperoleh dari perpotongan garis kendala.'],
 jebakan:'Perhatikan kendala tersembunyi x ≥ 0 dan y ≥ 0 pada soal cerita.'},
'mtk|Geometri Ruang':{poin:[
 'Kubus rusuk s: diagonal sisi s√2, diagonal ruang s√3, luas permukaan 6s², volume s³.',
 'Balok: diagonal ruang √(p² + l² + t²). Tabung: V = πr²t. Kerucut: V = ⅓πr²t. Bola: V = 4/3 πr³, L = 4πr².',
 'Jarak titik ke garis/bidang dihitung tegak lurus.'],
 jebakan:'Bedakan diagonal sisi dan diagonal ruang — keduanya sering tertukar.'},
'mtk|Vektor':{poin:[
 '|a| = √(x² + y² + z²). a · b = x₁x₂ + y₁y₂ + z₁z₂.',
 'cos θ = (a·b)/(|a||b|). Tegak lurus bila a·b = 0.',
 'Proyeksi skalar a pada b = (a·b)/|b|.'],
 jebakan:'Hasil dot product berupa skalar, bukan vektor.'},
'mtk|Aplikasi Kesehatan':{poin:[
 'Dosis per kali = (dosis per kg × berat badan) ÷ frekuensi pemberian.',
 'IMT = berat (kg) ÷ tinggi (m)². Tetesan infus (makro) = (volume × faktor tetes) ÷ (waktu dalam menit).',
 'Persentase, perbandingan, dan pembacaan grafik sering muncul sebagai soal numerasi berkonteks kesehatan.'],
 jebakan:'Samakan satuan lebih dulu (mg vs g, mL vs L, jam vs menit) sebelum menghitung.'},

'bindo|Ide Pokok':{poin:[
 'Ide pokok ada pada kalimat utama; letaknya di awal (deduktif), akhir (induktif), atau keduanya (campuran).',
 'Kalimat penjelas berisi contoh, data, atau rincian pendukung.',
 'Ide pokok harus mencakup keseluruhan paragraf, bukan satu detail.'],
 jebakan:'Kalimat yang berisi angka atau contoh biasanya kalimat penjelas, bukan ide pokok.'},
'bindo|Simpulan':{poin:[
 'Simpulan = pernyataan umum yang ditarik dari seluruh isi teks, tetap berpijak pada data teks.',
 'Perhatikan konjungsi penanda: jadi, dengan demikian, oleh karena itu, namun.',
 'Hindari simpulan yang melebih-lebihkan (menyembuhkan, selalu, semua, gagal total).'],
 jebakan:'Data yang menunjukkan hubungan belum tentu membuktikan sebab-akibat.'},
'bindo|Fakta & Opini':{poin:[
 'Fakta: dapat diverifikasi, sering memuat angka, waktu, tempat, atau peristiwa nyata.',
 'Opini: penilaian, prediksi, saran. Ditandai kata menurut saya, sebaiknya, mungkin, tampaknya, terlalu, paling.'],
 jebakan:'Kalimat berangka bisa saja opini bila angkanya berupa perkiraan ("sekitar", "diperkirakan").'},
'bindo|Kalimat Efektif':{poin:[
 'Syarat: kesatuan (ada S-P), kehematan, kesejajaran, kelogisan, kepaduan.',
 'Kalimat kehilangan subjek bila diawali kata depan: dalam, bagi, untuk, pada, dari, daripada.',
 'Hindari kemubaziran: para siswa-siswa, saling bantu-membantu, agar supaya, demi untuk.'],
 jebakan:'"Kepada para hadirin sekalian" mengulang makna jamak tiga kali; cukup "Hadirin".'},
'bindo|Ejaan & Tanda Baca':{poin:[
 'Kata depan di/ke ditulis terpisah; awalan di-/ke- ditulis serangkai.',
 'Bentuk terikat ditulis serangkai: antarkota, nonmedis, pascasarjana, subbagian, ekstrakurikuler.',
 'Judul: semua kata berhuruf kapital kecuali kata tugas yang tidak di awal.',
 'Koma dipakai sebelum "dan" pada perincian, sebelum konjungsi tetapi/melainkan, dan setelah keterangan di awal kalimat.'],
 jebakan:'Titik dua tidak dipakai bila perincian merupakan pelengkap langsung predikat.'},
'bindo|Makna Kata':{poin:[
 'Tentukan makna dari konteks kalimat, bukan dari tebakan bunyi kata.',
 'Istilah serapan yang sering muncul: akselerasi (percepatan), katalis (pemicu), implementasi (penerapan), signifikan (berarti), anonim (tanpa nama), prevalensi (angka kejadian).',
 'Ungkapan: rendah hati (tidak sombong) ≠ rendah diri (minder); besar kepala (sombong); buah tangan (oleh-oleh).'],
 jebakan:'Kata yang mirip bunyi belum tentu mirip makna: sanksi/sangsi, bergeming/diam.'},
'bindo|Konjungsi':{poin:[
 'Sebab: karena, sebab. Akibat: sehingga, akibatnya. Pertentangan: tetapi, namun, melainkan.',
 'Tujuan: agar, supaya. Syarat: jika, apabila. Waktu: ketika, setelah, sebelum.',
 '"Namun" dan "Oleh karena itu" berada di awal kalimat, "tetapi" dan "sehingga" di tengah kalimat.'],
 jebakan:'"Melainkan" berpasangan dengan "bukan", "tetapi" berpasangan dengan "tidak".'},
'bindo|Kepaduan Paragraf':{poin:[
 'Paragraf padu bila semua kalimat mendukung satu gagasan utama dan tersusun runtut.',
 'Kalimat sumbang = kalimat yang topiknya menyimpang.',
 'Kalimat rumpang diisi dengan yang menjembatani kalimat sebelum dan sesudahnya.'],
 jebakan:'Kalimat yang benar secara fakta tetap salah bila tidak berhubungan dengan gagasan paragraf.'},
'bindo|Struktur Teks':{poin:[
 'Eksposisi: tesis → argumentasi → reiterasi. Prosedur: tujuan → alat/bahan → langkah.',
 'Laporan observasi: pernyataan umum → deskripsi bagian → deskripsi manfaat.',
 'Negosiasi: orientasi → pengajuan → penawaran → persetujuan. Anekdot: abstraksi → orientasi → krisis → reaksi → koda.',
 'Karya ilmiah: rumusan masalah berbentuk kalimat tanya yang memuat variabel.'],
 jebakan:'Ciri kebahasaan teks prosedur: kalimat imperatif + konjungsi urutan waktu.'},
'bindo|Inferensi':{poin:[
 'Inferensi = simpulan tersirat yang masih didukung data teks.',
 'Cari hubungan sebab-akibat, perbandingan, atau syarat yang dinyatakan teks.',
 'Buang pilihan yang menambah informasi baru atau memakai kata mutlak (semua, selalu, tidak pernah).'],
 jebakan:'Korelasi bukan kausalitas; teks statistik jarang membuktikan penyebab.'},
'bindo|Kata Baku':{poin:[
 'Baku: apotek, izin, praktik, nasihat, jadwal, kuitansi, analisis, objek, risiko, saraf, atlet, cendekiawan, provinsi, teknik, silakan.',
 'Tidak baku: apotik, ijin, praktek, nasehat, jadual, kwitansi, analisa, obyek, resiko, syaraf, atlit, cendikiawan, propinsi, tehnik, silahkan.'],
 jebakan:'Peluluhan me-: sosialisasi → menyosialisasikan, sukses → menyukseskan, tetapi produksi → memproduksi (gugus konsonan tetap).'},

'bing|Main Idea':{poin:[
 'Main idea biasanya ada di kalimat pertama atau terakhir paragraf.',
 'Kalimat pendukung berisi contoh, statistik, atau penjelasan.',
 'Judul terbaik = ringkas, mencakup seluruh isi, tidak terlalu sempit atau luas.'],
 jebakan:'Pilihan yang benar menurut pengetahuan umum tetapi tidak dibahas teks tetap salah.'},
'bing|Inference':{poin:[
 'Cari petunjuk: although, however, despite, since, therefore.',
 'Simpulan harus bisa dilacak ke kalimat tertentu di teks.',
 'Hindari pilihan berlebihan (prove, completely, never, all).'],
 jebakan:'"Suggest/imply" meminta simpulan, bukan pernyataan yang tertulis persis di teks.'},
'bing|Vocabulary in Context':{poin:[
 'Tebak makna dari kalimat sekitarnya, lalu cocokkan dengan pilihan.',
 'Kata bermakna membatasi: curb, restrict, limit, hamper. Bermakna mendorong: boost, foster, spur, enhance.',
 'Kata medis umum: outbreak (wabah), prevalence, symptom, treatment, prescribe, contagious, immunity.'],
 jebakan:'Kata bisa punya banyak arti; pilih yang cocok dengan konteks, bukan arti pertama yang diingat.'},
'bing|Grammar: Tenses':{poin:[
 'Present perfect (has/have + V3) untuk kejadian yang berlanjut sampai kini: for + durasi, since + titik waktu.',
 'Past perfect (had + V3) untuk kejadian yang lebih dulu di antara dua peristiwa lampau.',
 'Past continuous untuk dua aksi lampau yang berlangsung bersamaan (while).'],
 jebakan:'Keterangan waktu adalah kunci: yesterday → simple past; since 2020 → present perfect.'},
'bing|Grammar: Passive':{poin:[
 'Pola: be + V3 (+ by pelaku). Sesuaikan bentuk "be" dengan tense kalimat aktifnya.',
 'Simple present: is/are + V3. Simple past: was/were + V3. Present perfect: has/have been + V3. Modal: modal + be + V3.'],
 jebakan:'Objek kalimat aktif menjadi subjek kalimat pasif; kata kerja wajib bentuk ketiga (V3).'},
'bing|Grammar: Conditional':{poin:[
 'Type 1 (mungkin): If + V1, will + V1. Type 2 (tidak nyata sekarang): If + V2, would + V1.',
 'Type 3 (penyesalan masa lalu): If + had + V3, would have + V3.',
 'Campuran: If + had + V3, would + V1 (akibatnya terasa sekarang).'],
 jebakan:'Setelah "if" tidak dipakai "will"; pada type 2 dipakai "were" untuk semua subjek.'},
'bing|Grammar: Agreement':{poin:[
 '"The number of + plural" memakai verba tunggal; "A number of + plural" memakai verba jamak.',
 'Frasa penyela (with, along with, as well as, together with) tidak mengubah subjek.',
 'Either/neither/each/every + noun tunggal → verba tunggal.'],
 jebakan:'Subjek panjang: cari inti frasanya, abaikan keterangan di antara subjek dan verba.'},
'bing|Grammar: Gerund/Infinitive':{poin:[
 'Diikuti gerund: avoid, enjoy, mind, finish, suggest, consider, practice, admit, deny.',
 'Diikuti to + V1: want, decide, plan, hope, agree, promise, refuse, manage.',
 'Setelah preposisi selalu gerund (interested in learning).'],
 jebakan:'Stop doing (berhenti melakukan) berbeda makna dengan stop to do (berhenti untuk melakukan).'},
'bing|Grammar: Comparison':{poin:[
 'Satu suku kata: -er/-est. Dua suku kata atau lebih: more/most.',
 'Bentuk tak beraturan: good–better–best, bad–worse–worst, far–farther/further.',
 'Pola: as + adjective + as; the + comparative, the + comparative.'],
 jebakan:'Jangan menggandakan bentuk komparatif: "more better" salah.'},
'bing|Grammar: Modals':{poin:[
 'Should = saran; must/have to = keharusan; may/might/could = kemungkinan; can = kemampuan.',
 'Must not = larangan, sedangkan don’t have to = tidak wajib.',
 'Modal selalu diikuti V1 tanpa to.'],
 jebakan:'"Must" untuk kesimpulan yang sangat yakin; "might" untuk kemungkinan kecil.'},
'bing|Grammar: Reported Speech':{poin:[
 'Mundurkan tense: present → past, will → would, can → could, must → had to.',
 'Ubah keterangan: now → then, today → that day, tomorrow → the following day, here → there.',
 'Sesuaikan kata ganti orang.'],
 jebakan:'Bila kalimat pengantar berbentuk present (says), tense tidak perlu dimundurkan.'},
'bing|Text Organization':{poin:[
 'Penanda urutan: first, then, next, after that, finally.',
 'Penambahan: moreover, furthermore, in addition. Pertentangan: however, nevertheless, in contrast.',
 'Sebab-akibat: therefore, thus, consequently, as a result.'],
 jebakan:'Pilih transisi berdasarkan hubungan makna antarkalimat, bukan enak didengar.'},
'bing|Reference':{poin:[
 'Kata ganti merujuk ke nomina terdekat yang sesuai jumlah dan jenisnya.',
 'It/this dapat merujuk pada satu gagasan atau keseluruhan kalimat sebelumnya.',
 'Uji jawaban dengan menyubstitusi kandidat ke dalam kalimat.'],
 jebakan:'They bisa merujuk pada orang maupun benda jamak — periksa kalimat sebelumnya.'},
'bing|Purpose':{poin:[
 'Teks prosedur = memberi instruksi; iklan = membujuk; laporan = memberi informasi; narasi = menghibur.',
 'Pembuka khas: "I am writing to apply…" (surat lamaran), "Dear all, please be informed…" (pengumuman).'],
 jebakan:'Tujuan penulis berbeda dari isi teks; tanyakan "untuk apa teks ini ditulis?".'},
'bing|Grammar: Articles':{poin:[
 'a/an untuk benda tunggal yang belum spesifik; an sebelum bunyi vokal (an hour, a university).',
 'the untuk benda yang sudah diketahui, disebut sebelumnya, atau satu-satunya (the sun, the doctor we met).',
 'Tanpa artikel untuk benda jamak/tak terhitung yang bermakna umum (Doctors work hard).'],
 jebakan:'Yang menentukan a atau an adalah BUNYI awal, bukan hurufnya.'},
'bing|Grammar: Preposition':{poin:[
 'Kolokasi umum: suffer from, depend on, consist of, result in, capable of, responsible for, good at, interested in.',
 'Waktu: in (bulan/tahun), on (hari/tanggal), at (jam).',
 'Tempat: in (ruang/kota), on (permukaan), at (titik/lokasi spesifik).'],
 jebakan:'Preposisi hampir selalu hafalan pasangan kata — catat tiap kali menemukan yang baru.'},
'bing|Detail':{poin:[
 'Baca pertanyaan lebih dulu, lalu pindai (scan) kata kunci di teks.',
 'Jawaban soal detail selalu tersurat; cocokkan dengan kalimat aslinya.',
 'Waspadai pilihan yang benar secara umum tetapi tidak disebut teks.'],
 jebakan:'Perhatikan kata pembatas: only, except, always, never.'}
};
