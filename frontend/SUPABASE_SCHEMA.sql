-- Cargo Direct: Supabase schema + security (apply in Supabase SQL editor)
-- This file is meant as an "apply once" migration guide.

-- 1) Drivers table required fields
-- If your drivers table already exists, add any missing columns.
alter table if exists public.drivers
  add column if not exists full_name text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists national_id text,
  add column if not exists license_number text,
  add column if not exists vehicle_registration text,
  add column if not exists vehicle_type text,
  add column if not exists verification_status text default 'pending',
  add column if not exists phone_verified boolean default false,
  add column if not exists created_at timestamptz default now();

-- Recommended: prevent duplicates
create unique index if not exists drivers_phone_unique on public.drivers(phone);

-- 2) Driver locations table for live GPS tracking
create table if not exists public.driver_locations (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null,
  latitude numeric not null,
  longitude numeric not null,
  updated_at timestamptz not null default now()
);

-- One row per driver (enables upsert by driver_id)
create unique index if not exists driver_locations_driver_unique
  on public.driver_locations(driver_id);

-- Helpful index for dashboards
create index if not exists driver_locations_updated_at_idx
  on public.driver_locations(updated_at desc);

-- 3) Shipments assignment safety (optional but recommended)
-- Expected columns used by API:
alter table if exists public.shipments
  add column if not exists driver_id uuid,
  add column if not exists driver text;

-- 4) RLS policies (recommended)
-- These are "starter" policies; customize for your auth/admin model.

-- Enable RLS
alter table if exists public.drivers enable row level security;
alter table if exists public.driver_locations enable row level security;

-- NOTE: Admin actions (create/approve/reject) in this app are designed to run
-- through the Next.js API using a Service Role key, which bypasses RLS.

-- Drivers can read their own row if you later add auth_user_id:
-- alter table public.drivers add column if not exists auth_user_id uuid unique references auth.users(id);
-- create policy "drivers_read_own" on public.drivers
--   for select to authenticated
--   using (auth.uid() = auth_user_id);
--
-- create policy "drivers_update_own_phone_verified" on public.drivers
--   for update to authenticated
--   using (auth.uid() = auth_user_id)
--   with check (auth.uid() = auth_user_id);

-- Driver locations: only the authenticated driver can upsert their own location
-- (requires driver_id to equal auth.uid() OR use an auth_user_id mapping).
-- Example if you make driver_id = auth.uid():
-- create policy "driver_locations_upsert_own" on public.driver_locations
--   for insert to authenticated
--   with check (auth.uid() = driver_id);
-- create policy "driver_locations_update_own" on public.driver_locations
--   for update to authenticated
--   using (auth.uid() = driver_id);
-- create policy "driver_locations_read_all_admin" on public.driver_locations
--   for select to authenticated
--   using (true);

