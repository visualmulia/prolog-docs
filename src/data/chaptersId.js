export const chaptersId = [
  {
    id: 'quickstart',
    number: '01',
    title: 'Pengenalan & Quick Start PWA',
    shortTitle: 'Quick Start & Offline',
    icon: 'Zap',
    badge: 'Dasar',
    summary: 'Filosofi Offline-First, instalasi PWA di HP tanpa App Store, dan izin perangkat GPS & Kamera.',
    content: `
### 1.1 Filosofi "Zero-Reception Ready"
Aplikasi konstruksi konvensional sering gagal di lapangan karena bergantung pada koneksi internet stabil. Di proyek riil, tim lapangan sering bertugas di:
- **Basement galian dalam** yang terkepung dinding beton tebal (*no signal*).
- **Core lift dan shaft mekanikal** di mana gelombang seluler terblokir.
- **Proyek infrastruktur dan remote area** di luar jangkauan BTS seluler.

**PROLOG dibangun dengan arsitektur Local-First (Offline-First):**
- Data tersimpan seketika di memori lokal ponsel Anda melalui database browser terenkripsi (**IndexedDB / Dexie**).
- Foto, koordinat GPS, catatan progres, dan approval tanda tangan **tetap tersimpan 100% aman** meskipun ponsel dalam mode pesawat (*Airplane Mode*).
- Saat ponsel kembali mendapatkan sinyal seluler atau Wi-Fi kantor direksikeet, sistem melakukan **Background Synchronization** otomatis ke cloud database (**Supabase**).

---

### 1.2 Panduan Pemasangan Aplikasi (PWA - Add to Home Screen)
PROLOG adalah **Progressive Web App (PWA)** modern. Anda tidak perlu mengunduh file berat dari Google Play Store atau Apple App Store yang memakan memori ponsel.

#### 📱 Pengguna Android (Google Chrome):
1. Buka peramban Chrome, akses: \`https://prolog.web.id\`.
2. Ketuk ikon **Titik Tiga (⋮)** di pojok kanan atas.
3. Pilih opsi **"Tambahkan ke Layar Utama"** (*Add to Home Screen*) atau **"Instal Aplikasi"**.
4. Ikon **PROLOG** akan muncul di layar ponsel layaknya aplikasi native.

#### 🍏 Pengguna iPhone / iPad (Safari):
1. Buka peramban Safari, akses: \`https://prolog.web.id\`.
2. Ketuk tombol **Bagikan (Share / Kotak dengan panah atas)** di bagian bawah layar.
3. Gulir ke bawah dan ketuk **"Add to Home Screen"** (*Tambah ke Layar Utama*).
4. Ketuk **Add** di pojok kanan atas.

> [!IMPORTANT]
> **Izin Perangkat yang Wajib Diaktifkan:**
> - **Kamera**: Izinkan saat pertama kali membuka fitur foto untuk dokumentasi progres lapangan.
> - **Lokasi (GPS)**: Izinkan *"Saat Aplikasi Digunakan"* agar sistem dapat mencap koordinat lintang/bujur dan nama wilayah proyek secara otomatis pada watermark foto.
`
  },
  {
    id: 'roles',
    number: '02',
    title: 'Struktur Organisasi & Hak Akses Tim',
    shortTitle: 'Workspace & Peran Tim',
    icon: 'Shield',
    badge: 'Keamanan',
    summary: 'Kode Perusahaan (Tenant), PIN keamanan 4-digit, dan matriks kewenangan role lapangan.',
    content: `
### 2.1 Konsep Multi-Tenant (Workspace Perusahaan)
PROLOG menerapkan sistem multi-tenant terisolasi. Setiap kontraktor, konsultan pengawas, atau *builder* memiliki ruang kerja (*workspace*) privat:
1. **Kode Perusahaan (Tenant Code)**: Kode unik alfanumerik (misalnya: \`MMB\`, \`PROLOG\`, \`ADHI\`, \`WIKA\`).
2. **PIN Masuk Keamanan**: PIN 4 digit untuk setiap personel tim guna memverifikasi identitas tanpa perlu mengingat kata sandi email yang rumit di tengah terik matahari lapangan.

---

### 2.2 Matriks Peran & Kewenangan Tim (*Role-Based Access Control*)

| Peran (Role) | Tanggung Jawab Utama | Hak Akses Laporan Harian | Hak Akses Defect / Punchlist | Hak Akses SIKA & BAP |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin / Project Manager (PM)** | Penanggung jawab tertinggi proyek & kualitas deliverable. | Menyetujui (*Approve*), memvalidasi tanda tangan, dan **satu-satunya yang berhak menghapus laporan**. | Menugaskan mandor, verifikasi akhir penutupan defect (*Closed*). | Otorisasi izin SIKA berisiko tinggi dan menyetujui BAP serah terima. |
| **Site Engineer / Pelaksana Lapangan** | Pelaksana teknis operasional harian di lapangan. | Membuat draft, mengedit log tenaga kerja, jepret foto progres ber-watermark. | Membuat temuan defect, menandai pin denah, memverifikasi perbaikan mandor. | Mengajukan permohonan izin kerja SIKA dan verifikasi serah terima parsial. |
| **Quality Control (QC)** | Pengawas kepatuhan spesifikasi dan standar mutu. | Meninjau kepatuhan teknis pada rincian aktivitas. | Menginspeksi temuan defect, memvalidasi Before-After slider. | Memberikan paraf checklist kesiapan area sebelum serah terima. |
| **Mandor / Subkontraktor** | Pemimpin kelompok pekerja spesialis. | Melihat daftar pekerjaan harian yang ditugaskan. | Melihat titik pin defect yang harus diperbaiki, mengunggah foto sesudah (*After*). | Menandatangani penerimaan area kerja pada form BAP. |
`
  },
  {
    id: 'diary',
    number: '03',
    title: 'Laporan Harian Lapangan (Site Diary)',
    shortTitle: 'Laporan Harian (Diary)',
    icon: 'FileText',
    badge: 'Operasional',
    summary: 'Siklus laporan Draft hingga Validasi PM, log tenaga kerja (manpower), dan rincian progres.',
    content: `
### 3.1 Siklus Hidup Laporan Harian
Laporan Harian Lapangan adalah rekaman hukum dan teknis resmi proyek. Alur siklus laporan di PROLOG:

1. **DRAFT (Pelaksana Lapangan)**:
   - Pelaksana mencatat komposisi tukang & mandor harian.
   - Mengisi catatan aktivitas per area kerja dilengkapi foto progres ber-watermark.
   - Status: \`⏳ DRAFT\`. Masih dapat ditambah foto atau diedit sewaktu-waktu.
2. **VALIDASI & REVIEW (Project Manager)**:
   - PM meninjau laporan melalui menu Rekap PDF -> ketuk tombol \`👁️ Validasi\`.
   - PM memeriksa kesesuaian volume pekerjaan dengan jadwal kurva S.
3. **APPROVED & TERKUNCI (Legal Record)**:
   - PM membubuhkan tanda tangan digital di layar sentuh ponsel.
   - Laporan resmi berstatus \`✅ APPROVED\`, nomor seri terbit, dan terkunci dari pengubahan sembarangan.

---

### 3.2 Langkah-Langkah Pengisian di Lapangan:
1. Ketuk tombol \`+ Buat Laporan Baru\` di Beranda.
2. **Kondisi Cuaca**: Pilih cuaca dominan (Cerah, Berawan, Hujan Ringan, Hujan Lebat).
3. **Log Tenaga Kerja**: Masukkan jumlah tukang batu, tukang besi, tukang kayu, pekerja listrik, dan mandor.
4. **Rincian Pekerjaan**: Ketuk \`+ Tambah Aktivitas\`, pilih area pengerjaan, tuliskan rincian progres, dan ambil foto dengan Smart Camera PROLOG.
5. Ketuk \`Simpan Laporan\`. Data langsung tersimpan di HP secara offline!
`
  },
  {
    id: 'camera',
    number: '04',
    title: 'Smart Construction Camera & GPS Watermark',
    shortTitle: 'Smart Camera & Watermark',
    icon: 'Camera',
    badge: 'Kamera',
    summary: 'Fitur Smart Landscape Auto-Rotate, anti-jungkir balik, dan watermark pembuktian hukum.',
    content: `
### 4.1 Standar Foto Format Landscape (16:9)
100% foto dokumentasi pada laporan konstruksi dan ekspor PDF resmi disajikan dalam format **Landscape (Lebar 16:9)** agar bidang kerja terlihat luas dan proporsional.

### 4.2 Inovasi Smart Landscape Auto-Rotate PROLOG:
Banyak pelaksana mengunci rotasi layar HP (*Auto-Rotate Lock*) di pengaturan ponsel agar layar tidak berputar sendiri saat berbaring. Masalahnya, kamera web biasa akan memaksakan foto menjadi portrait atau miring 90 derajat jika HP dimiringkan.

**Bagaimana PROLOG Mengatasinya:**
- **Sensor Akselerometer & Giroskop Mandiri**: PROLOG mendeteksi kemiringan fisik ponsel langsung dari sensor hardware (\`gamma\` & \`beta\`).
- **Rotasi Otomatis Canvas**: Saat ponsel dipegang horizontal ke kiri atau ke kanan, PROLOG memutar raw stream sensor sebesar $90^\\circ$ atau $-90^\\circ$. Hasilnya adalah foto landscape $16:9$ penuh yang **tegak sempurna tanpa terbalik**.
- **Tombol Alih Mode Manual**: Di bar atas kamera terdapat pil \`[ 📐 Landscape (Lebar) ⇋ ]\`. Pelaksana dapat mengetuk tombol ini untuk berganti ke \`[ 📱 Portrait (Tegak) ]\` jika perlu memotret tiang atau kolom vertikal.
- **Framing Guide**: Saat HP dipegang tegak dalam mode landscape, muncul garis bidik 16:9 letterbox yang memberi panduan area foto yang akan tertangkap.

---

### 4.3 Watermark Legalitas Otomatis:
Setiap jepretan otomatis dibubuhi kotak watermark hitam semi-transparan di bagian bawah:
1. **Identitas**: \`🔍 PROLOG | [Nama Proyek Aktif]\`
2. **Koordinat GPS**: Titik Lintang (*Latitude*), Bujur (*Longitude*), dan nama wilayah/kecamatan hasil *reverse geocoding*.
3. **Waktu & Cuaca**: Tanggal, jam, menit, detik riil, serta kondisi cuaca lapangan.
`
  },
  {
    id: 'defects',
    number: '05',
    title: 'Manajemen Cacat Mutu (Defect Punchlist & Pin Denah)',
    shortTitle: 'Defect & Pin Denah',
    icon: 'MapPin',
    badge: 'Mutu (QC)',
    summary: 'Plotting titik cacat langsung pada denah lantai, slider Before-After, dan audit trail perbaikan.',
    content: `
### 5.1 Alur Bebas Miskomunikasi
PROLOG mengeliminasi perdebatan lapangan perihal *"Dinding sebelah mana yang retak?"* melalui plotting visual interaktif.

#### Langkah Pelaporan:
1. **Temukan Cacat**: Buka menu Defect -> ketuk \`+ Temukan Cacat Mutu\`.
2. **Foto Kondisi Sebelum (Before)**: Ambil foto keretakan, ketidaksikuan, atau cat mengelupas.
3. **Drop Pin pada Denah**:
   - Pilih denah lantai (misal: *Denah Lantai 2*).
   - Sentuh titik spesifik di gambar denah tempat cacat berada. Pin merah akan menancap pada koordinat akurat.
4. **Tugaskan Mandor**: Pilih kelompok mandor/subkon yang bertanggung jawab dan tetapkan tingkat keparahan (*Low*, *Medium*, *Critical*).
5. **Perbaikan & Foto Sesudah (After)**:
   - Mandor melakukan perbaikan dan mengunggah foto kondisi setelah diperbaiki.
6. **Before-After Slider**:
   - Pengawas dan pelaksana dapat menggeser slider interaktif untuk membandingkan secara visual titik sebelum vs sesudah perbaikan.
   - Jika lulus standar, status ditutup (\`CLOSED\`).
`
  },
  {
    id: 'signoff',
    number: '06',
    title: 'Tata Kelola Izin & Serah Terima (SIKA & BAP)',
    shortTitle: 'SIKA / PTW & BAP',
    icon: 'ClipboardCheck',
    badge: 'K3 & Legal',
    summary: 'Izin kerja aman SIKA 4 bidang, lampiran foto shopdrawing, dan BAP proteksi bidang pekerjaan.',
    content: `
### 6.1 SIKA (Surat Izin Kerja Aman / Permit to Work)
SIKA wajib diterbitkan sebelum mandor atau subkon memulai pekerjaan berisiko di lapangan:
- **Pengecoran & Struktur**: Pembesian, bekisting, vibrator, perancah tinggi.
- **Finishing & Arsitektur**: Pasangan dinding bata ringan, plesteran/acian, plafon gipsum, keramik.
- **MEP (Mekanikal, Elektrikal, Plumbing)**: Instalasi pipa air kotor/bersih, konduit kabel, panel daya.
- **Eksterior & Lanskap**: Saluran drainase luar, paving block, pagar keliling.

#### Fitur SIKA PROLOG:
- **Quick Selector Bidang Kerja**: Chip pilihan cepat deskripsi pekerjaan sesuai disiplin yang dipilih.
- **Lampiran Shopdrawing Langsung**: Tombol kamera ringkas di sebelah nomor gambar kerja untuk memotret gambar kerja yang telah disetujui (*approved for construction*).
- **Checklist K3 & APD**: Verifikasi penggunaan helm, rompi, sepatu safety, dan sabuk pengaman (*body harness*).
- **Tanda Tangan Dua Pihak**: Ditandatangani digital oleh Pengawas Lapangan dan Pemohon Kerja.

---

### 6.2 BAP (Berita Acara Serah Terima Parsial)
**Mencegah Saling Lempar Tanggung Jawab:**
Sering terjadi perselisihan ketika subkon plesteran menyelesaikan dinding mulus, namun seminggu kemudian dinding lecet terkena instalasi subkon pipa.

**Solusi BAP PROLOG:**
1. Menyatakan secara tertulis bahwa bidang pekerjaan telah rampung 100% dan lolos inspeksi kualitas.
2. **Klausul Proteksi Area**: Pihak penerima (subkon pekerjaan lanjutan) bertanggung jawab menjaga keutuhan area yang diserahterimakan.
3. Ditandatangani bersama oleh Pihak Pertama (Penyelesai Pekerjaan), Pihak Kedua (Penerima Area), dan disahkan Project Manager.
`
  },
  {
    id: 'pdf',
    number: '07',
    title: 'Rekapitulasi, Filter Riwayat, & Ekspor PDF Legal',
    shortTitle: 'Rekap PDF & Filter',
    icon: 'Download',
    badge: 'Pelaporan',
    summary: 'Filter rentang tanggal & nama penulis, kompilasi dokumen PDF ber-QR code, dan proteksi hapus data.',
    content: `
### 7.1 Filter Cerdas Laporan Lapangan
Pada proyek berdurasi panjang dengan ratusan laporan harian, pelaksana dan manajemen tidak perlu membuang waktu menggulir layar ke bawah:
- **Filter Berdasarkan Rentang Waktu**: Pilih tanggal awal dan tanggal akhir (misal: rekap opname 1 s/d 15 Oktober 2026).
- **Filter Berdasarkan Pembuat (Author)**: Pilih nama pelaksana tertentu untuk melihat rekam jejak kinerjanya.
- **Tampilan Beranda Ringkas**: Menampilkan 7 daftar laporan terbaru lengkap dengan identitas pembuat laporan (\`👤 Nama Pembuat\`).

---

### 7.2 Ekspor PDF Standar Direksi & Owner
Ketika tombol \`Validasi\` atau \`Ekspor PDF\` ditekan:
1. **Kop Surat Perusahaan**: Logo perusahaan, alamat kantor, nama proyek, dan tanggal terbit.
2. **Tabel Tenaga Kerja**: Rincian jumlah pekerja terakumulasi rapi.
3. **Galeri Dokumentasi 16:9**: Foto progres ber-watermark ditata dalam grid 2 kolom profesional.
4. **Blok Tanda Tangan Tiga Pihak**: Menampilkan tanda tangan digital Pelaksana, QC, dan Project Manager dengan stempel verifikasi sistem.

> [!CAUTION]
> **Kebijakan Keamanan Hapus Data:**
> Demi menjaga kepatuhan audit legal proyek, fitur hapus laporan (\`Delete Log\`) **hanya dapat diakses oleh user berkedudukan Super Admin / Project Manager**. Pelaksana lapangan tidak dapat menghapus riwayat laporan yang sudah tersimpan.
`
  },
  {
    id: 'faq',
    number: '08',
    title: 'Best Practices & FAQ Lapangan',
    shortTitle: 'Best Practices & FAQ',
    icon: 'HelpCircle',
    badge: 'Bantuan',
    summary: 'Tips dokumentasi bebas backlight, solusi jika HP mati mendadak, dan panduan mandor non-smartphone.',
    content: `
### 💡 Best Practices Lapangan:
1. **Hindari Foto Backlight**: Posisikan kamera membelakangi sinar matahari agar bidang pekerjaan terlihat terang dan jelas.
2. **Posisikan HP Horizontal**: Biasakan memegang ponsel dalam posisi mendatar (landscape) agar seluruh sudut ruangan atau kolom terekam secara utuh.
3. **Sinkronisasi Setiap Sore**: Begitu tiba di kantor direksikeet, hubungkan ponsel ke Wi-Fi kantor dan pastikan status cloud berwarna hijau (\`🟢 Online / All Synced\`).

---

### ❓ Pertanyaan yang Sering Diajukan (FAQ):

**Q1: Apa yang terjadi jika baterai HP saya habis mendadak saat mengisi laporan?**
> **Jawab:** Tenang. PROLOG menerapkan penyimpanan lokal berbasis *auto-cache*. Draft yang sudah tersimpan sebelum HP mati tetap aman di dalam ponsel Anda dan dapat dilanjutkan saat HP kembali menyala.

**Q2: Mengapa saat membuka kamera di dalam gedung, alamat GPS tidak muncul?**
> **Jawab:** Sinyal GPS satelit membutuhkan ruang terbuka untuk mengunci koordinat. Jika Anda berada di basement terdalam, sistem akan menampilkan koordinat terakhir yang tercatat atau menggunakan titik koordinat proyek utama yang sudah terdaftar.

**Q3: Bagaimana jika ada mandor yang tidak memiliki smartphone canggih?**
> **Jawab:** Mandor tidak diwajibkan menginstal aplikasi. Pelaksana lapangan dapat membuka form BAP atau SIKA di ponsel pelaksana, lalu mandor dapat langsung membubuhkan tanda tangan digital di layar sentuh ponsel pelaksana.

**Q4: Apakah foto-foto proyek di PROLOG menghabiskan memori internal HP saya?**
> **Jawab:** Tidak. PROLOG dilengkapi *smart client-side image compression*. Foto otomatis dioptimasi ke resolusi web standar teknik tanpa mengurangi ketajaman detail, menjaga memori ponsel pelaksana tetap lega.
`
  }
];
