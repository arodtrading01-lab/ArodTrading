create extension if not exists pgcrypto;
create table if not exists rfq (id uuid primary key default gen_random_uuid(), created_at timestamptz default now(), source text, title text not null, commodity text, qty text, unit text, incoterm text, port text, country text, budget_usd numeric, buyer_name text, buyer_email text, buyer_phone text, posted_at_utc timestamptz, score int);
create table if not exists wallet_credits (user_id text primary key, credits int not null default 30, used int not null default 0, refunds_pending int not null default 0);
create table if not exists reveal_rules (user_id text primary key, rules jsonb not null default '{}'::jsonb);
