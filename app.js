import { supabase } from "./supabase.js";

const products = [
  { id: 1, name: "Sản phẩm A", price: 100000 },
  { id: 2, name: "Sản phẩm B", price: 200000 },
  { id: 3, name: "Sản phẩm C", price: 300000 },
];

let cart = [];

function renderProducts() {
  const el = document.getElementById("products");
  el.innerHTML = "";
  products.forEach(p => {
    const item = document.createElement("div");
    item.innerHTML = `<b>${p.name}</b> - ${p.price} VNĐ <button data-id="${p.id}">Thêm</button>`;
    el.appendChild(item);
  });

  el.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => addToCart(parseInt(btn.dataset.id)));
  });
}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  cart.push(p);
  renderCart();
}

function renderCart() {
  const el = document.getElementById("cart");
  el.innerHTML = "";
  cart.forEach(c => {
    const li = document.createElement("li");
    li.innerText = `${c.name} - ${c.price} VNĐ`;
    el.appendChild(li);
  });
}

document.getElementById("checkoutBtn").addEventListener("click", async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { alert("Bạn cần đăng nhập!"); return; }

  const total = cart.reduce((sum, p) => sum + p.price, 0);
  if (total === 0) { alert("Giỏ hàng trống!"); return; }

  const { data: userData } = await supabase.from("users").select("balance").eq("id", user.id).single();
  if (userData.balance < total) {
    alert("Số dư không đủ!");
    return;
  }

  await supabase.from("transactions").insert([{ user_id: user.id, description: "Thanh toán đơn hàng", amount: -total }]);
  await supabase.rpc("increment_balance", { uid: user.id, amount: -total });

  alert("Thanh toán thành công!");
  cart = [];
  renderCart();
});

renderProducts();
