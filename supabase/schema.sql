-- Insta Baraati — database schema
-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  event_date date,
  city text not null,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

alter table public.enquiries enable row level security;

-- Visitors (not logged in) may only submit an enquiry — never read them.
create policy "anyone can submit an enquiry"
  on public.enquiries for insert
  to anon, authenticated
  with check (true);

-- Only the logged-in admin can read and update enquiries.
create policy "admin can read enquiries"
  on public.enquiries for select
  to authenticated
  using (true);

create policy "admin can update enquiries"
  on public.enquiries for update
  to authenticated
  using (true);
