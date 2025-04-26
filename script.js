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

// Function to get all unique categories from products
function getUniqueCategories() {
  const categories = new Set();
  products.forEach((product) => {
    categories.add(product.category);
  });
  return ["all", ...Array.from(categories).sort()]; // Always include 'all' as first option
}

// Function to create filter buttons dynamically
function createFilterButtons() {
  const filterSection = document.querySelector(".filter-buttons");
  filterSection.innerHTML = ""; // Clear existing buttons

  const categories = getUniqueCategories();

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "filter-btn";
    button.dataset.filter = category;
    button.textContent =
      category === "all"
        ? "All Products"
        : category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter

    // Set 'all' as active by default
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
      ? products
      : products.filter((product) => product.category === filter);

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

  // Add event listeners to add-to-cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

// Modal Functions
function openModal(modal) {
  modal.style.display = "flex";
}

function closeModal(modal) {
  modal.style.display = "none";
}

// Cart Functions
function addToCart(e) {
  const productId = parseInt(e.target.dataset.id);
  const product = products.find((p) => p.id === productId);

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

  // Visual feedback
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

  // Add event listeners to quantity inputs and remove buttons
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

// Function to load promotions
// Carousel functionality
let currentSlide = 0;

function loadPromotions() {
  const promotions = [
    {
      title: "Summer Collection",
      discount: "30% OFF",
      products: "On all living room furniture",
      endDate: "Offer ends August 31, 2025",
    },
    {
      title: "New Arrivals",
      discount: "BUY 1 GET 1",
      products: "Selected decor items",
      endDate: "While stocks last",
    },
    {
      title: "Limited Edition",
      discount: "FREE SHIPPING",
      products: "On orders over $299",
      endDate: "Limited time offer",
    },
  ];

  const carousel = document.getElementById("promotions-carousel");
  const dotsContainer = document.getElementById("carousel-dots");

  // Clear existing content
  carousel.innerHTML = "";
  dotsContainer.innerHTML = "";

  // Create promotion cards
  promotions.forEach((promo, index) => {
    const promoCard = document.createElement("div");
    promoCard.className = "promotion-card";
    promoCard.innerHTML = `
      <div class="promotion-content">
        <h3 class="promotion-title">${promo.title}</h3>
        <div class="promotion-discount">${promo.discount}</div>
        <p class="promotion-products">${promo.products}</p>
        <p class="promotion-end-date">${promo.endDate}</p>
      </div>
    `;
    carousel.appendChild(promoCard);

    // Create dots
    const dot = document.createElement("div");
    dot.className = "carousel-dot";
    if (index === 0) dot.classList.add("active");
    dot.dataset.index = index;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Set up event listeners for navigation buttons
  document.getElementById("prev-btn").addEventListener("click", prevSlide);
  document.getElementById("next-btn").addEventListener("click", nextSlide);

  // Update carousel position
  updateCarousel();
}

function updateCarousel() {
  const carousel = document.getElementById("promotions-carousel");
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update active dot
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  const promotions = document.querySelectorAll(".promotion-card");
  currentSlide = (currentSlide + 1) % promotions.length;
  updateCarousel();
}

function prevSlide() {
  const promotions = document.querySelectorAll(".promotion-card");
  currentSlide = (currentSlide - 1 + promotions.length) % promotions.length;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

// Auto-advance carousel (optional)
let carouselInterval;

function startCarousel() {
  carouselInterval = setInterval(nextSlide, 5000);
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

// Initialize with auto-advance
function init() {
  createFilterButtons();
  displayProducts();
  loadPromotions();
  startCarousel();

  // Pause carousel on hover
  const carousel = document.querySelector(".promotions-container");
  carousel.addEventListener("mouseenter", stopCarousel);
  carousel.addEventListener("mouseleave", startCarousel);

  // ... rest of your existing init code
}

// Call it in your init function
function init() {
  createFilterButtons();
  displayProducts();
  loadPromotions();
  // ... rest of your existing init code
}

// Initialize the app
function init() {
  createFilterButtons();
  displayProducts();

  // Event Listeners for Modals
  userIcon.addEventListener("click", () => openModal(loginModal));
  cartIcon.addEventListener("click", () => {
    renderCart();
    openModal(cartModal);
  });

  showRegister.addEventListener("click", () => {
    closeModal(loginModal);
    openModal(registerModal);
  });

  showLogin.addEventListener("click", () => {
    closeModal(registerModal);
    openModal(loginModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      closeModal(modal);
    });
  });

  continueShoppingBtn.addEventListener("click", () => closeModal(cartModal));
  checkoutBtn.addEventListener("click", () => {
    alert("Proceeding to checkout!");
    closeModal(cartModal);
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
  });

  // Form Submissions (simulated)
  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Login functionality would be implemented here");
      closeModal(loginModal);
    });

  document
    .getElementById("register-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Registration functionality would be implemented here");
      closeModal(registerModal);
    });
}

// Start the app
init();
