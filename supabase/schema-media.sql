-- Insta Baraati — hero video + video testimonials (the admin "Media" tab).
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- (Run schema.sql and schema-cms.sql first.)

alter table public.site_settings
  add column if not exists hero_video_url text;

create table if not exists public.testimonial_videos (
  id uuid primary key default gen_random_uuid(),
  sort_order int not null default 0,
  names text not null,
  relation text not null default '',
  video_url text not null,
  poster_url text
);

alter table public.testimonial_videos enable row level security;

create policy "public read testimonial videos" on public.testimonial_videos
  for select using (true);
create policy "admin write testimonial videos" on public.testimonial_videos
  for all to authenticated using (true) with check (true);

insert into public.testimonial_videos (sort_order, names, relation, video_url, poster_url) values
  (1, 'Rishita', 'Bride’s Sister', '/videos/testimonial-rishita.mp4', '/posters/testimonial-rishita.jpg'),
  (2, 'Krish', 'Bride’s Brother', '/videos/testimonial-krish.mp4', '/posters/testimonial-krish.jpg');
