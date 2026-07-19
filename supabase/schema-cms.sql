-- Insta Baraati — CMS tables for the admin content editors.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- (Run schema.sql first if you haven't already.)

-- ============ TABLES ============

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  sort_order int not null default 0,
  name text not null,
  features text[] not null default '{}',
  highlighted boolean not null default false
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  sort_order int not null default 0,
  names text not null,
  relation text not null default '',
  quote text not null
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('bts', 'fun', 'talking', 'vendor')),
  sort_order int not null default 0,
  title text not null,
  video_url text not null,
  poster_url text
);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  offer_active boolean not null default true,
  offer_text text not null default '',
  offer_note text not null default ''
);

-- ============ SECURITY (public read, admin write) ============

alter table public.packages enable row level security;
alter table public.testimonials enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.site_settings enable row level security;

create policy "public read packages" on public.packages for select using (true);
create policy "admin write packages" on public.packages for all to authenticated using (true) with check (true);

create policy "public read testimonials" on public.testimonials for select using (true);
create policy "admin write testimonials" on public.testimonials for all to authenticated using (true) with check (true);

create policy "public read portfolio" on public.portfolio_items for select using (true);
create policy "admin write portfolio" on public.portfolio_items for all to authenticated using (true) with check (true);

create policy "public read settings" on public.site_settings for select using (true);
create policy "admin write settings" on public.site_settings for all to authenticated using (true) with check (true);

-- ============ STORAGE BUCKET for uploaded reels ============
-- If this block errors with "must be owner of table objects", create the bucket
-- and policies from the dashboard instead: Storage → New bucket (name: reels,
-- Public bucket: ON), then Policies → allow authenticated INSERT/UPDATE/DELETE.

insert into storage.buckets (id, name, public)
values ('reels', 'reels', true)
on conflict (id) do nothing;

create policy "public read reel files" on storage.objects
  for select using (bucket_id = 'reels');
create policy "admin upload reel files" on storage.objects
  for insert to authenticated with check (bucket_id = 'reels');
create policy "admin update reel files" on storage.objects
  for update to authenticated using (bucket_id = 'reels');
create policy "admin delete reel files" on storage.objects
  for delete to authenticated using (bucket_id = 'reels');

-- ============ SEED current site content ============

insert into public.site_settings (id, offer_active, offer_text, offer_note)
values (1, true, 'Limited-time wedding season discount', 'For limited slots only')
on conflict (id) do nothing;

insert into public.packages (sort_order, name, features, highlighted) values
  (1, 'Standard', array[
    '1 content creator',
    '4 events (Haldi, Mehendi, Sangeet, Wedding)',
    '30 Reels',
    'Live stories',
    'Delivery time: 24–48 hours',
    'Dedicated Instagram account',
    'All raw data',
    'Planning call',
    'Add-ons available'
  ], false),
  (2, 'Premium', array[
    '2–3 content creators',
    '4 events (Haldi, Mehendi, Sangeet, Wedding)',
    '1 extra day shoot (Home / Date / Pre-Wed)',
    '50 Reels',
    'Event-wise highlighted reels',
    'Simultaneous coverage',
    'Live stories',
    'Delivery time: within 24 hours',
    'Dedicated Instagram account + management',
    'All raw data',
    'Planning call',
    'Add-ons available'
  ], true),
  (3, 'Customized', array[
    'Add more events',
    'Additional creators',
    'Completely tailored deliverables',
    'Special content requests',
    'Customised everything as per your needs'
  ], false);

insert into public.testimonials (sort_order, names, relation, quote) values
  (1, 'Shradha & Tushar', 'Bride and Groom', 'We were worried about missing moments with our parents, but Insta Baraati made sure every family member was part of the story. Our Instagram page from the wedding is something we cherish every day.'),
  (2, 'Rishita & Krish', 'Bride’s Sister and Brother', 'Insta Baraati didn’t feel like vendors at all. They danced with us, laughed with us, and somehow still caught every single special moment. Also, the reels were ready before the wedding was even over.'),
  (3, 'Shivam & Shivangi', 'Bride and Groom', 'The reels were so good, our guests couldn’t stop watching. They captured inside jokes and candid moments we didn’t even know were happening. Absolutely loved the experience.');

insert into public.portfolio_items (category, sort_order, title, video_url, poster_url) values
  ('bts', 1, 'Baraat energy', '/videos/bts-1.mp4', '/posters/bts-1.jpg'),
  ('bts', 2, 'Behind the scenes', '/videos/bts-2.mp4', '/posters/bts-2.jpg'),
  ('bts', 3, 'Candid moments', '/videos/bts-3.mp4', '/posters/bts-3.jpg'),
  ('bts', 4, 'Wedding vibes', '/videos/bts-4.mp4', '/posters/bts-4.jpg'),
  ('fun', 1, 'Concept reel', '/videos/fun-1.mp4', '/posters/fun-1.jpg'),
  ('fun', 2, 'Comedy bit', '/videos/fun-2.mp4', '/posters/fun-2.jpg'),
  ('fun', 3, 'Trending audio', '/videos/fun-3.mp4', '/posters/fun-3.jpg'),
  ('fun', 4, 'Squad goals', '/videos/fun-4.mp4', '/posters/fun-4.jpg'),
  ('talking', 1, 'Bride’s sister', '/videos/talking-1.mp4', '/posters/talking-1.jpg'),
  ('talking', 2, 'Bride’s brother', '/videos/talking-2.mp4', '/posters/talking-2.jpg'),
  ('talking', 3, 'Groom’s bhanja', '/videos/talking-3.mp4', '/posters/talking-3.jpg'),
  ('talking', 4, 'Groom’s bhabhi', '/videos/talking-4.mp4', '/posters/talking-4.jpg'),
  ('vendor', 1, 'Vendor spotlight', '/videos/vendor-1.mp4', '/posters/vendor-1.jpg'),
  ('vendor', 2, 'Vendor story', '/videos/vendor-2.mp4', '/posters/vendor-2.jpg');
