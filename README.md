# Nusantara Institute of Technology (NIT) — Academic Portal

Portal Akademik Resmi dan Terpadu **Nusantara Institute of Technology (NIT)** yang mendukung tiga peran pengguna (*Role-Based Access Control*): **Mahasiswa**, **Dosen**, dan **Administrator**. Dilengkapi dengan autentikasi SSO berbasis hash kriptografi (*SHA-256 + Salt*), proteksi rute berlapis, persistensi data sesi, penyimpanan berkas tugas nyata via IndexedDB, sinkronisasi nilai dinamis, dan forum diskusi akademik interaktif.

---

## 🔐 Kredensial Akun Demo (Dokumentasi Pengujian)

Untuk keperluan pengujian fungsionalitas dan otentikasi hak akses, sistem telah dilengkapi akun sintetis unik sebagai berikut:

| Peran (Role) | Nomor Induk (NIM / NIDN / NIP) | Nama Lengkap | Departemen / Prodi | Kata Sandi SSO | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mahasiswa (Utama)** | `2201082045` | Andi Pratama S. | Teknik Informatika | `Mahasiswa123#` | Aktif |
| **Mahasiswa (Sekunder)** | `2201082012` | Rina Rahmawati | Teknik Informatika | `Mahasiswa123#` | Aktif |
| **Mahasiswa (Ketiga)** | `2201082068` | Farhan Maulana | Sains Komputasi | `Mahasiswa123#` | Aktif |
| **Dosen (Utama)** | `0412087501` | Dr. Ir. Budi Hartono, M.Kom. | Fak. Sains Data & Informatika | `Dosen123#` | Aktif |
| **Dosen (Sekunder)** | `0428058203` | Prof. Dr. Maya Indrawati, Ph.D. | Fak. Rekayasa Sistem Cerdas | `Dosen123#` | Aktif |
| **Administrator** | `198501012010` | Hendra Wijaya, S.Kom., M.T. | Biro Teknologi Informasi Kampus | `Admin123#` | Aktif |

> **Catatan Keamanan:**
> Kata sandi tidak disimpan dalam bentuk plaintext. Semua pengguna diverifikasi menggunakan *salted SHA-256 cryptographic hashing* melalui Web Crypto API.

---

## 🚀 Cara Menjalankan Project

### Prasyarat
- **Node.js** (versi 18 ke atas disarankan)
- **npm** (versi 9 ke atas)

### Langkah-langkah
1. **Instal dependensi:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000/`.

3. **Cek Lint / TypeScript Typecheck:**
   ```bash
   npm run lint
   ```

4. **Build untuk Production:**
   ```bash
   npm run build
   ```

---

## 🛡️ Fitur & Implementasi Keamanan

1. **Autentikasi & Penyimpanan Sandi Non-Plaintext**:
   - Fungsi `hashPassword` dan `synchronousHash` di [`src/utils/crypto.ts`](file:///c:/Keamanan%20Sistem%20Informasi/nusantara-institute-of-technology---academic-portal/src/utils/crypto.ts).
   - Setiap pengguna memiliki `salt` unik dan `passwordHash` yang diverifikasi saat login.
   - Pesan error spesifik jika nomor induk tidak ditemukan, kata sandi salah, atau akun ditangguhkan (*suspended*).
   - Sesi tersimpan aman di `localStorage` (`nit_portal_session_v2`) sehingga tidak hilang saat halaman direfresh.

2. **Role-Based Access Control (RBAC) Berlapis**:
   - **Frontend Routing Guard**: Pengguna yang belum login otomatis dialihkan ke halaman login saat mencoba mengakses halaman terproteksi.
   - **Role Route Guard**: Mahasiswa dilarang membuka konsol manajemen akun/mata kuliah admin; dosen dibatasi hanya pada kelas yang diampu.
   - **Action-Level Guard**: Operasi mutasi data (tambah pengguna, ubah nilai, buat tugas, hapus mata kuliah) divalidasi ketat pada context logic.

3. **Penyimpanan Berkas Nyata (IndexedDB Storage)**:
   - Modul [`src/utils/fileStorage.ts`](file:///c:/Keamanan%20Sistem%20Informasi/nusantara-institute-of-technology---academic-portal/src/utils/fileStorage.ts) menggunakan browser **IndexedDB** (`nit_portal_storage_db`).
   - Berkas tugas (PDF, ZIP, dsb.) tersimpan sebagai binary Blob secara persisten di mesin lokal.
   - Fitur "Unduh Berkas" menghasilkan unduhan file sungguhan via object URL.
   - Validasi format berkas dan batas ukuran maksimal (*MB*).

4. **Sinkronisasi Nilai Dinamis**:
   - Saat dosen memasukkan nilai dan umpan balik pada tugas mahasiswa, nilai langsung diperbarui di basis data penugasan, nilai mata kuliah di KHS (*Kartu Hasil Studi*) otomatis terhitung ulang, dan IPK mahasiswa dihitung ulang secara real-time.

5. **Isolasi Data Mahasiswa**:
   - Halaman KHS (`StudentGrades`) dan tinjauan penugasan pada `StudentDashboard` secara ketat memfilter data berdasarkan `studentId` pengguna yang sedang login.
