# An-Nahl Management System (AMS)

# Information Architecture (IA)

Version : 1.0

---

# 1. Tujuan

Dokumen Information Architecture (IA) menjelaskan struktur navigasi, hubungan antar halaman, serta alur informasi pada An-Nahl Management System (AMS).

Dokumen ini digunakan sebagai acuan dalam proses desain UI/UX, pengembangan frontend, backend, serta pengembangan sistem pada periode selanjutnya.

---

# 2. Struktur Sistem

AMS dibagi menjadi dua area utama.

1. Public Website
2. Internal Dashboard

---

# 3. Public Website

Website publik dapat diakses oleh seluruh pengunjung tanpa login.

Home
│
├── Hero Section
├── Tentang Himpunan
├── Statistik Organisasi
├── Timeline Terdekat
├── Sayembara Terbaru
├── Dokumentasi Kegiatan
├── Kontak
└── Login

---

# 4. Authentication

Login
│
├── Email
├── Password
├── Lupa Password
└── Masuk ke Dashboard

Role yang tersedia

- Super Admin (BPH)
- Ketua Department
- Anggota
- Public

---

# 5. Dashboard

Dashboard
│
├── Beranda
├── Timeline
├── Cash Flow
├── Arsip
├── Database Anggota
├── Sayembara
├── Aspirasi
├── Alumni
├── Riwayat Kepengurusan
├── Statistik
└── Pengaturan

---

# 6. Struktur Dashboard

Dashboard
│
├── Header
│   ├── Search
│   ├── Notification
│   ├── User Profile
│   └── Logout
│
├── Sidebar
│   ├── Dashboard
│   ├── Timeline
│   ├── Cash Flow
│   ├── Arsip
│   ├── Database Anggota
│   ├── Sayembara
│   ├── Aspirasi
│   ├── Alumni
│   ├── Statistik
│   └── Pengaturan
│
└── Content Area

---

# 7. Modul Timeline

Timeline
│
├── Kalender
├── List Program Kerja
├── Detail Program
├── Deadline
├── Filter Department
└── Tambah Timeline (Admin)

---

# 8. Modul Cash Flow

Cash Flow
│
├── Dashboard Keuangan
├── Saldo Saat Ini
├── Pemasukan
├── Pengeluaran
├── Riwayat Transaksi
├── Detail Transaksi
├── Upload Bukti
└── Export Laporan

---

# 9. Modul Arsip

Arsip
│
├── Surat Masuk
├── Surat Keluar
├── Proposal
├── LPJ
├── SOP
├── AD/ART
├── Sertifikat
├── Dokumentasi
├── Logo Organisasi
├── Asset Pembelajaran
│   ├── SketchUp Plugin
│   ├── AutoCAD Plugin
│   ├── Canva Template
│   ├── Furniture 3D
│   └── Neufert
└── Pencarian Arsip

---

# 10. Modul Database Anggota

Database Anggota
│
├── Struktur Organisasi
│
├── Badan Pengurus Harian
│   ├── Ketua Umum
│   ├── Wakil Ketua
│   ├── Sekretaris
│   └── Bendahara
│
├── Department
│   ├── Kominfo
│   ├── Humas
│   ├── Diklitbang
│   ├── Kreatif
│   └── Logistik
│
├── Detail Anggota
├── Profile Anggota
├── Status
└── Riwayat Kepengurusan

---

# 11. Modul Sayembara

Sayembara
│
├── Daftar Sayembara
├── Detail Sayembara
├── Poster
├── Deadline
├── Link Pendaftaran
├── Contact Person
└── Filter Kategori

---

# 12. Modul Aspirasi

Aspirasi
│
├── Kirim Aspirasi
├── Kritik
├── Saran
├── Ide Program Kerja
├── Aspirasi Anonim
└── Riwayat Aspirasi

---

# 13. Modul Alumni

Alumni
│
├── Daftar Alumni
├── Detail Alumni
├── Tahun Lulus
├── Profesi
└── Kontak

---

# 14. Modul Statistik

Statistik
│
├── Total Anggota
├── Total Arsip
├── Total Sayembara
├── Statistik Keuangan
├── Statistik Program Kerja
└── Grafik Organisasi

---

# 15. Modul Pengaturan

Pengaturan
│
├── Profil Organisasi
├── Manajemen User
├── Manajemen Role
├── Backup Data
├── Restore Data
└── Pengaturan Website

---

# 16. Hak Akses

## Public

- Melihat Landing Page
- Melihat Timeline
- Melihat Sayembara
- Melihat Dokumentasi Publik

---

## Anggota

- Semua akses Public
- Download Arsip
- Melihat Database Anggota
- Mengirim Aspirasi

---

## Ketua Department

- Semua akses Anggota
- Mengelola data department
- Upload Arsip Department
- Mengelola Timeline Department

---

## Super Admin

Memiliki seluruh hak akses sistem.

---

# 17. Hubungan Antar Modul

Dashboard
│
├── Timeline
│
├── Cash Flow
│
├── Arsip
│
├── Database Anggota
│
├── Sayembara
│
├── Aspirasi
│
├── Alumni
│
└── Pengaturan

Seluruh modul terhubung melalui Dashboard sebagai pusat navigasi utama.

---

# 18. Navigasi

Public Website
        │
        ▼
Login
        │
        ▼
Dashboard
        │
        ├── Timeline
        ├── Cash Flow
        ├── Arsip
        ├── Database Anggota
        ├── Sayembara
        ├── Aspirasi
        ├── Alumni
        ├── Statistik
        └── Pengaturan

---

# 19. Penutup

Dokumen Information Architecture ini menjadi acuan utama dalam proses perancangan wireframe, desain UI/UX, implementasi frontend, backend, serta pengembangan fitur AMS pada versi berikutnya.