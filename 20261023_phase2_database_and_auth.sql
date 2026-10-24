-- ==============================================================================
-- FreshLoop Database Migration — Phase 2: Schema, RLS, Triggers, and Seed Data
-- Target Database: Supabase PostgreSQL (auth.users integration)
-- ==============================================================================

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE
-- Extends Supabase auth.users with public customer information
-- ------------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null default '',
  avatar_url text,
  active_subscription_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for fast lookup by email
create index if not exists idx_profiles_email on public.profiles(email);

-- ------------------------------------------------------------------------------
-- 2. USER ROLES TABLE
-- Segregated authorization roles (strictly managed server-side/admin)
-- ------------------------------------------------------------------------------
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('customer', 'admin', 'kitchen_ops')),
  created_at timestamptz not null default now(),
  constraint uq_user_roles unique (user_id, role)
);

create index if not exists idx_user_roles_user_id on public.user_roles(user_id);

-- ------------------------------------------------------------------------------
-- 3. MEAL PLANS TABLE
-- Authoritative subscription catalogue. Currency stored as integer paise (1 INR = 100 paise)
-- ------------------------------------------------------------------------------
create table if not exists public.meal_plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text not null,
  description text not null,
  badge text,
  category text not null check (category in ('balanced', 'vegetarian', 'high-protein', 'weight-management', 'vegan', 'keto-friendly', 'gluten-free')),
  price_per_meal_paise integer not null check (price_per_meal_paise > 0),
  default_meals_per_day integer not null default 2 check (default_meals_per_day between 1 and 4),
  default_days_per_week integer not null default 5 check (default_days_per_week between 1 and 7),
  recommended_duration_weeks integer not null default 4 check (recommended_duration_weeks between 1 and 12),
  image_url text not null,
  fallback_image_url text,
  dietary_tags text[] not null default '{}',
  target_audience text,
  sample_calories_range text,
  customization_allowed boolean not null default true,
  benefits jsonb not null default '[]'::jsonb,
  sample_menu jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_meal_plans_slug on public.meal_plans(slug);
create index if not exists idx_meal_plans_category on public.meal_plans(category);
create index if not exists idx_meal_plans_active on public.meal_plans(is_active);

-- ------------------------------------------------------------------------------
-- 4. SUBSCRIPTIONS TABLE
-- Customer active/scheduled recurring meal delivery contracts
-- ------------------------------------------------------------------------------
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid not null references public.meal_plans(id),
  status text not null check (status in ('active', 'paused', 'cancelled', 'completed')) default 'active',
  meals_per_day integer not null check (meals_per_day between 1 and 4),
  days_per_week integer not null check (days_per_week between 1 and 7),
  duration_weeks integer not null check (duration_weeks between 1 and 12),
  dietary_preference text not null default 'balanced',
  selected_delivery_slot text not null check (selected_delivery_slot in ('morning', 'midday', 'evening')),
  start_date date not null,
  allergies_note text,
  is_paused boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_subscriptions_status on public.subscriptions(status);

-- ------------------------------------------------------------------------------
-- 5. ORDERS TABLE
-- Delivery dispatch orders. Money stored as integer paise.
-- ------------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  plan_id uuid references public.meal_plans(id) on delete set null,
  status text not null check (status in ('placed', 'chef_preparing', 'packed', 'out_for_delivery', 'delivered', 'cancelled')) default 'placed',
  status_description text,
  next_delivery_date date,
  delivery_slot text not null default 'Morning (6:30 AM – 8:30 AM)',
  subtotal_paise integer not null check (subtotal_paise >= 0),
  discount_paise integer not null default 0 check (discount_paise >= 0),
  tax_paise integer not null default 0 check (tax_paise >= 0),
  delivery_fee_paise integer not null default 0 check (delivery_fee_paise >= 0),
  total_paise integer not null check (total_paise >= 0),
  payment_status text not null check (payment_status in ('pending', 'authorized', 'captured', 'failed', 'refunded')) default 'pending',
  payment_method text,
  delivery_address_summary text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_order_number on public.orders(order_number);
create index if not exists idx_orders_status on public.orders(status);

-- ------------------------------------------------------------------------------
-- 6. ORDER ITEMS TABLE
-- Line items associated with customer orders
-- ------------------------------------------------------------------------------
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  plan_name text not null,
  meals_per_day integer not null check (meals_per_day between 1 and 4),
  days_per_week integer not null check (days_per_week between 1 and 7),
  duration_weeks integer not null check (duration_weeks between 1 and 12),
  price_paise integer not null check (price_paise >= 0),
  created_at timestamptz not null default now()
);

create index if not exists idx_order_items_order_id on public.order_items(order_id);

-- ------------------------------------------------------------------------------
-- 7. DELIVERY ADDRESSES TABLE
-- Customer delivery addresses for insulated chilled tiffins
-- ------------------------------------------------------------------------------
create table if not exists public.delivery_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  is_default boolean not null default false,
  label text not null check (label in ('Home', 'Work', 'Other')) default 'Home',
  full_name text not null,
  phone text not null,
  street_address text not null,
  apartment_suite text not null,
  landmark text,
  city text not null,
  state text not null,
  pincode text not null,
  delivery_instructions text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_delivery_addresses_user_id on public.delivery_addresses(user_id);

-- ------------------------------------------------------------------------------
-- 8. HELPER SECURITY FUNCTIONS & TRIGGERS
-- ------------------------------------------------------------------------------

-- Helper to check whether current authenticated caller has 'admin' role
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

-- Trigger: Automatically handle new user creation from Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'phone', '')
  )
  on conflict (id) do update set
    full_name = coalesce(excluded.full_name, profiles.full_name),
    email = excluded.email;

  -- Strictly assign 'customer' role. Users CANNOT assign themselves admin roles.
  insert into public.user_roles (user_id, role)
  values (new.id, 'customer')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Trigger: Ensure only one default address exists per user
create or replace function public.handle_default_address()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_default = true then
    update public.delivery_addresses
    set is_default = false
    where user_id = new.user_id
      and id <> new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_delivery_addresses_default on public.delivery_addresses;
create trigger trg_delivery_addresses_default
  before insert or update on public.delivery_addresses
  for each row execute function public.handle_default_address();

-- ------------------------------------------------------------------------------
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable RLS across all tables
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.meal_plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.delivery_addresses enable row level security;

-- PROFILES POLICIES
drop policy if exists "Users can view own profile or admin" on public.profiles;
create policy "Users can view own profile or admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id or public.is_admin());

-- USER ROLES POLICIES (Users cannot assign or alter roles)
drop policy if exists "Users can view own role" on public.user_roles;
create policy "Users can view own role"
  on public.user_roles for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Only admins can insert or modify roles" on public.user_roles;
create policy "Only admins can insert or modify roles"
  on public.user_roles for all
  using (public.is_admin())
  with check (public.is_admin());

-- MEAL PLANS POLICIES (Public can view active plans)
drop policy if exists "Anyone can read active meal plans" on public.meal_plans;
create policy "Anyone can read active meal plans"
  on public.meal_plans for select
  using (is_active = true or public.is_admin());

drop policy if exists "Only admins can modify meal plans" on public.meal_plans;
create policy "Only admins can modify meal plans"
  on public.meal_plans for all
  using (public.is_admin())
  with check (public.is_admin());

-- SUBSCRIPTIONS POLICIES
drop policy if exists "Customers can view own subscriptions" on public.subscriptions;
create policy "Customers can view own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Customers can insert own subscription" on public.subscriptions;
create policy "Customers can insert own subscription"
  on public.subscriptions for insert
  with check (auth.uid() = user_id and status in ('active', 'paused'));

drop policy if exists "Customers can update own subscription pause state" on public.subscriptions;
create policy "Customers can update own subscription pause state"
  on public.subscriptions for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- ORDERS POLICIES (Customers cannot modify prices, totals, or payment_status)
drop policy if exists "Customers can view own orders" on public.orders;
create policy "Customers can view own orders"
  on public.orders for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Customers can insert own order with pending payment" on public.orders;
create policy "Customers can insert own order with pending payment"
  on public.orders for insert
  with check (
    auth.uid() = user_id 
    and payment_status = 'pending'
  );

drop policy if exists "Only admins or webhooks can update orders" on public.orders;
create policy "Only admins or webhooks can update orders"
  on public.orders for update
  using (public.is_admin())
  with check (public.is_admin());

-- ORDER ITEMS POLICIES
drop policy if exists "Customers can view own order items" on public.order_items;
create policy "Customers can view own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (o.user_id = auth.uid() or public.is_admin())
    )
  );

drop policy if exists "Customers can insert items for own order" on public.order_items;
create policy "Customers can insert items for own order"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and o.user_id = auth.uid()
    )
  );

-- DELIVERY ADDRESSES POLICIES
drop policy if exists "Customers can manage own delivery addresses" on public.delivery_addresses;
create policy "Customers can manage own delivery addresses"
  on public.delivery_addresses for all
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- ------------------------------------------------------------------------------
-- 10. INITIAL SEED DATA FOR MEAL PLANS
-- (Prices in integer paise: ₹285 = 28500 paise, ₹265 = 26500 paise, etc.)
-- ------------------------------------------------------------------------------
insert into public.meal_plans (
  slug,
  name,
  tagline,
  description,
  badge,
  category,
  price_per_meal_paise,
  default_meals_per_day,
  default_days_per_week,
  recommended_duration_weeks,
  image_url,
  fallback_image_url,
  dietary_tags,
  target_audience,
  sample_calories_range,
  customization_allowed,
  benefits,
  sample_menu,
  is_active
)
values
(
  'balanced-daily-meals',
  'Balanced Daily Meals',
  'Wholesome macro-nutrient equilibrium for sustained everyday vitality.',
  'Our flagship subscription crafted by culinary chefs and nutritionist partners. Featuring organic seasonal vegetables, lean clean proteins, cold-pressed dressings, and slow-burning ancient grains designed to avoid afternoon energy crashes.',
  'Most Popular',
  'balanced',
  28500,
  2,
  5,
  4,
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  array['Organic Produce', 'Chef Prepared', 'No Preservatives', 'Whole Grains'],
  'Professionals and families seeking reliable, clean nutrition without daily meal planning or cooking stress.',
  '520 – 640 kcal / meal',
  true,
  '[
    {"title": "Complete Macro Harmony", "description": "Precise ratio of 40% complex carbs, 30% clean proteins, and 30% healthy monounsaturated fats."},
    {"title": "Zero Afternoon Slump", "description": "Low-glycemic whole ingredients maintain stable blood glucose levels throughout your workday."},
    {"title": "Culinary Variety", "description": "Over 40 rotating recipes every month so your palate never experiences meal fatigue."},
    {"title": "Eco Insulated Chilled Tiffin", "description": "Delivered in returnable compostable containers with ice-cell lining to keep meals pristine."}
  ]'::jsonb,
  '{
    "breakfast": "Avocado Tartine with Sprouted Seed Crumble & Microgreens",
    "lunch": "Herb-Roasted Salmon or Paneer Bowl with Tri-Color Quinoa & Tahini Green Goddess",
    "dinner": "Smoked Paprika Chicken Breast with Charred Broccolini & Sweet Potato Mash"
  }'::jsonb,
  true
),
(
  'vegetarian-fresh-plan',
  'Vegetarian Fresh Plan',
  'Vibrant plant-forward creations highlighting heirloom produce & artisanal dairy.',
  'A celebration of farm-to-table vegetarian gastronomy. Packed with locally sourced heirloom greens, farmstead paneer, legumes, tempeh, seeds, and aromatic herb reductions.',
  'Chef Favorite',
  'vegetarian',
  26500,
  2,
  5,
  4,
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
  array['100% Lacto-Veg', 'High Fiber', 'Seasonal Greens', 'Farm-to-Box'],
  'Vegetarians, flexitarians, and conscious food lovers desiring gut-friendly, antioxidant-rich daily dishes.',
  '480 – 590 kcal / meal',
  true,
  '[
    {"title": "Artisanal Plant Nutrition", "description": "High-protein legumes, tofu, and grass-fed dairy without heavily processed fake meats."},
    {"title": "Gut Microbiome Diversity", "description": "Over 30 distinct botanicals and prebiotic fibers delivered across your weekly menu."},
    {"title": "Farm Direct Harvest", "description": "Produce sourced from certified pesticide-free organic farms within 150 km of our kitchen."}
  ]'::jsonb,
  '{
    "breakfast": "Cardamom Spiced Oats with Chia Pudding, Wild Berry Compote & Flax Crisps",
    "lunch": "Mediterranean Falafel Nourish Bowl with Beetroot Hummus & Warm Zaatar Farro",
    "dinner": "Kashmiri Morel & Paneer Tikka Stew with Fragrant Brown Basmati Pilaf"
  }'::jsonb,
  true
),
(
  'high-protein-fuel',
  'High Protein Fuel',
  'Optimized amino-acid density designed for strength, muscle recovery, and stamina.',
  'Engineered for gym athletes, runners, crossfitters, and high-performance individuals. Each meal guarantees 42g–55g of bioavailable protein with minimal simple sugars and tailored healthy fats.',
  'Athlete Choice',
  'high-protein',
  33500,
  2,
  6,
  4,
  'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  array['45g+ Protein / Meal', 'Macro Optimized', 'Lean Meats & Whey', 'Recovery Herbs'],
  'Fitness enthusiasts, active gym members, athletes, and anyone pursuing lean body recomposition.',
  '620 – 750 kcal / meal',
  true,
  '[
    {"title": "Guaranteed Protein Target", "description": "Every single plate delivers a verified 42g to 55g of complete high-biological-value protein."},
    {"title": "Muscle Repair Acceleration", "description": "Includes tart cherry extract and anti-inflammatory turmeric reduction in post-workout dressings."},
    {"title": "Clean Fuel, Zero Junk", "description": "Completely free of refined sugars, trans fats, and fillers."}
  ]'::jsonb,
  '{
    "breakfast": "Egg White & Turkey Bacon Frittata with Sautéed Spinach and Roasted Baby Russets",
    "lunch": "Char-Grilled Chimichurri Chicken Breast with Edamame Wild Rice & Steamed Asparagus",
    "dinner": "Seared Atlantic Salmon Fillet with Charred Broccoli Florets and Black Lentil Salad"
  }'::jsonb,
  true
),
(
  'calorie-mindful',
  'Calorie Mindful',
  'Portion-controlled, high-satiety gastronomy for effortless weight equilibrium.',
  'Satisfying, nutrient-dense meals capped at 380–460 kcal per plate without sacrificing culinary pleasure. High in dietary fiber, clean proteins, and volume eating botanicals.',
  'Weight Wellness',
  'weight-management',
  29500,
  2,
  5,
  4,
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  array['Under 460 kcal', 'High Satiety', 'Low Sodium', 'No Refined Sugars'],
  'Anyone looking to maintain a calorie deficit without measuring, weighing food, or feeling deprived.',
  '380 – 460 kcal / meal',
  true,
  '[
    {"title": "Effortless Deficit", "description": "Stay precisely within your daily caloric target without cumbersome calorie-tracking apps."},
    {"title": "High Satiety Volume", "description": "Packed with high-volume greens, konjac, and dietary fiber so you remain comfortably full."},
    {"title": "Metabolic Spark Ingredients", "description": "Enhanced with green tea catechins, ginger, and apple cider vinegar vinaigrettes."}
  ]'::jsonb,
  '{
    "breakfast": "Shakshuka Skillet with Poached Pasture Egg, Roasted Peppers & Seed Toast",
    "lunch": "Zucchini Noodle Pad Thai with Grilled Lemon-Herb Tofu and Crushed Peanuts",
    "dinner": "Slow-Simmered Moroccan Vegetable Tagine with Cauliflower Couscous & Fresh Mint"
  }'::jsonb,
  true
)
on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  description = excluded.description,
  badge = excluded.badge,
  category = excluded.category,
  price_per_meal_paise = excluded.price_per_meal_paise,
  default_meals_per_day = excluded.default_meals_per_day,
  default_days_per_week = excluded.default_days_per_week,
  recommended_duration_weeks = excluded.recommended_duration_weeks,
  image_url = excluded.image_url,
  fallback_image_url = excluded.fallback_image_url,
  dietary_tags = excluded.dietary_tags,
  target_audience = excluded.target_audience,
  sample_calories_range = excluded.sample_calories_range,
  benefits = excluded.benefits,
  sample_menu = excluded.sample_menu,
  is_active = excluded.is_active,
  updated_at = now();
