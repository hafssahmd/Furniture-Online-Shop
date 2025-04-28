const productsContainer = document.getElementById("products-container");
const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");
const cartModal = document.getElementById("cart-modal");
const userIcon = document.getElementById("user-icon");
const cartIcon = document.getElementById("cart-icon");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const closeButtons = document.querySelectorAll(".close-btn");
const continueShoppingBtn = document.getElementById("continue-shopping");
const checkoutBtn = document.getElementById("checkout");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCount = document.querySelector(".cart-count");

let cart = [];
let currentSlide = 0;

// Modal Handling System
const modalSystem = {
  init() {
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Open modals
    userIcon.addEventListener("click", () => this.openModal(loginModal));
    cartIcon.addEventListener("click", () => {
      renderCart();
      this.openModal(cartModal);
    });

    // Toggle between login/register
    showRegister.addEventListener("click", () => {
      this.closeModal(loginModal);
      this.openModal(registerModal);
    });
    showLogin.addEventListener("click", () => {
      this.closeModal(registerModal);
      this.openModal(loginModal);
    });

    // Close modals
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        this.closeModal(modal);
      });
    });

    // Close when clicking outside modal content
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeModal(e.target);
      }
    });

    // Continue shopping button
    continueShoppingBtn.addEventListener("click", () => {
      this.closeModal(cartModal);
    });

    // Checkout button
    checkoutBtn.addEventListener("click", () => {
      alert("Proceeding to checkout!");
      this.closeModal(cartModal);
    });
  },

  openModal(modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeModal(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  },
};

// Function to get all unique categories from products
function getUniqueCategories() {
  const categories = new Set();
  window.productsData.forEach((product) => {
    categories.add(product.category);
  });
  return ["all", ...Array.from(categories).sort()];
}

// Function to create filter buttons dynamically
function createFilterButtons() {
  const filterSection = document.querySelector(".filter-buttons");
  filterSection.innerHTML = "";

  const categories = getUniqueCategories();

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "filter-btn";
    button.dataset.filter = category;
    button.textContent =
      category === "all"
        ? "All Products"
        : category.charAt(0).toUpperCase() + category.slice(1);

    if (category === "all") {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      displayProducts(category === "all" ? "all" : category);
    });

    filterSection.appendChild(button);
  });
}

function displayProducts(filter = "all") {
  productsContainer.innerHTML = "";
  const filteredProducts =
    filter === "all"
      ? window.productsData
      : window.productsData.filter((product) => product.category === filter);

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.dataset.category = product.category;
    productCard.innerHTML = `
            <img src="${product.image}" alt="${
      product.name
    }" class="product-img">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">+</button>
                <div class="product-description">
                    <p>${product.description}</p>
                </div>
            </div>
        `;
    productsContainer.appendChild(productCard);
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

// Cart Functions
function addToCart(e) {
  const productId = parseInt(e.target.dataset.id);
  const product = window.productsData.find((p) => p.id === productId);

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCartCount();
  renderCart();

  const button = e.target;
  button.textContent = "✓";
  button.style.backgroundColor = "#4CAF50";
  setTimeout(() => {
    button.textContent = "+";
    button.style.backgroundColor = "";
  }, 1000);
}

function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTotalElement.textContent = "$0.00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <input type="number" class="cart-item-quantity" value="${
                      item.quantity
                    }" min="1" data-id="${item.id}">
                    <span class="remove-item" data-id="${
                      item.id
                    }"><i class="fas fa-trash"></i></span>
                </div>
            </div>
        `;
    cartItemsContainer.appendChild(cartItem);

    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;

  document.querySelectorAll(".cart-item-quantity").forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItem);
  });
}

function updateQuantity(e) {
  const productId = parseInt(e.target.dataset.id);
  const newQuantity = parseInt(e.target.value);

  if (newQuantity < 1) {
    e.target.value = 1;
    return;
  }

  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    updateCartCount();
    renderCart();
  }
}

function removeItem(e) {
  const productId = parseInt(e.currentTarget.dataset.id);
  cart = cart.filter((item) => item.id !== productId);
  updateCartCount();
  renderCart();
}

// Carousel Functions
function updateCarousel() {
  const carousel = document.getElementById("promotions-carousel");
  const dots = document.querySelectorAll(".carousel-dot");

  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % window.promotionsData.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide =
    (currentSlide - 1 + window.promotionsData.length) %
    window.promotionsData.length;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function displayProductsFromPromotion(productIds) {
  const filteredProducts = window.productsData.filter((product) =>
    productIds.includes(product.id)
  );

  productsContainer.innerHTML = "";

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">+</button>
      </div>
    `;
    productsContainer.appendChild(productCard);
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

function loadPromotions() {
  const carousel = document.getElementById("promotions-carousel");
  const dotsContainer = document.getElementById("carousel-dots");

  carousel.innerHTML = "";
  dotsContainer.innerHTML = "";

  window.promotionsData.forEach((promo, index) => {
    const promoProduct = window.productsData.find((p) =>
      promo.productIds.includes(p.id)
    ) || {
      image: "https://via.placeholder.com/300",
      price: 0,
      name: "Product",
    };

    const promoCard = document.createElement("div");
    promoCard.className = "promotion-card";
    promoCard.dataset.promoId = promo.id;

    const discountPercentage = promo.discountPercentage || 0;

    promoCard.innerHTML = `
      <div class="promotion-image-container">
        <img src="${promoProduct.image}" alt="${
      promo.title
    }" class="promotion-image">
      </div>
      <div class="promotion-content">
        <h3 class="promotion-title">${promo.title}</h3>
        ${
          discountPercentage > 0
            ? `<div class="promotion-discount">${discountPercentage}% OFF</div>`
            : ""
        }
        <div class="promotion-prices">
          ${
            discountPercentage > 0
              ? `<span class="old-price">$${promoProduct.price.toFixed(
                  2
                )}</span>`
              : ""
          }
          <span class="new-price">$${(
            promoProduct.price *
            (1 - discountPercentage / 100)
          ).toFixed(2)}</span>
          ${
            discountPercentage > 0
              ? `<span class="discount-badge">-${discountPercentage}%</span>`
              : ""
          }
        </div>
        <p class="promotion-description">${promo.description}</p>
        <p class="promotion-end-date">Ends: ${new Date(
          promo.endDate
        ).toLocaleDateString()}</p>
      </div>
    `;
    carousel.appendChild(promoCard);

    promoCard.addEventListener("click", () => {
      displayProductsFromPromotion(promo.productIds);
      document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.filter === "all") btn.classList.add("active");
      });
      [cartModal, loginModal, registerModal].forEach((modal) =>
        modalSystem.closeModal(modal)
      );
    });

    const dot = document.createElement("div");
    dot.className = "carousel-dot";
    if (index === 0) dot.classList.add("active");
    dot.dataset.index = index;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  document.getElementById("prev-btn").addEventListener("click", prevSlide);
  document.getElementById("next-btn").addEventListener("click", nextSlide);

  // Set carousel width based on number of promotions
  carousel.style.width = `${window.promotionsData.length * 100}%`;

  // Auto-advance carousel
  setInterval(nextSlide, 5000);
}

// Initialize the app
function init() {
  createFilterButtons();
  displayProducts();
  loadPromotions();
  modalSystem.init();

  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Login functionality would be implemented here");
      modalSystem.closeModal(loginModal);
    });

  document
    .getElementById("register-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Registration functionality would be implemented here");
      modalSystem.closeModal(registerModal);
    });
}

// Start the app
document.addEventListener("DOMContentLoaded", init);
