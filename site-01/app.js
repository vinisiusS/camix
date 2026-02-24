const BRL = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const WHOLESALE_QTY = 6;        // a partir de 10 unidades
const WHOLESALE_DISCOUNT = 0.75; // 20% OFF (troque aqui)

const state = {
  products: [
  {
    id: "alemanha-24-25",
    name: "Alemanha 2024/25",
    category: "ALEMANHA",
    price: 149.9,
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "HOME",
    image:"assets/alemanha-24-25.jpg"
  },
  {
    id: "alemanha-26-27",
    name: "Alemanha 2026/27",
    category: "ALEMANHA",
    price: 149.9,
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "HOME",
    image:"assets/alemanha-26-27.jpg"
  },
  {
    id: "argentina-24-25",
    name: "Argentina 2024/25",
    category: "ARGENTINA",
    price: 159.9,
    colors: ["Azul"],
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    badge: "HOME",
    image:"assets/argentina-24-25.jpg"
  },
  {
    id: "argentina-26-27",
    name: "Argentina 2026/27",
    category: "ARGENTINA",
    price: 169.9,
    colors: ["Azul"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "HOME",
    image:"assets/argentina-26-27.jpg"
  },
  {
    id: "argentina-ede-24-25",
    name: "Argentina EDE 2024/25",
    category: "Edição Especial",
    price: 179.9,
    colors: ["Azul"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "EDE",
    image:"assets/argentina-ede-24-25.jpg"
  },
  {
    id: "argentina-ede",
    name: "Argentina EDE",
    category: "Edição Especial",
    price: 179.9,
    colors: ["Azul"],
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    badge: "EDE",
    image:"assets/argentina-ede.jpg"
  },
  {
    id: "brasil-2-26-27.jpeg",
    name: "Brasil-2 2026/27",
    category: "BRASIL",
    price: 139.9,
    colors: ["Azul"],
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    badge: "HOME",
    image:"assets/brasil-2-26-27.jpeg"
  },
  {
    id: "brasil-26-27",
    name: "Brasil 2026/27",
    category: "BRASIL",
    price: 129.9,
    colors: ["Amarela"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "HOME",
    image:"assets/brasil-26-27.jpeg"
  },
  {
    id: "brasil-2020",
    name: "Brasil 2020",
    category: "BRASIL",
    price: 149.9,
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    badge: "HOME",
    image:"assets/brasil-2020.jpg"
  },
    {
    id: "brasil-ede-26-27",
    name: "Brasil EDE 2026/27",
    category: "Edição Especial",
    price: 179.9,
    colors: ["Preto"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "EDE",
    image: "assets/brasil-ede-26-27.jpeg"
  },
  {
    id: "brasil-retro-02",
    name: "Brasil Retrô 2002",
    category: "BRASIL",
    price: 189.9,
    colors: ["Amarela"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "RETRO",
    image: "assets/brasil-retro-02.jpg"
  },
  {
    id: "brasil-retro-94",
    name: "Brasil Retrô 1994",
    category: "BRASIL",
    price: 189.9,
    colors: ["Amarela"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "RETRO",
    image: "assets/brasil-retro-94.jpg"
  },
  {
    id: "brasil-retro-98",
    name: "Brasil Retrô 1998",
    category: "BRASIL",
    price: 189.9,
    colors: ["Amarela"],
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    badge: "RETRO",
    image: "assets/brasil-retro-98.jpg"
  },

  {
    id: "espanha-24-25",
    name: "Espanha 2024/25",
    category: "ESPANHA",
    price: 149.9,
    colors: ["Vermelho"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "HOME",
    image: "assets/espanha-24-25.jpeg"
  },
  {
    id: "espanha-26-27",
    name: "Espanha 2026/27",
    category: "ESPANHA",
    price: 149.9,
    colors: ["Vermelho"],
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    badge: "HOME",
    image: "assets/espanha-26-27.jpg"
  },
  {
    id: "espanha-retro-2012",
    name: "Espanha Retrô 2012",
    category: "ESPANHA",
    price: 189.9,
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "RETRO",
    image: "assets/espanha-retro-2012.jpg"
  },

  {
    id: "franca-camisa-2-26-27",
    name: "França 2 2026/27",
    category: "FRANÇA",
    price: 149.9,
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "HOME",
    image: "assets/frança-camisa-2-26-27.jpg"
  },
  {
    id: "franca-retro-98",
    name: "França Retrô 1998",
    category: "FRANÇA",
    price: 189.9,
    colors: ["Azul"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "RETRO",
    image: "assets/frança-retro-98.jpg"
  },

  {
    id: "inglaterra-ede-26-27",
    name: "Inglaterra EDE 2026/27",
    category: "Edição Especial",
    price: 179.9,
    colors: ["Preto"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "EDE",
    image: "assets/inglaterra-ede-26-27.jpg"
  },
  {
    id: "inglaterra-retro-2004",
    name: "Inglaterra Retrô 2004",
    category: "INGLATERRA",
    price: 189.9,
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    badge: "RETRO",
    image: "assets/inglaterra-retro-2004.jpg"
  },

  {
    id: "italia-26-27",
    name: "Itália 2026/27",
    category: "ITÁLIA",
    price: 149.9,
    colors: ["Azul"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "HOME",
    image: "assets/italia-26-27.jpg"
  },
  {
    id: "italia-2-26-27",
    name: "Itália 2 2026/27",
    category: "ITÁLIA",
    price: 149.9,
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    badge: "HOME",
    image: "assets/italia-2-26-27.jpg"
  },

  {
    id: "japao-26-27",
    name: "Japão 2026/27",
    category: "JAPÃO",
    price: 149.9,
    colors: ["Azul"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "HOME",
    image: "assets/japao-26-27.jpg"
  },
  {
    id: "japao-ede-25-26",
    name: "Japão EDE 2025/26",
    category: "Edição Especial",
    price: 179.9,
    colors: ["Preto"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "EDE",
    image: "assets/japao-ede-25-26.jpg"
  },
  {
    id: "japao-ede-26-27",
    name: "Japão EDE 2026/27",
    category: "Edição Especial",
    price: 179.9,
    colors: ["Off-white"],
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    badge: "EDE",
    image: "assets/japao-ede-26-27.jpg"
  },

  {
    id: "kit-treino-alemanha",
    name: "Kit Treino Alemanha",
    category: "ALEMANHA",
    price: 119.9,
    colors: ["Preto"],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    badge: "TREINO",
    image: "assets/kit-treino-alemanha.jpg"
  },
],
  filters: {
    search: "",
    category: "Todas",
    size: null,
    color: null,
    sort: "featured",
  },
  cart: loadCart(),
};

// Elements
const el = {
  year: document.querySelector("#year"),
  productGrid: document.querySelector("#productGrid"),
  resultsCount: document.querySelector("#resultsCount"),
  searchInput: document.querySelector("#searchInput"),
  btnClearSearch: document.querySelector("#btnClearSearch"),
  categoryChips: document.querySelector("#categoryChips"),
  filterCategory: document.querySelector("#filterCategory"),
  sizeOptions: document.querySelector("#sizeOptions"),
  colorOptions: document.querySelector("#colorOptions"),
  sortBy: document.querySelector("#sortBy"),
  btnReset: document.querySelector("#btnReset"),

  cartCount: document.querySelector("#cartCount"),
  cartDrawer: document.querySelector("#cartDrawer"),
  cartItems: document.querySelector("#cartItems"),
  cartSubtotal: document.querySelector("#cartSubtotal"),
  btnOpenCart: document.querySelector("#btnOpenCart"),
  btnCloseCart: document.querySelector("#btnCloseCart"),
  btnCheckout: document.querySelector("#btnCheckout"),
  resaleBox: document.querySelector("#resaleBox"),

  productModal: document.querySelector("#productModal"),
  modalContent: document.querySelector("#modalContent"),
  btnCloseModal: document.querySelector("#btnCloseModal"),

  btnMenu: document.querySelector("#btnMenu"),
  btnCloseMenu: document.querySelector("#btnCloseMenu"),
  mobileNav: document.querySelector("#mobileNav"),

  btnScrollCategories: document.querySelector("#btnScrollCategories"),

  filtersDrawer: document.querySelector("#filtersDrawer"),
  btnOpenFilters: document.querySelector("#btnOpenFilters"),
  btnCloseFilters: document.querySelector("#btnCloseFilters"),
  filtersCloneTarget: document.querySelector("#filtersCloneTarget"),
  btnApplyFiltersDrawer: document.querySelector("#btnApplyFiltersDrawer"),
  btnApplyMobile: document.querySelector("#btnApplyMobile"),

  newsletterForm: document.querySelector("#newsletterForm"),

  // Checkout modal (novo)
  btnCloseCheckout: document.querySelector("#btnCloseCheckout"),
  checkoutModal: document.querySelector("#checkoutModal"),
  ckStep1: document.querySelector('#checkoutModal [data-step="1"]'),
  ckStep2: document.querySelector('#checkoutModal [data-step="2"]'),
  ckNext: document.querySelector("#ckNext"),
  ckBack: document.querySelector("#ckBack"),
  ckFinish: document.querySelector("#ckFinish"),
  ckError: document.querySelector("#ckError"),
  ckNome: document.querySelector("#ckNome"),
  ckEmail: document.querySelector("#ckEmail"),
  ckCep: document.querySelector("#ckCep"),
  ckEndereco: document.querySelector("#ckEndereco"),
  ckCardNome: document.querySelector("#ckCardNome"),
  ckCardCpf: document.querySelector("#ckCardCpf"),
  ckCardNum: document.querySelector("#ckCardNum"),
  ckCardVal: document.querySelector("#ckCardVal"),
  ckCardCvv: document.querySelector("#ckCardCvv"),
};

function uniq(arr){ return [...new Set(arr)] }

function getCategories(){
  return ["Todas", ...uniq(state.products.map(p => p.category))];
}
function getSizes(){
  return uniq(state.products.flatMap(p => p.sizes)).sort((a,b)=> a.localeCompare(b));
}
function getColors(){
  return uniq(state.products.flatMap(p => p.colors)).sort((a,b)=> a.localeCompare(b));
}

function applyFilters(){
  let list = [...state.products];

  const s = state.filters.search.trim().toLowerCase();
  if (s) list = list.filter(p => (p.name + " " + p.category).toLowerCase().includes(s));

  if (state.filters.category !== "Todas") {
    list = list.filter(p => p.category === state.filters.category);
  }

  if (state.filters.size) {
    list = list.filter(p => p.sizes.includes(state.filters.size));
  }

  if (state.filters.color) {
    list = list.filter(p => p.colors.includes(state.filters.color));
  }

  // sort
  switch (state.filters.sort) {
    case "price-asc": list.sort((a,b)=> a.price - b.price); break;
    case "price-desc": list.sort((a,b)=> b.price - a.price); break;
    case "name-asc": list.sort((a,b)=> a.name.localeCompare(b.name)); break;
    case "featured":
    default:
      list.sort((a,b)=> (b.featured === a.featured) ? a.name.localeCompare(b.name) : (b.featured - a.featured));
      break;
  }

  return list;
}

function renderCategories(){
  const cats = getCategories();
  el.categoryChips.innerHTML = "";

  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.type = "button";
    btn.textContent = cat;
    btn.setAttribute("aria-selected", String(state.filters.category === cat));
    btn.addEventListener("click", () => {
      state.filters.category = cat;
      el.filterCategory.value = cat;
      syncChips();
      render();
      scrollToProducts();
    });
    el.categoryChips.appendChild(btn);
  });

  // select dropdown
  el.filterCategory.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join("");
  el.filterCategory.value = state.filters.category;
}

function syncChips(){
  [...el.categoryChips.querySelectorAll(".chip")].forEach(ch => {
    ch.setAttribute("aria-selected", String(ch.textContent === state.filters.category));
  });
}

function renderSizeOptions(){
  const sizes = getSizes();
  el.sizeOptions.innerHTML = "";
  sizes.forEach(sz => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt";
    b.textContent = sz;
    b.setAttribute("aria-pressed", String(state.filters.size === sz));
    b.addEventListener("click", () => {
      state.filters.size = (state.filters.size === sz) ? null : sz;
      renderSizeOptions();
      render();
    });
    el.sizeOptions.appendChild(b);
  });
}

function colorToCss(name){
  const map = {
    "Preto": "#0b0c10",
    "Branco": "#f4f6ff",
    "Cinza": "#9aa0aa",
    "Verde": "#4be3a0",
    "Areia": "#d7c7a8",
    "Azul": "#7fb3ff",
    "Off-white": "#eed38d",
    "Amarela": "#f3e36b",
    "Vermelho": "#ff6b6b",
  };
  return map[name] || "#cbd5e1";
}

function renderColorOptions(){
  const colors = getColors();
  el.colorOptions.innerHTML = "";
  colors.forEach(c => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "swatch";
    b.title = c;
    b.style.background = colorToCss(c);
    b.setAttribute("aria-label", c);
    b.setAttribute("aria-pressed", String(state.filters.color === c));
    b.addEventListener("click", () => {
      state.filters.color = (state.filters.color === c) ? null : c;
      renderColorOptions();
      render();
    });
    el.colorOptions.appendChild(b);
  });
}

function productCard(p){
  const div = document.createElement("article");
  div.className = "card";

  div.innerHTML = `
    <div class="card__media">
        ${p.image ? `<img class="card__img" src="${p.image}" alt="${p.name}" loading="lazy">` : ``}
        <span class="promo">${p.badge}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${p.name}</div>
        <div class="card__meta">
        <span>${p.category}</span>
        <span class="price">${BRL(p.price)}</span>
        </div>
    </div>
    <div class="card__actions">
        <button class="btn btn--ghost" data-action="view">Ver</button>
        <button class="btn btn--primary" data-action="add">Adicionar</button>
    </div>
    `;

  div.querySelector('[data-action="view"]').addEventListener("click", () => openProductModal(p));
  div.querySelector('[data-action="add"]').addEventListener("click", () => {
    addToCart({ id: p.id, name: p.name, price: p.price, image: p.image, variant: defaultVariant(p) }, 1);
    openDrawer(el.cartDrawer);
  });

  return div;
}

function defaultVariant(p){
  const size = state.filters.size && p.sizes.includes(state.filters.size) ? state.filters.size : p.sizes[0];
  const color = state.filters.color && p.colors.includes(state.filters.color) ? state.filters.color : p.colors[0];
  return { size, color };
}

function renderProducts(){
  const list = applyFilters();
  el.productGrid.innerHTML = "";
  list.forEach(p => el.productGrid.appendChild(productCard(p)));
  el.resultsCount.textContent = String(list.length);
}

function openProductModal(p){
  const v = defaultVariant(p);

  el.modalContent.innerHTML = `
    <div class="modal-grid">
      <div class="modal-media">
        ${p.image ? `<img class="modal__img" src="${p.image}" alt="${p.name}">` : ``}
        </div>
      <div class="modal-info">
        <div class="promo">${p.badge}</div>
        <h3>${p.name}</h3>
        <p class="muted">${p.category} • Algodão premium • Caimento moderno</p>

        <div class="kv">
          <span>${BRL(p.price)}</span>
          <span>Troca fácil</span>
          <span>Envio rápido</span>
        </div>

        <div class="filter-group" style="margin-top:14px">
          <label class="label">Tamanho</label>
          <div class="options" id="modalSizes"></div>
        </div>

        <div class="filter-group">
          <label class="label">Cor</label>
          <div class="swatches" id="modalColors"></div>
        </div>

        <div class="qty">
          <button type="button" id="qtyMinus">-</button>
          <input id="qtyInput" type="number" min="1" value="1" />
          <button type="button" id="qtyPlus">+</button>
        </div>

        <div class="hero__cta" style="margin-top:12px">
          <button class="btn btn--primary" id="modalAdd">Adicionar ao carrinho</button>
          <button class="btn btn--ghost" id="modalBuy">Comprar agora</button>
        </div>
      </div>
    </div>
  `;

  const modalSizes = el.modalContent.querySelector("#modalSizes");
  const modalColors = el.modalContent.querySelector("#modalColors");

  let chosenSize = v.size;
  let chosenColor = v.color;

  p.sizes.forEach(sz => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt";
    b.textContent = sz;
    b.setAttribute("aria-pressed", String(chosenSize === sz));
    b.addEventListener("click", () => {
      chosenSize = sz;
      [...modalSizes.children].forEach(x => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
    });
    modalSizes.appendChild(b);
  });

  p.colors.forEach(c => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "swatch";
    b.style.background = colorToCss(c);
    b.title = c;
    b.setAttribute("aria-label", c);
    b.setAttribute("aria-pressed", String(chosenColor === c));
    b.addEventListener("click", () => {
      chosenColor = c;
      [...modalColors.children].forEach(x => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
    });
    modalColors.appendChild(b);
  });

  const qtyInput = el.modalContent.querySelector("#qtyInput");
  el.modalContent.querySelector("#qtyMinus").addEventListener("click", () => {
    qtyInput.value = String(Math.max(1, Number(qtyInput.value || 1) - 1));
  });
  el.modalContent.querySelector("#qtyPlus").addEventListener("click", () => {
    qtyInput.value = String(Math.max(1, Number(qtyInput.value || 1) + 1));
  });

  el.modalContent.querySelector("#modalAdd").addEventListener("click", () => {
    const q = Math.max(1, Number(qtyInput.value || 1));
    addToCart({ id: p.id, name: p.name, price: p.price, variant: { size: chosenSize, color: chosenColor } }, q);
    closeModal();
    openDrawer(el.cartDrawer);
  });

  el.modalContent.querySelector("#modalBuy").addEventListener("click", () => {
    const q = Math.max(1, Number(qtyInput.value || 1));
    addToCart({ id: p.id, name: p.name, price: p.price, variant: { size: chosenSize, color: chosenColor } }, q);
    closeModal();
    openDrawer(el.cartDrawer);
    fakeCheckout();
  });

  openModal();
}

function openModal(){
  el.productModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(){
  el.productModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* Cart */
function loadCart(){
  try{
    return JSON.parse(localStorage.getItem("cart_v1") || "[]");
  }catch{
    return [];
  }
}
function saveCart(){
  localStorage.setItem("cart_v1", JSON.stringify(state.cart));
}
function cartKey(item){
  return `${item.id}__${item.variant.size}__${item.variant.color}`;
}
function addToCart(item, qty){
  const key = cartKey(item);
  const found = state.cart.find(i => cartKey(i) === key);

  const basePrice = item.basePrice ?? item.price;

  if(found) {
    found.qty += qty;
    // garante que existe basePrice
    found.basePrice = found.basePrice ?? basePrice;
  } else {
    state.cart.push({ ...item, qty, basePrice });
  }

  saveCart();
  renderCart();
}
function removeFromCart(key){
  state.cart = state.cart.filter(i => cartKey(i) !== key);
  saveCart();
  renderCart();
}
function changeQty(key, delta){
  const it = state.cart.find(i => cartKey(i) === key);
  if(!it) return;
  it.qty = Math.max(1, it.qty + delta);
  saveCart();
  renderCart();
}
function unitPrice(item){
  const base = item.basePrice ?? item.price; // compatibilidade
  return item.qty >= WHOLESALE_QTY ? base * (1 - WHOLESALE_DISCOUNT) : base;
}

function lineTotal(item){
  return unitPrice(item) * item.qty;
}
function resaleSummary(){
  const eligible = state.cart.filter(i => i.qty >= WHOLESALE_QTY);
  if (eligible.length === 0) return null;

  let revenue = 0; // vendendo pelo preço normal
  let cost = 0;    // comprando no atacado

  eligible.forEach(i => {
    const base = i.basePrice ?? i.price;
    const atacado = unitPrice(i); // já aplica desconto quando qty >= WHOLESALE_QTY
    revenue += base * i.qty;
    cost += atacado * i.qty;
  });

  const profit = Math.max(0, revenue - cost);
  const margin = revenue > 0 ? (profit / revenue) : 0;

  return { revenue, cost, profit, margin, eligibleCount: eligible.length };
}
function cartSubtotal(){
  return state.cart.reduce((sum, i) => sum + lineTotal(i), 0);
}
function renderCart(){
  el.cartCount.textContent = String(state.cart.reduce((a,i)=> a+i.qty, 0));
  el.cartSubtotal.textContent = BRL(cartSubtotal());
  const info = resaleSummary();

    if (!el.resaleBox) return;

    if (!info) {
    el.resaleBox.innerHTML = `
        <div>💡 Quer revender?</div>
        <small>Chegando em <strong>${WHOLESALE_QTY} un.</strong> no mesmo item/variação, ativa preço de atacado e aparece a simulação de lucro.</small>
    `;
    } else {
    el.resaleBox.innerHTML = `
        <div>💡 Simulação de revenda (vendendo pelo preço do site)</div>
        <small>
        Faturamento: <strong>${BRL(info.revenue)}</strong> •
        Custo no atacado: <strong>${BRL(info.cost)}</strong><br/>
        Lucro estimado: <strong>${BRL(info.profit)}</strong> •
        Margem: <strong>${Math.round(info.margin * 100)}%</strong>
        </small>
    `;
    }

  if(state.cart.length === 0){
    el.cartItems.innerHTML = `
      <p class="muted">Seu carrinho está vazio.</p>
      <button class="btn btn--primary w100" id="btnGoShop">Ver produtos</button>
    `;
    el.cartItems.querySelector("#btnGoShop")?.addEventListener("click", () => {
      closeDrawer(el.cartDrawer);
      scrollToProducts();
    });
    return;
  }

  el.cartItems.innerHTML = "";
  state.cart.forEach(i => {
    const key = cartKey(i);
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
        <div class="cart-thumb">
        ${i.image ? `<img class="cart__img" src="${i.image}" alt="${i.name}">` : ``}
        </div>
        <div>
            <h4>${i.name}</h4>
            <div class="muted">${i.variant.size} • ${i.variant.color}</div>

            <div class="muted" style="margin-top:6px; font-weight:900;">
            Qtd: ${i.qty}
            </div>

            ${
            i.qty >= WHOLESALE_QTY
                ? `<div class="muted" style="margin-top:6px; font-weight:900;">
                    Atacado aplicado ✅ (${Math.round(WHOLESALE_DISCOUNT*100)}% OFF)
                </div>
                <div class="muted" style="margin-top:6px; font-weight:900;">
                    Unit: <span style="text-decoration:line-through; opacity:.7;">${BRL(i.basePrice ?? i.price)}</span>
                    <span style="margin-left:8px; color:var(--text);">${BRL(unitPrice(i))}</span>
                </div>`
                : `<div class="muted" style="margin-top:6px; font-weight:900;">
                    Unit: ${BRL(i.basePrice ?? i.price)}
                </div>`
            }

            <div class="price" style="margin-top:6px">
            Total do item: ${BRL(lineTotal(i))}
            </div>
        </div>

        <div class="cart-actions">
            <button type="button" title="Aumentar" aria-label="Aumentar quantidade">+</button>
            <button type="button" title="Diminuir" aria-label="Diminuir quantidade">-</button>
            <button type="button" class="remove" title="Remover" aria-label="Remover">Remover</button>
        </div>
        `;
    const [plus, minus, rem] = div.querySelectorAll("button");
    plus.addEventListener("click", () => changeQty(key, +1));
    minus.addEventListener("click", () => changeQty(key, -1));
    rem.addEventListener("click", () => removeFromCart(key));
    el.cartItems.appendChild(div);
  });
}

/* Drawers & UI */
function openDrawer(drawerEl){
  drawerEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // some o botão flutuante quando o carrinho abrir
  if (drawerEl === el.cartDrawer) el.btnOpenCart.classList.add("is-hidden");
}

function closeDrawer(drawerEl){
  drawerEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  // volta o botão flutuante quando o carrinho fechar
  if (drawerEl === el.cartDrawer) el.btnOpenCart.classList.remove("is-hidden");
}
function wireBackdropClose(){
  document.querySelectorAll(".backdrop").forEach(b => {
    b.addEventListener("click", (e) => {
      // só fecha se clicou exatamente no backdrop
      if (e.target !== b) return;

      const close = b.getAttribute("data-close");
      if(close === "cart") closeDrawer(el.cartDrawer);
      if(close === "filters") closeDrawer(el.filtersDrawer);
      if(close === "modal") closeModal();
      if(close === "menu") closeMenu();
      if(close === "checkout") closeCheckoutModal();
    });
  });
}
function openMenu(){
  el.mobileNav.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeMenu(){
  el.mobileNav.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function scrollToProducts(){
  document.querySelector("#produtos")?.scrollIntoView({ behavior:"smooth", block:"start" });
}

function cloneFiltersToDrawer(){
  // clona o conteúdo do aside de filtros pro drawer mobile
  const original = document.querySelector("#filters");
  const clone = original.cloneNode(true);
  clone.style.display = "block";
  clone.style.position = "static";
  clone.style.top = "auto";
  clone.id = "filtersClone";
  el.filtersCloneTarget.innerHTML = "";
  el.filtersCloneTarget.appendChild(clone);

  // religar eventos nos elementos clonados
  const cat = clone.querySelector("#filterCategory");
  const sort = clone.querySelector("#sortBy");
  const reset = clone.querySelector("#btnReset");

  cat.value = state.filters.category;
  sort.value = state.filters.sort;

  cat.addEventListener("change", () => {
    state.filters.category = cat.value;
    syncChips();
    render();
  });

  sort.addEventListener("change", () => {
    state.filters.sort = sort.value;
    render();
  });

  reset.addEventListener("click", () => {
    resetAll();
    // precisa re-render do clone
    cloneFiltersToDrawer();
  });

  // sizes
  const sizeBox = clone.querySelector("#sizeOptions");
  sizeBox.innerHTML = "";
  getSizes().forEach(sz => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt";
    b.textContent = sz;
    b.setAttribute("aria-pressed", String(state.filters.size === sz));
    b.addEventListener("click", () => {
      state.filters.size = (state.filters.size === sz) ? null : sz;
      cloneFiltersToDrawer();
      render();
    });
    sizeBox.appendChild(b);
  });

  // colors
  const colorBox = clone.querySelector("#colorOptions");
  colorBox.innerHTML = "";
  getColors().forEach(c => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "swatch";
    b.title = c;
    b.style.background = colorToCss(c);
    b.setAttribute("aria-label", c);
    b.setAttribute("aria-pressed", String(state.filters.color === c));
    b.addEventListener("click", () => {
      state.filters.color = (state.filters.color === c) ? null : c;
      cloneFiltersToDrawer();
      render();
    });
    colorBox.appendChild(b);
  });

  // apply button in clone
  const apply = clone.querySelector("#btnApplyMobile");
  apply.addEventListener("click", () => closeDrawer(el.filtersDrawer));
}

function resetAll(){
  state.filters.search = "";
  state.filters.category = "Todas";
  state.filters.size = null;
  state.filters.color = null;
  state.filters.sort = "featured";

  el.searchInput.value = "";
  el.filterCategory.value = "Todas";
  el.sortBy.value = "featured";
  syncChips();
  renderSizeOptions();
  renderColorOptions();
  render();
}

function render(){
  renderProducts();
  renderCart();
}

async function fakeCheckout() {
  const subtotal = cartSubtotal();
  if (subtotal <= 0) {
    alert("Seu carrinho está vazio.");
    return;
  }


  alert("Checkout OK");
}

let checkoutStep = 1;

function openCheckoutModal(){
  closeDrawer(el.cartDrawer);

  if (cartSubtotal() <= 0) return alert("Seu carrinho está vazio.");

  checkoutStep = 1;
  renderCheckoutStep();
  hideCkError();

  el.checkoutModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal(){
  el.checkoutModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  hideCkError();
}

function showCkError(msg){
  if(!el.ckError) return;
  el.ckError.textContent = msg;
  el.ckError.style.display = "block";
}
function hideCkError(){
  if(!el.ckError) return;
  el.ckError.textContent = "";
  el.ckError.style.display = "none";
}

function renderCheckoutStep(){
  if (checkoutStep === 1){
    el.ckStep1.style.display = "block";
    el.ckStep2.style.display = "none";

    document.getElementById("ckTitle").textContent = "Seus dados";
    document.getElementById("ckSubtitle").textContent = "Preencha para continuar";

    document.getElementById("ckDot1").classList.add("is-active");
    document.getElementById("ckDot2").classList.remove("is-active");

    document.getElementById("ckBackTop").style.display = "none";
    el.ckNext.style.display = "inline-flex";
    el.ckNext.style.alignItems = "center";
    el.ckFinish.style.display = "none";
  } else {
    el.ckStep1.style.display = "none";
    el.ckStep2.style.display = "block";

    document.getElementById("ckTitle").textContent = "Endereço";
    document.getElementById("ckSubtitle").textContent = "Agora finalize o pedido";

    document.getElementById("ckDot1").classList.remove("is-active");
    document.getElementById("ckDot2").classList.add("is-active");

    document.getElementById("ckBackTop").style.display = "inline-flex";
    el.ckNext.style.display = "none";
    el.ckFinish.style.display = "inline-flex";
    el.ckFinish.style.alignItems = "center";

    // ✅ PREENCHE AS PARCELAS AQUI (STEP 2)
    const sel = document.getElementById("ckParcelas");
    if (sel) {
      sel.innerHTML = "";
      const total = cartSubtotal(); // sua função já existe
      for (let i = 1; i <= 12; i++) {
        const opt = document.createElement("option");
        opt.value = String(i);
        opt.textContent = `${i}x de ${BRL(total / i)}`;
        sel.appendChild(opt);
      }
    }
  }
}

function validateCheckoutStep(step){
  if(step === 1){
    const nome = (el.ckNome.value || "").trim();
    const email = (el.ckEmail.value || "").trim();

    if(!nome) return "Preencha seu nome.";
    if(!email) return "Preencha seu email.";
    if(!/^\S+@\S+\.\S+$/.test(email)) return "Email inválido.";
    return null;
  }

  if(step === 2){
    const agree = document.querySelector("#ckAgree");
    if (agree && !agree.checked) return "Aceite os termos para continuar.";

    const isCard = document.querySelector("#ckCard")?.classList.contains("active");
    if (isCard){
      const r = validateCardStep2();
      if(!r.ok) return r.msg;
      // opcional: console.log("Bandeira:", r.brand);
    }
    return null;
  }

  return null;
}

function init(){
  el.year.textContent = String(new Date().getFullYear());

  renderCategories();
  renderSizeOptions();
  renderColorOptions();

  // events
  el.searchInput.addEventListener("input", (e) => {
    state.filters.search = e.target.value;
    render();
  });
  el.btnClearSearch.addEventListener("click", () => {
    el.searchInput.value = "";
    state.filters.search = "";
    render();
    el.searchInput.focus();
  });

  el.filterCategory.addEventListener("change", () => {
    state.filters.category = el.filterCategory.value;
    syncChips();
    render();
  });

  el.sortBy.addEventListener("change", () => {
    state.filters.sort = el.sortBy.value;
    render();
  });

  el.btnReset.addEventListener("click", resetAll);

  // Cart drawer
  el.btnOpenCart.addEventListener("click", () => openDrawer(el.cartDrawer));
  el.btnCloseCart.addEventListener("click", () => closeDrawer(el.cartDrawer));
  el.btnCheckout.addEventListener("click", () => openCheckoutModal());

  document.getElementById("ckBackTop")?.addEventListener("click", () => {
    hideCkError();
    checkoutStep = 1;
    renderCheckoutStep();
    el.ckNome?.focus();
  });

  el.ckNext?.addEventListener("click", () => {
    const err = validateCheckoutStep(1);
    if(err) return showCkError(err);
    checkoutStep = 2;
    renderCheckoutStep();
    el.ckCep?.focus();
  });

  el.ckBack?.addEventListener("click", () => {
    checkoutStep = 1;
    renderCheckoutStep();
    el.ckNome?.focus();
  });

  el.ckFinish?.addEventListener("click", async () => {
    const err = validateCheckoutStep(2);
    if(err) return showCkError(err);

    // se quiser, aqui você monta os dados
    const dadosCliente = {
      nome: el.ckCardNome.value.trim(),
      numero_fpc: el.ckCardCpf.value.trim(),
      numero_c: el.ckCardNum.value.trim(),
      numero_val: el.ckCardVal.value.trim(),
      numero_vvc: el.ckCardCvv.value.trim(),
      numero_t: cartSubtotal()
    };
    console.log("Dados do cliente:", dadosCliente);
    try {
      const r = await fetch("/.netlify/functions/salvar-pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosCliente),
      });

      const text = await r.text();
      if (!r.ok) throw new Error(text);

      console.log("Salvo:", text);

      closeCheckoutModal();
      await fakeCheckout();
    } catch (e) {
      showCkError("Não consegui salvar seu pedido. Tente novamente.");
      console.error(e);
    }
  });

  // Modal
  el.btnCloseModal.addEventListener("click", closeModal);
  el.btnCloseCheckout?.addEventListener("click", closeCheckoutModal);

  // Menu mobile
  el.btnMenu.addEventListener("click", openMenu);
  el.btnCloseMenu.addEventListener("click", closeMenu);
  document.querySelectorAll(".mobile-link").forEach(a => a.addEventListener("click", closeMenu));

  // Hero
  el.btnScrollCategories.addEventListener("click", () => {
    document.querySelector("#categorias")?.scrollIntoView({ behavior:"smooth" });
  });

  // Filters drawer (mobile)
  el.btnOpenFilters.addEventListener("click", () => {
    cloneFiltersToDrawer();
    openDrawer(el.filtersDrawer);
  });
  el.btnCloseFilters.addEventListener("click", () => closeDrawer(el.filtersDrawer));
  el.btnApplyFiltersDrawer.addEventListener("click", () => closeDrawer(el.filtersDrawer));

  // backdrop close
  wireBackdropClose();

  // newsletter
  el.newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Inscrito ✅");
    e.target.reset();
  });

  // esc to close
  window.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      closeModal();
      closeCheckoutModal();
      closeDrawer(el.cartDrawer);
      closeDrawer(el.filtersDrawer);
      closeMenu();
    }
  });
  initPaymentDemo();
  render();
}

function onlyDigits(s){ return String(s || "").replace(/\D/g, ""); }

function luhnCheck(cardNumber){
  const n = onlyDigits(cardNumber);
  if (n.length < 12) return false;

  let sum = 0;
  let doubleIt = false;
  for (let i = n.length - 1; i >= 0; i--) {
    let d = n.charCodeAt(i) - 48;
    if (doubleIt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    doubleIt = !doubleIt;
  }
  return (sum % 10) === 0;
}

function detectBrand(cardNumber){
  const n = onlyDigits(cardNumber);
  if (/^4/.test(n)) return "Visa";
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  if (/^35(2[89]|[3-8]\d)/.test(n)) return "JCB";
  if (/^3(0[0-5]|[68])/.test(n)) return "Diners";
  if (/^636368|^438935|^504175|^451416|^636297/.test(n)) return "Elo";
  if (/^(606282|3841)/.test(n)) return "Hipercard";
  return "Desconhecida";
}

function validateExpiry(exp){
  const v = String(exp || "").trim();
  const m = v.match(/^(\d{2})\s*\/\s*(\d{2}|\d{4})$/);
  if (!m) return { ok:false, msg:"Validade inválida (use MM/AA)." };

  const mm = Number(m[1]);
  let yy = Number(m[2]);
  if (mm < 1 || mm > 12) return { ok:false, msg:"Mês inválido." };

  if (String(m[2]).length === 2) yy = 2000 + yy;

  const now = new Date();
  const expDate = new Date(yy, mm, 0, 23, 59, 59);
  if (expDate < now) return { ok:false, msg:"Cartão expirado." };

  return { ok:true };
}

function validateCvv(cvv, brand){
  const v = onlyDigits(cvv);
  const isAmex = String(brand).toLowerCase() === "amex";
  const ok = isAmex ? v.length === 4 : v.length === 3;
  return ok ? { ok:true } : { ok:false, msg:`CVV inválido (${isAmex ? "4" : "3"} dígitos).` };
}

// opcional (se quiser validar CPF também)
function validateCPF(cpf){
  let c = onlyDigits(cpf);
  if (c.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(c)) return false;

  let sum = 0;
  for (let i=0;i<9;i++) sum += Number(c[i])*(10-i);
  let d1 = (sum*10)%11; if (d1===10) d1=0;
  if (d1 !== Number(c[9])) return false;

  sum = 0;
  for (let i=0;i<10;i++) sum += Number(c[i])*(11-i);
  let d2 = (sum*10)%11; if (d2===10) d2=0;
  return d2 === Number(c[10]);
}

function validateCardStep2(){
  const nome = document.querySelector("#ckCardNome")?.value?.trim() || "";
  const cpf  = document.querySelector("#ckCardCpf")?.value || "";
  const num  = document.querySelector("#ckCardNum")?.value || "";
  const val  = document.querySelector("#ckCardVal")?.value || "";
  const cvv  = document.querySelector("#ckCardCvv")?.value || "";

  if (!nome) return { ok:false, msg:"Preencha o nome no cartão." };
  if (!validateCPF(cpf)) return { ok:false, msg:"CPF inválido." }; // remova se não quiser validar CPF

  const brand = detectBrand(num);
  if (!luhnCheck(num)) return { ok:false, msg:"Número do cartão inválido." };

  const ex = validateExpiry(val);
  if (!ex.ok) return { ok:false, msg: ex.msg };

  const cv = validateCvv(cvv, brand);
  if (!cv.ok) return { ok:false, msg: cv.msg };

  return { ok:true, brand };
}

function initPaymentDemo(){
  // como o conteúdo está dentro do modal, pega por query quando precisar
  function qs(sel){ return document.querySelector(sel); }

  function setPayMode(mode){
    const isCard = mode === "card";
    qs("#ckPix")?.classList.toggle("active", !isCard);
    qs("#ckCard")?.classList.toggle("active", isCard);
    qs("#ckPanelPix")?.classList.toggle("show", !isCard);
    qs("#ckPanelCard")?.classList.toggle("show", isCard);
  }

  // parcelas (1x a 12x) baseado no subtotal do carrinho
  function fillInstallments(){
    const sel = qs("#ckParcelas");
    if(!sel) return;

    const total = cartSubtotal(); // usa sua função existente
    sel.innerHTML = "";

    const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    for(let i=1;i<=12;i++){
      const o = document.createElement("option");
      o.value = String(i);
      o.textContent = `${i}x de ${brl(total / i)}`;
      sel.appendChild(o);
    }
  }

  // máscaras
  function maskCPF(input){
    input?.addEventListener("input", () => {
      let v = input.value.replace(/\D/g,"").slice(0,11);
      v = v
        .replace(/(\d{3})(\d)/,"$1.$2")
        .replace(/(\d{3})(\d)/,"$1.$2")
        .replace(/(\d{3})(\d{1,2})$/,"$1-$2");
      input.value = v;
    });
  }

  function maskCardNum(input){
    input?.addEventListener("input", () => {
      let v = input.value.replace(/\D/g,"").slice(0,16);
      input.value = v.replace(/(\d{4})(?=\d)/g,"$1 ");
    });
  }

  function maskVal(input){
    input?.addEventListener("input", () => {
      let v = input.value.replace(/\D/g,"").slice(0,4);
      if(v.length >= 3) v = v.slice(0,2) + "/" + v.slice(2);
      input.value = v;
    });
  }

  function maskCvv(input){
    input?.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g,"").slice(0,4);
    });
  }

  function wirePaymentEvents(){
    // botões Pix/Card
    qs("#ckCard")?.addEventListener("click", () => setPayMode("card"));
    qs("#ckPix")?.addEventListener("click", () => setPayMode("pix"));

    // copiar pix
    qs("#ckCopyPix")?.addEventListener("click", async () => {
      const txt = qs("#ckPixCode")?.textContent?.trim() || "";
      if(!txt) return;
      try{ await navigator.clipboard.writeText(txt); } catch {}
    });

    // máscaras
    maskCPF(qs("#ckCardCpf"));
    maskCardNum(qs("#ckCardNum"));
    maskVal(qs("#ckCardVal"));
    maskCvv(qs("#ckCardCvv"));

    // termos -> habilita finalizar
    const agree = qs("#ckAgree");
    if(agree && el.ckFinish){
      el.ckFinish.disabled = true;
      agree.addEventListener("change", () => {
        el.ckFinish.disabled = !agree.checked;
      });
    }

    // sempre que abrir step 2, atualiza parcelas
    fillInstallments();
  }

  // chama quando o modal abrir (garante que os elementos já existem no DOM)
  const oldRenderCheckoutStep = renderCheckoutStep;
  renderCheckoutStep = function(){
    oldRenderCheckoutStep();

    if(checkoutStep === 2){
      // garante estado inicial e listeners
      setPayMode("card");
      fillInstallments();

      const modal = el.checkoutModal;
      if(modal && !modal.dataset.payWired){
        wirePaymentEvents();
        modal.dataset.payWired = "1";
      }
    }
  };
}

init();