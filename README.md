# phuongfullwedgithub.io
# 🚀 PhuongShop - Supabase Demo

Website bán hàng online tích hợp ví cá nhân, nạp tiền và thanh toán bằng **Supabase**.

## 🔧 Cấu hình Supabase
- URL: https://vfrdszlszwzfakxckdfm.supabase.co
- Anon key: (đã tích hợp sẵn trong `supabase.js`)

## 🗄️ Tạo bảng trong Supabase

```sql
create table users (
  id uuid primary key,
  email text unique not null,
  balance bigint default 0,
  created_at timestamp default now()
);

create table transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  description text,
  amount bigint,
  created_at timestamp default now()
);

-- Hàm RPC để cập nhật số dư
create or replace function increment_balance(uid uuid, amount bigint)
returns void language plpgsql as $$
begin
  update users set balance = balance + amount where id = uid;
end;
$$;
