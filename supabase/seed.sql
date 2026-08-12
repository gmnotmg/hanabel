insert into public.site_settings (brand_name, handle, bio, avatar_url, cover_url)
values (
  'Hanabel Official',
  '@hanabel.picks',
  'Koleksi pilihan yang bikin rutinitas terasa lebih cantik, praktis, dan menyenangkan.',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85'
)
on conflict do nothing;

insert into public.social_links (label, href, icon, sort_order)
values
  ('Instagram', 'https://instagram.com/', 'instagram', 1),
  ('TikTok', 'https://tiktok.com/', 'tiktok', 2),
  ('Threads', 'https://threads.net/', 'threads', 3),
  ('Facebook', 'https://facebook.com/', 'facebook', 4)
on conflict do nothing;

insert into public.categories (slug, name, description, icon_key, accent_color, sort_order, status)
values
  ('fashion-style', 'Fashion & Style', 'Pilihan outfit dan aksesori untuk gaya sehari-hari.', 'dress', '#f6d7ec', 1, 'published'),
  ('kecantikan', 'Kecantikan', 'Temuan skincare dan beauty yang mudah masuk rutinitas.', 'beauty', '#ffe0e9', 2, 'published'),
  ('elektronik', 'Elektronik', 'Perangkat kecil yang membantu kerja dan aktivitas harian.', 'sparkles', '#dfe5ff', 3, 'published'),
  ('dekorasi-rumah', 'Dekorasi Rumah', 'Detail kecil untuk ruang yang terasa lebih personal.', 'home', '#fff1d4', 4, 'published'),
  ('olahraga-fitness', 'Olahraga & Fitness', 'Teman ringan untuk bergerak lebih konsisten.', 'activity', '#d9f5e9', 5, 'published')
on conflict (slug) do nothing;

-- Setelah membuat user di Supabase Auth, jalankan:
-- insert into public.admin_profiles (user_id) values ('USER_UUID_DARI_AUTH');
