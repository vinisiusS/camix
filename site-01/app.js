const BRL = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const WHOLESALE_QTY = 10;        // a partir de 10 unidades
const WHOLESALE_DISCOUNT = 0.70; // 70% OFF (troque aqui)

const state = {
  products: window.PRODUCTS || [],
  filters: {
    search: "",
    category: "Todas",
    size: null,
    color: null,
    sort: "featured",
  },
  cart: loadCart(),
  appliedCoupon: loadCoupon(),
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

  couponCode: document.querySelector("#couponCode"),
  btnApplyCoupon: document.querySelector("#btnApplyCoupon"),
  btnRemoveCoupon: document.querySelector("#btnRemoveCoupon"),
  couponFeedback: document.querySelector("#couponFeedback"),
  cartDiscountRow: document.querySelector("#cartDiscountRow"),
  cartDiscount: document.querySelector("#cartDiscount"),
  cartTotal: document.querySelector("#cartTotal"),

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

  successModal: document.querySelector("#successModal"),
  btnCloseSuccessModal: document.querySelector("#btnCloseSuccessModal"),
  btnFinishInvoice: document.querySelector("#btnFinishInvoice"),
  btnPrintInvoice: document.querySelector("#btnPrintInvoice"),
  invoiceItems: document.querySelector("#invoiceItems"),
  invoiceSubtotal: document.querySelector("#invoiceSubtotal"),
  invoiceDiscountRow: document.querySelector("#invoiceDiscountRow"),
  invoiceDiscount: document.querySelector("#invoiceDiscount"),
  invoiceTotal: document.querySelector("#invoiceTotal"),
  invoiceCustomerName: document.querySelector("#invoiceCustomerName"),
  invoiceCustomerEmail: document.querySelector("#invoiceCustomerEmail"),
  invoiceDate: document.querySelector("#invoiceDate"),
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
    "Verde": "#4be3a0",
    "Azul": "#7fb3ff",
    "Off-white": "#eed38d",
    "Amarela": "#f3e36b",
    "Vermelho": "#ff6b6b",
    "Laranja": "#ff8c42",
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
        <p class="muted">${p.category} • DRY FIT PREMIUM • Caimento moderno</p>

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
          <label class="label" for="customSizeInput">Tamanho personalizado</label>
          <input
            id="customSizeInput"
            class="select"
            type="text"
            placeholder="Ex: 2XL, G1, G2..."
            maxlength="30"
          />
          <p class="tiny muted" style="margin-top:8px;">
            Se preencher aqui, este tamanho será usado no pedido.
          </p>
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

  const customSizeInput = el.modalContent.querySelector("#customSizeInput");

  customSizeInput?.addEventListener("input", () => {
    const hasCustom = customSizeInput.value.trim() !== "";

    if (hasCustom) {
      [...modalSizes.children].forEach(x => x.setAttribute("aria-pressed", "false"));
    } else {
      [...modalSizes.children].forEach(x => {
        x.setAttribute("aria-pressed", String(x.textContent === chosenSize));
      });
    }
  });

  p.sizes.forEach(sz => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt";
    b.textContent = sz;
    b.setAttribute("aria-pressed", String(chosenSize === sz));
    b.addEventListener("click", () => {
      chosenSize = sz;
      if (customSizeInput) customSizeInput.value = "";
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

  function getFinalSize(){
    const customSize = (customSizeInput?.value || "").trim();
    return customSize || chosenSize;
  }

  el.modalContent.querySelector("#modalAdd").addEventListener("click", () => {
    const q = Math.max(1, Number(qtyInput.value || 1));
    const finalSize = getFinalSize();

    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      variant: {
        size: finalSize,
        color: chosenColor
      }
    }, q);

    closeModal();
    openDrawer(el.cartDrawer);
  });

  el.modalContent.querySelector("#modalBuy").addEventListener("click", () => {
    const q = Math.max(1, Number(qtyInput.value || 1));
    const finalSize = getFinalSize();

    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      variant: {
        size: finalSize,
        color: chosenColor
      }
    }, q);

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
function totalQtyByProductId(productId){
  return state.cart
    .filter(i => i.id === productId)
    .reduce((sum, i) => sum + i.qty, 0);
}
function loadCart(){
  try{
    return JSON.parse(localStorage.getItem("cart_v1") || "[]");
  }catch{
    return [];
  }
}
function loadCoupon(){
  try{
    return JSON.parse(localStorage.getItem("coupon_v1") || "null");
  }catch{
    return null;
  }
}

function saveCoupon(){
  localStorage.setItem("coupon_v1", JSON.stringify(state.appliedCoupon));
}

function clearCoupon(){
  state.appliedCoupon = null;
  localStorage.removeItem("coupon_v1");
}

function normalizeCouponCode(code){
  return String(code || "").trim().toUpperCase();
}

/*
  Aqui você cadastra os cupons.
  Depois no futuro é só editar este objeto.
*/
function getAvailableCoupons(){
  return {
    PRIMEIRA10: {
      code: "PRIMEIRA10",
      type: "percent", // percent | fixed
      value: 10,       // 10%
      active: false
    },
    BECA10: {
      code: "BECA10",
      type: "percent",
      value: 10,
      active: true
    },
    DESCONTO20: {
      code: "DESCONTO20",
      type: "fixed",   // desconto fixo em reais
      value: 20,
      active: false
    }
  };
}

function findCoupon(code){
  const coupons = getAvailableCoupons();
  const normalized = normalizeCouponCode(code);
  return coupons[normalized] || null;
}

function getCouponDiscount(subtotal){
  const coupon = state.appliedCoupon;
  if (!coupon || subtotal <= 0) return 0;

  let discount = 0;

  if (coupon.type === "percent") {
    discount = subtotal * (coupon.value / 100);
  } else if (coupon.type === "fixed") {
    discount = coupon.value;
  }

  return Math.max(0, Math.min(discount, subtotal));
}

function cartTotalFinal(){
  const subtotal = cartSubtotal();
  const discount = getCouponDiscount(subtotal);
  return Math.max(0, subtotal - discount);
}
function applyCoupon(code){
  const coupon = findCoupon(code);

  if (!coupon || !coupon.active) {
    return {
      ok: false,
      msg: "Cupom inválido."
    };
  }

  state.appliedCoupon = {
    code: coupon.code,
    type: coupon.type,
    value: coupon.value
  };

  saveCoupon();

  return {
    ok: true,
    msg: `Cupom ${coupon.code} aplicado com sucesso.`
  };
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
  const base = item.basePrice ?? item.price;
  const total = totalQtyByProductId(item.id);
  return total >= WHOLESALE_QTY ? base * (1 - WHOLESALE_DISCOUNT) : base;
}

function lineTotal(item){
  return unitPrice(item) * item.qty;
}
function resaleSummary(){
  // ids elegíveis (somando todas variações)
  const eligibleIds = uniq(
    state.cart
      .map(i => i.id)
      .filter(id => totalQtyByProductId(id) >= WHOLESALE_QTY)
  );

  if (eligibleIds.length === 0) return null;

  let revenue = 0;
  let cost = 0;

  state.cart
    .filter(i => eligibleIds.includes(i.id))
    .forEach(i => {
      const base = i.basePrice ?? i.price;
      const atacado = unitPrice(i); // agora olha o total por id
      revenue += base * i.qty;
      cost += atacado * i.qty;
    });

  const profit = Math.max(0, revenue - cost);
  const margin = revenue > 0 ? (profit / revenue) : 0;

  return { revenue, cost, profit, margin, eligibleCount: eligibleIds.length };
}
function cartSubtotal(){
  return state.cart.reduce((sum, i) => sum + lineTotal(i), 0);
}
function renderCart(){
  const subtotal = cartSubtotal();
  const discount = getCouponDiscount(subtotal);
  const total = Math.max(0, subtotal - discount);

  el.cartCount.textContent = String(state.cart.reduce((a,i)=> a+i.qty, 0));
  el.cartSubtotal.textContent = BRL(subtotal);

  if (el.cartTotal) {
    el.cartTotal.textContent = BRL(total);
  }

  const info = resaleSummary();

  if (el.cartDiscountRow && el.cartDiscount) {
    if (discount > 0) {
      el.cartDiscountRow.style.display = "flex";
      el.cartDiscount.textContent = `- ${BRL(discount)}`;
    } else {
      el.cartDiscountRow.style.display = "none";
      el.cartDiscount.textContent = "- R$ 0,00";
    }
  }

  if (el.couponCode && state.appliedCoupon) {
    el.couponCode.value = state.appliedCoupon.code;
  }

  if (el.btnRemoveCoupon) {
    el.btnRemoveCoupon.style.display = state.appliedCoupon ? "inline-block" : "none";
  }

  if (el.couponFeedback) {
    if (state.appliedCoupon) {
      const label =
        state.appliedCoupon.type === "percent"
          ? `${state.appliedCoupon.value}% OFF`
          : `${BRL(state.appliedCoupon.value)} OFF`;

      el.couponFeedback.textContent = `Cupom ativo: ${state.appliedCoupon.code} (${label})`;
    } else {
      el.couponFeedback.textContent = "";
    }
  }

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
    const totalDoProduto = totalQtyByProductId(i.id);

    div.innerHTML = `
      <div class="cart-thumb">
        ${i.image ? `<img class="cart__img" src="${i.image}" alt="${i.name}">` : ``}
      </div>
      <div>
        <h4>${i.name}</h4>
        <div class="muted">Tamanho: ${i.variant.size} • Cor: ${i.variant.color}</div>

        <div class="muted" style="margin-top:6px; font-weight:900;">
          Qtd: ${i.qty}
        </div>

        ${
          totalDoProduto >= WHOLESALE_QTY
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
      if (e.target !== b) return;

      const close = b.getAttribute("data-close");
      if(close === "cart") closeDrawer(el.cartDrawer);
      if(close === "filters") closeDrawer(el.filtersDrawer);
      if(close === "modal") closeModal();
      if(close === "menu") closeMenu();
      if(close === "checkout") closeCheckoutModal();
      if(close === "success") closeSuccessModal();
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
  const subtotal = cartTotalFinal();
  if (subtotal <= 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

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

function openSuccessModal(){
  el.successModal?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeSuccessModal(){
  el.successModal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function clearCartAndCheckout(){
  state.cart = [];
  clearCoupon();
  saveCart();
  renderCart();

  if (el.couponCode) el.couponCode.value = "";
}

function formatInvoiceDate(){
  return new Date().toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

function renderSuccessInvoice(customer = {}){
  const subtotal = cartSubtotal();
  const discount = getCouponDiscount(subtotal);
  const total = Math.max(0, subtotal - discount);

  if (el.invoiceCustomerName) {
    el.invoiceCustomerName.textContent = customer.nome || el.ckNome?.value?.trim() || "-";
  }

  if (el.invoiceCustomerEmail) {
    el.invoiceCustomerEmail.textContent = customer.email || el.ckEmail?.value?.trim() || "-";
  }

  if (el.invoiceDate) {
    el.invoiceDate.textContent = formatInvoiceDate();
  }

  if (el.invoiceItems) {
    el.invoiceItems.innerHTML = "";

    state.cart.forEach(item => {
      const unit = unitPrice(item);
      const itemTotal = lineTotal(item);

      const div = document.createElement("div");
      div.className = "invoice-item";
      div.innerHTML = `
        <div class="invoice-item__thumb">
          ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ``}
        </div>

        <div>
          <div class="invoice-item__name">${item.name}</div>
          <div class="invoice-item__meta">
            Tamanho: <strong>${item.variant.size}</strong><br>
            Cor: <strong>${item.variant.color}</strong><br>
            Quantidade: <strong>${item.qty}</strong>
          </div>
        </div>

        <div class="invoice-item__values">
          <span>Unitário: ${BRL(unit)}</span>
          <strong>Total: ${BRL(itemTotal)}</strong>
        </div>
      `;
      el.invoiceItems.appendChild(div);
    });
  }

  if (el.invoiceSubtotal) {
    el.invoiceSubtotal.textContent = BRL(subtotal);
  }

  if (el.invoiceDiscountRow && el.invoiceDiscount) {
    if (discount > 0) {
      el.invoiceDiscountRow.style.display = "flex";
      el.invoiceDiscount.textContent = `- ${BRL(discount)}`;
    } else {
      el.invoiceDiscountRow.style.display = "none";
      el.invoiceDiscount.textContent = "- R$ 0,00";
    }
  }

  if (el.invoiceTotal) {
    el.invoiceTotal.textContent = BRL(total);
  }
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
      const total = cartTotalFinal(); // sua função já existe
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

function showCheckoutMsg(type, title, subtitle){
  const box = document.querySelector("#ckMsg");
  if(!box) return;

  const ok = type !== "error";

  box.classList.toggle("is-error", !ok);
  box.classList.add("show");

  box.innerHTML = `
    <div class="ck-msg__row">
      <svg class="ck-msg__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="${ok ? "M9 12.5l2 2 4-6" : "M8 8l8 8M16 8l-8 8"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" stroke-width="2"/>
      </svg>
      <div>
        <div>${title}</div>
        ${subtitle ? `<small>${subtitle}</small>` : ""}
      </div>
    </div>
  `;

  // rola até ela
  box.scrollIntoView({ behavior:"smooth", block:"nearest" });
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

  el.btnApplyCoupon?.addEventListener("click", () => {
    const code = el.couponCode?.value || "";
    const result = applyCoupon(code);

    if (!result.ok) {
      if (el.couponFeedback) {
        el.couponFeedback.textContent = result.msg;
      }
      return;
    }

    renderCart();
  });

  el.btnRemoveCoupon?.addEventListener("click", () => {
    clearCoupon();
    if (el.couponCode) el.couponCode.value = "";
    if (el.couponFeedback) el.couponFeedback.textContent = "Cupom removido.";
    renderCart();
  });

  el.couponCode?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      el.btnApplyCoupon?.click();
    }
  });

    el.btnCloseSuccessModal?.addEventListener("click", () => {
    closeSuccessModal();
    clearCartAndCheckout();
  });

  el.btnFinishInvoice?.addEventListener("click", () => {
    closeSuccessModal();
    clearCartAndCheckout();
  });

  el.btnPrintInvoice?.addEventListener("click", () => {
    window.print();
  });

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
      numero_t: cartTotalFinal()
    };
    try {
      const resp = await fetch("/.netlify/functions/salvar-camix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosCliente),
      });

      const data = await resp.json().catch(() => null);

      if (!resp.ok) {
        console.error("Erro function:", data);
        showCkError(data?.erro || "Erro ao salvar. Tente novamente.");
        return;
      }

      renderSuccessInvoice({
        nome: el.ckNome.value.trim(),
        email: el.ckEmail.value.trim()
      });

      closeCheckoutModal();
      openSuccessModal();
    } catch (e) {
      console.error(e);
      showCkError("Sem conexão. Tente novamente.");
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
      closeSuccessModal();
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

    const total = cartTotalFinal(); // usa sua função existente
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