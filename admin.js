// Admin Panel Script
document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const navBtns = document.querySelectorAll(".nav-btn");
    const adminSections = document.querySelectorAll(".admin-section");
    const productFormContainer = document.querySelector(".product-form-container");
    const productForm = document.getElementById("product-form");
    const promotionFormContainer = document.querySelector(".promotion-form-container");
    const promotionForm = document.getElementById("promotion-form");
    const productsList = document.getElementById("products-list");
    const promotionsList = document.getElementById("promotions-list");
    const ordersList = document.getElementById("orders-list");
    const categoriesDatalist = document.getElementById("categories");
    const promotionProductsSelect = document.getElementById("promotion-products");
  
    // State
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let promotions = JSON.parse(localStorage.getItem("promotions")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let isEditingProduct = false;
    let isEditingPromotion = false;
  
    // Initialize the admin panel
    initAdminPanel();
  
    // Navigation
    navBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (this.hasAttribute("data-section")) {
          const sectionId = this.getAttribute("data-section");
  
          // Update active nav button
          navBtns.forEach((navBtn) => navBtn.classList.remove("active"));
          this.classList.add("active");
  
          // Show corresponding section
          adminSections.forEach((section) => section.classList.remove("active"));
          document.getElementById(`${sectionId}-section`).classList.add("active");
        }
      });
    });
  
    // Product Form Handling
    document.getElementById("add-product-btn").addEventListener("click", showProductForm);
    document.getElementById("cancel-product").addEventListener("click", hideProductForm);
  
    productForm.addEventListener("submit", function (e) {
      e.preventDefault();
      saveProduct();
    });
  
    // Promotion Form Handling
    document.getElementById("add-promotion-btn").addEventListener("click", showPromotionForm);
    document.getElementById("cancel-promotion").addEventListener("click", hidePromotionForm);
  
    promotionForm.addEventListener("submit", function (e) {
      e.preventDefault();
      savePromotion();
    });
  
    // Initialize functions
    function initAdminPanel() {
      // Initialize products if empty
      if (products.length === 0 && window.productsData && window.productsData.length > 0) {
        products = [...window.productsData];
        localStorage.setItem("products", JSON.stringify(products));
      }
      
      // Initialize promotions if empty
      if (promotions.length === 0 && window.promotionsData && window.promotionsData.length > 0) {
        promotions = [...window.promotionsData];
        localStorage.setItem("promotions", JSON.stringify(promotions));
      }
  
      loadProducts();
      loadPromotions();
      loadOrders();
      loadCategories();
      loadProductsForPromotions();
    }
  
    function loadProducts() {
      productsList.innerHTML = "";
  
      if (products.length === 0) {
        productsList.innerHTML = '<tr><td colspan="5" class="empty-message">No products found</td></tr>';
        return;
      }
  
      products.forEach((product) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="${product.image}" alt="${product.name}" class="product-img-thumb"></td>
          <td>${product.name}</td>
          <td>$${product.price.toFixed(2)}</td>
          <td>${product.category}</td>
          <td>
            <div class="action-btns">
              <button class="action-btn edit-btn" data-id="${product.id}"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-id="${product.id}"><i class="fas fa-trash"></i></button>
            </div>
          </td>
        `;
        productsList.appendChild(tr);
      });
  
      // Add event listeners to product action buttons
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = parseInt(this.getAttribute("data-id"));
          editProduct(productId);
        });
      });
  
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = parseInt(this.getAttribute("data-id"));
          deleteProduct(productId);
        });
      });
    }
  
    function loadPromotions() {
      promotionsList.innerHTML = "";
  
      if (promotions.length === 0) {
        promotionsList.innerHTML = '<tr><td colspan="5" class="empty-message">No promotions found</td></tr>';
        return;
      }
  
      promotions.forEach((promotion) => {
        const isActive = new Date(promotion.endDate) > new Date();
        const statusClass = isActive ? "status-active" : "status-expired";
        const statusText = isActive ? "Active" : "Expired";
  
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${promotion.title}</td>
          <td>${promotion.discount}%</td>
          <td>${new Date(promotion.endDate).toLocaleDateString()}</td>
          <td class="${statusClass}">${statusText}</td>
          <td>
            <div class="action-btns">
              <button class="action-btn edit-btn" data-id="${promotion.id}"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" data-id="${promotion.id}"><i class="fas fa-trash"></i></button>
            </div>
          </td>
        `;
        promotionsList.appendChild(tr);
      });
  
      // Add event listeners to promotion action buttons
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const promotionId = this.getAttribute("data-id");
          editPromotion(promotionId);
        });
      });
  
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const promotionId = this.getAttribute("data-id");
          deletePromotion(promotionId);
        });
      });
    }
  
    function loadOrders() {
      ordersList.innerHTML = "";
      
      if (orders.length === 0) {
        ordersList.innerHTML = '<tr><td colspan="6" class="empty-message">No orders found</td></tr>';
        return;
      }
      
      // In a real app, you would load orders from your database
      // This is just a placeholder
      orders.forEach(order => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${order.id}</td>
          <td>${order.customerName}</td>
          <td>${new Date(order.date).toLocaleDateString()}</td>
          <td>$${order.total.toFixed(2)}</td>
          <td>${order.status}</td>
          <td>
            <div class="action-btns">
              <button class="action-btn view-btn" data-id="${order.id}"><i class="fas fa-eye"></i></button>
            </div>
          </td>
        `;
        ordersList.appendChild(tr);
      });
    }
  
    function loadCategories() {
      const categories = [...new Set(products.map((product) => product.category))];
      categoriesDatalist.innerHTML = "";
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        categoriesDatalist.appendChild(option);
      });
    }
  
    function loadProductsForPromotions() {
      promotionProductsSelect.innerHTML = "";
      products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = `${product.name} ($${product.price.toFixed(2)})`;
        promotionProductsSelect.appendChild(option);
      });
    }
  
    function showProductForm() {
      productForm.reset();
      productFormContainer.style.display = "block";
      isEditingProduct = false;
      document.getElementById("product-id").value = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  
    function hideProductForm() {
      productFormContainer.style.display = "none";
    }
  
    function showPromotionForm() {
      promotionForm.reset();
      promotionFormContainer.style.display = "block";
      isEditingPromotion = false;
      document.getElementById("promotion-id").value = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  
    function hidePromotionForm() {
      promotionFormContainer.style.display = "none";
    }
  
    function editProduct(productId) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        document.getElementById("product-id").value = product.id;
        document.getElementById("product-name").value = product.name;
        document.getElementById("product-price").value = product.price;
        document.getElementById("product-category").value = product.category;
        document.getElementById("product-image").value = product.image;
        document.getElementById("product-description").value = product.description;
  
        productFormContainer.style.display = "block";
        isEditingProduct = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  
    function editPromotion(promotionId) {
      const promotion = promotions.find((p) => p.id == promotionId); // Use loose equality
      if (promotion) {
        document.getElementById("promotion-id").value = promotion.id;
        document.getElementById("promotion-title").value = promotion.title;
        document.getElementById("promotion-discount").value = promotion.discount;
        document.getElementById("promotion-end-date").value = promotion.endDate.split("T")[0];
        document.getElementById("promotion-banner").value = promotion.banner || "";
  
        // Select the products
        Array.from(promotionProductsSelect.options).forEach((option) => {
          option.selected = promotion.products.includes(parseInt(option.value));
        });
  
        promotionFormContainer.style.display = "block";
        isEditingPromotion = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  
    function saveProduct() {
      const productId = document.getElementById("product-id").value;
      const productData = {
        name: document.getElementById("product-name").value,
        price: parseFloat(document.getElementById("product-price").value),
        category: document.getElementById("product-category").value,
        image: document.getElementById("product-image").value,
        description: document.getElementById("product-description").value,
      };
  
      if (isEditingProduct && productId) {
        // Update existing product
        const index = products.findIndex((p) => p.id === parseInt(productId));
        if (index !== -1) {
          products[index] = { ...products[index], ...productData };
        }
      } else {
        // Add new product
        const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        products.push({
          id: newId,
          ...productData,
        });
      }
  
      // Save to localStorage
      localStorage.setItem("products", JSON.stringify(products));
  
      // Reload products
      loadProducts();
      loadCategories();
      loadProductsForPromotions();
      hideProductForm();
  
      alert("Product saved successfully!");
    }
  
    function savePromotion() {
      const promotionId = document.getElementById("promotion-id").value;
      const selectedProducts = Array.from(
        document.getElementById("promotion-products").selectedOptions
      ).map((option) => parseInt(option.value));
  
      const promotionData = {
        title: document.getElementById("promotion-title").value,
        discount: parseInt(document.getElementById("promotion-discount").value),
        endDate: document.getElementById("promotion-end-date").value,
        products: selectedProducts,
        banner: document.getElementById("promotion-banner").value || null,
        createdAt: new Date().toISOString(),
      };
  
      if (isEditingPromotion && promotionId) {
        // Update existing promotion
        const index = promotions.findIndex((p) => p.id == promotionId);
        if (index !== -1) {
          promotions[index] = { ...promotions[index], ...promotionData };
        }
      } else {
        // Add new promotion
        const newId = promotions.length > 0 ? Math.max(...promotions.map((p) => p.id)) + 1 : 1;
        promotions.push({
          id: newId,
          ...promotionData,
        });
      }
  
      // Save to localStorage
      localStorage.setItem("promotions", JSON.stringify(promotions));
  
      // Reload promotions
      loadPromotions();
      hidePromotionForm();
  
      alert("Promotion saved successfully!");
    }
  
    function deleteProduct(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        const index = products.findIndex((p) => p.id === productId);
        if (index !== -1) {
          products.splice(index, 1);
          localStorage.setItem("products", JSON.stringify(products));
          loadProducts();
          loadCategories();
          loadProductsForPromotions();
          alert("Product deleted successfully!");
        }
      }
    }
  
    function deletePromotion(promotionId) {
      if (confirm("Are you sure you want to delete this promotion?")) {
        const index = promotions.findIndex((p) => p.id == promotionId);
        if (index !== -1) {
          promotions.splice(index, 1);
          localStorage.setItem("promotions", JSON.stringify(promotions));
          loadPromotions();
          alert("Promotion deleted successfully!");
        }
      }
    }
  
    // Search functionality
    document.getElementById("product-search").addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const rows = productsList.querySelectorAll("tr");
      
      rows.forEach((row) => {
        if (row.querySelector("td")) { // Skip header row
          const name = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
          const category = row.querySelector("td:nth-child(4)").textContent.toLowerCase();
          
          if (name.includes(searchTerm) || category.includes(searchTerm)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        }
      });
    });
  });