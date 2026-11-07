create extension if not exists pgcrypto;

create table members (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  pw_hash text not null,
  display_name text,
  bio text,
  role text not null default 'hiker',
  reset_code text,
  created_at timestamptz not null default now()
);

create table trips (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references members(id),
  title text not null,
  region text,
  starts_on date,
  notes text,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);
alter table trips enable row level security;

create table waypoints (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  label text not null,
  lat double precision not null,
  lon double precision not null
);
alter table waypoints enable row level security;

create table gear_items (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  name text not null,
  weight_g integer
);
alter table gear_items enable row level security;

create table photos (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references trips(id) on delete cascade,
  owner_id uuid references members(id),
  file_name text not null
);
alter table photos enable row level security;
