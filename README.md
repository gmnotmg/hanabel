# Hanabel

Hanabel adalah katalog rekomendasi affiliate yang mobile-first. Pengunjung melihat kurasi produk tanpa harga, lalu diarahkan ke Shopee melalui redirect tracking Hanabel.

## Jalankan lokal

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Jika Supabase belum dikonfigurasi, public catalog otomatis menggunakan data demo lokal.

## Supabase

1. Buat project Supabase.
2. Isi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, dan `SUPABASE_SERVICE_ROLE_KEY` di `.env.local`.
3. Jalankan `supabase/migrations/001_initial.sql` melalui SQL Editor atau Supabase CLI.
4. Jalankan `supabase/seed.sql` untuk brand, social links, dan kategori awal.
5. Buat user email/password di Supabase Auth.
6. Masukkan UUID user tersebut ke `admin_profiles`.
7. Buka `/admin/login`.

`SUPABASE_SERVICE_ROLE_KEY` hanya dipakai server-side untuk mencatat klik. Jangan pernah menggunakan key tersebut sebagai `NEXT_PUBLIC_*`.

## Routes

- `/` — public catalog
- `/kategori/[slug]` — katalog berdasarkan kategori
- `/produk/[slug]` — detail produk
- `/go/[slug]` — redirect tracking menuju Shopee
- `/admin` — admin overview
- `/admin/produk` — CRUD produk dan upload cover
- `/admin/kategori` — CRUD kategori
- `/admin/analytics` — ringkasan klik 30 hari
- `/api/health` — health check

## Verifikasi

```bash
npm run typecheck
npm test
npm run build
```

## Deployment

### Node/Docker

```bash
docker build -t hanabel .
docker run --env-file .env.local -p 3000:3000 hanabel
```

### Cloudflare Workers via OpenNext

Pastikan `wrangler.jsonc` sudah memakai nama Worker dan domain production yang benar. Simpan secret melalui Wrangler atau dashboard Cloudflare, kemudian:

```bash
npm run cloudflare:build
npm run cloudflare:preview
npm run cloudflare:deploy
```

Untuk deployment production, buat R2 bucket/cache sesuai kebutuhan OpenNext dan tambahkan environment variables Supabase sebagai secrets. Static assets tidak disimpan di repository selain asset publik yang memang diperlukan; gambar produk masuk ke bucket `product-media` Supabase.

## Konten produk

MVP sengaja tidak memiliki field harga, stok, rating, inventory, atau checkout. Setiap produk wajib memiliki nama, kategori, deskripsi, highlight manfaat, cover image, status publikasi, dan link Shopee yang lolos allowlist domain.
