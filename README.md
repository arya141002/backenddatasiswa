# API Data Siswa

REST API untuk mengelola data siswa dan kelas, dibangun dengan Express dan MySQL.

## Fitur
- CRUD siswa dengan relasi ke tabel kelas
- Pencarian nama, filter, dan pagination
- Autentikasi JWT (register dan login)
- Validasi input dengan Zod
- Rate limiting, CORS, dan Helmet

## Instalasi
```bash
npm install
cp .env.example .env
```
Isi nilai di `.env`, lalu siapkan database MySQL (lihat `database.sql`).

## Menjalankan
```bash
npm run dev    # pengembangan (auto-restart)
npm start      # produksi
```

## Endpoint
| Method | Path | Auth | Keterangan |
|--------|------|------|------------|
| POST | /auth/register | - | Daftar user |
| POST | /auth/login | - | Login, mengembalikan token |
| GET | /siswa | - | Daftar siswa (`?page=&limit=&cari=&kelas=`) |
| GET | /siswa/:id | - | Detail siswa |
| POST | /siswa | Bearer | Tambah siswa |
| PUT | /siswa/:id | Bearer | Ubah siswa |
| DELETE | /siswa/:id | Bearer | Hapus siswa |
| GET | /kelas | - | Daftar kelas |