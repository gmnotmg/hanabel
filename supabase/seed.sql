insert into public.site_settings (brand_name, handle, bio, avatar_url, cover_url)
values (
  'Hanabel Official',
  '@hanabel.picks',
  'Produk terbaik pilihan Hanabel. Klik kategori dan temukan rekomendasinya.',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=85',
  ''
)
on conflict do nothing;

insert into public.social_links (label, href, icon, sort_order)
values
  ('Facebook', 'https://facebook.com/', 'facebook', 1),
  ('Instagram', 'https://instagram.com/', 'instagram', 2),
  ('Threads', 'https://threads.net/', 'threads', 3),
  ('TikTok', 'https://tiktok.com/', 'tiktok', 4)
on conflict do nothing;

insert into public.categories (slug, name, description, icon_key, accent_color, sort_order, status)
values
  ('fashion-style', 'Fashion & Style', 'Pilihan outfit dan aksesori untuk gaya sehari-hari.', 'dress', '#f6d7ec', 1, 'published'),
  ('kecantikan', 'Kecantikan', 'Temuan skincare dan beauty yang mudah masuk rutinitas.', 'beauty', '#ffe0e9', 2, 'published'),
  ('elektronik', 'Elektronik', 'Perangkat kecil yang membantu kerja dan aktivitas harian.', 'sparkles', '#dfe5ff', 3, 'published'),
  ('makanan-minuman', 'Makanan & Minuman', 'Temuan lezat untuk stok rumah dan waktu santai.', 'food', '#ffe3cf', 4, 'published'),
  ('dekorasi-rumah', 'Dekorasi Rumah', 'Detail kecil untuk ruang yang terasa lebih personal.', 'home', '#fff1d4', 5, 'published'),
  ('olahraga-fitness', 'Olahraga & Fitness', 'Teman ringan untuk bergerak lebih konsisten.', 'activity', '#d9f5e9', 6, 'published')
on conflict (slug) do nothing;

-- Setelah membuat user di Supabase Auth, jalankan:
-- insert into public.admin_profiles (user_id) values ('USER_UUID_DARI_AUTH');
