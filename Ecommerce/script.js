// Product Data
const products = [
    {
        id: 1,
        name: "Modern Wooden Chair",
        price: 55.99,
        category: "furniture",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR_myjJItZlszKC4IiyNtfaJuunU6fjnle2WQ0DSOV-xjV7gXfDTJv0rXfcTJlhp6kCXgwWsfUjOgGo_OZnHFdnCvBPheOquEYF1ypl1ko",
        description: "Elegant wooden chair with ergonomic design. Perfect for dining rooms or home offices. Made from sustainable oak with a natural finish."
    },
    {
        id: 2,
        name: "Ceramic Table Lamp",
        price: 15.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1689519304039-6662ac14e89a?q=80&w=1367&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Handcrafted ceramic lamp with linen shade. Provides warm ambient lighting. Includes energy-efficient LED bulb."
    },
    {
        id: 3,
        name: "Velvet Sofa",
        price: 199.99,
        category: "furniture",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Luxurious velvet sofa with solid wood frame. Available in multiple colors. Features deep seating and high-density foam cushions."
    },
    {
        id: 4,
        name: "Decorative Throw Pillow",
        price: 29.99,
        category: "decor",
        image: "https://images.unsplash.com/photo-1696774276390-6ce82111140f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Soft cotton pillow with geometric pattern. Removable cover for easy washing. Adds a pop of color to any space."
    },
    {
        id: 5,
        name: "Coffee Table",
        price: 249.99,
        category: "furniture",
        image: "https://plus.unsplash.com/premium_photo-1676823570977-18ee08fea6c5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Minimalist coffee table with tempered glass top and metal legs. Sleek design with ample surface area for books and decor."
    },
    {
        id: 6,
        name: "Wall Art Print",
        price: 39.99,
        category: "decor",
        image: "https://images.unsplash.com/photo-1684741891614-c244b9df0613?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "High-quality framed art print. Various designs available. Printed on archival paper with fade-resistant inks."
    },
    {
        id: 7,
        name: "Bookcase Shelf",
        price: 179.99,
        category: "furniture",
        image: "https://images.unsplash.com/photo-1633813122125-882b7cba1f7f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Modular bookcase with adjustable shelves. Made from engineered wood with a walnut veneer. Easy to assemble."
    },
    {
        id: 8,
        name: "Desk Organizer",
        price: 24.99,
        category: "accessories",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ849vKG_wgrhj8g-Ou5ZEConnxHrxMUT9H_l_82Yn_xjQmZgrpyYFYp5zsdPplgcACLZ1bBKz3qU2Gjq7cWeNb8N5hz4qG7DYO1_y4m0tvCZNw3A3aXKrhHA",
        description: "Bamboo desk organizer with compartments for pens, papers, and small items. Keeps your workspace tidy and clutter-free."
    },
    {
        id: 9,
        name: "TV bench with doors",
        price: 155.99,
        category: "furniture",
        image: "https://www.ikea.com/gb/en/images/products/besta-tv-bench-with-doors-black-brown-hedeviken-stubbarp-oak-veneer__0992038_pe819771_s5.jpg?f=s",
        description: "All you need to keep the area around the TV tidy. You get lots of storage space and relief from unruly cables. Choose a ready combination or create your own."
    },
    {
        id: 10,
        name: "Artificial potted plant, Orchid white",
        price: 14.99,
        category: "decor",
        image: "https://www.ikea.com/gb/en/images/products/fejka-artificial-potted-plant-orchid-white__1362054_ph174716_s5.jpg?f=s",
        description: "artificial potted plants. Perfect when you have better things to do than water plants and tidy up dead leaves. You’ll have everyone fooled because they look so lifelike."
    },
    {
        id: 11,
        name: "Letter tray, anthracite",
        price: 11.99,
        category: "accessories",
        image: "https://www.ikea.com/gb/en/images/products/harvmatta-letter-tray-anthracite__1275740_pe930628_s5.jpg?f=s",
        description: "This letter tray uses the height to save space on your desk and the pull-out compartments offer easy access."
    },
    {
        id: 12,
        name: "Rene 3 Seater Fabric Sofa",
        price: 1999.99,
        category: "furniture",
        image: "https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000050217_rene_3-seater-fabric-sofa__lifestyle?$product$&fmt=webp&h=1624&w=2308",
        description: "Our Rene three-seater sofa wows with retro style and pocket spring comfort. With the all-over buttoned look as well as the soft velvety fabric upholstery."
    },
    {
        id: 13,
        name: "Acanthus Table Lamp",
        price: 152.99,
        category: "accessories",
        image: "https://media.furniturevillage.co.uk/i/fv/PRODACANLMP---001_acanthus_table-lamp__alt01?$product$&fmt=webp&h=814&w=1154",
        description: "A simple way to add some interest to a room, this table lamp uses a two-tone pattern to great effect."
    },
    {
        id: 14,
        name: "Carved Louis Leaner Silver Mirror",
        price: 329.99,
        category: "accessories",
        image: "https://media.furniturevillage.co.uk/i/fv/PRODLULNMIRRSILV-001_carved-louis-leaner-mirror_mirror__lifestyle?$product$&fmt=webp&h=1624&w=2308",
        description: "This beautiful Baroque style framed mirror will add elegance to any room."
    },
    {
        id: 15,
        name: "Walking the Dog at Dusk Framed Picture",
        price: 229.50,
        category: "decor",
        image: "https://media.furniturevillage.co.uk/i/fv/PRODWDOG1PIC--001_walking-the-dog-at-dusk_framed-picture__lifestyle?$product$&fmt=webp&h=814&w=1154",
        description: "This beautiful work of art perfectly captures a tranquil summer’s evening at the beach. Lovely and evocative wall art for any room."
    },
    {
        id: 16,
        name: "Decorative Throw Pillow",
        price: 29.99,
        category: "decor",
        image: "https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000047514_pair-of-large_scatters_midros-midnight-garden-rose?$product$&fmt=webp&h=1624&w=2308",
        description: "Pair of large contemporary scatter cushions in beautiful colours and patterns including on-trend botanicals. The perfect way to add comfort, luxury and style."
    },
    {
        id: 17,
        name: "Chennai Sideboard",
        price: 899.79,
        category: "furniture",
        image: "https://media.furniturevillage.co.uk/i/fv/PRODCHNASB--DHD-001_chennai_open-sideboard__lifestyle?$product$&fmt=webp&h=1624&w=2308",
        description: "Style, character and spacious storage, the Chennai large sideboard has everything your contemporary home needs."
    },
    {
        id: 18,
        name: "Chennai Sideboard",
        price: 899.79,
        category: "abcd",
        image: "https://media.furniturevillage.co.uk/i/fv/PRODCHNASB--DHD-001_chennai_open-sideboard__lifestyle?$product$&fmt=webp&h=1624&w=2308",
        description: "Style, character and spacious storage, the Chennai large sideboard has everything your contemporary home needs."
    },
];


const productsContainer = document.getElementById('products-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const cartModal = document.getElementById('cart-modal');
const userIcon = document.getElementById('user-icon');
const cartIcon = document.getElementById('cart-icon');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const closeButtons = document.querySelectorAll('.close-btn');
const continueShoppingBtn = document.getElementById('continue-shopping');
const checkoutBtn = document.getElementById('checkout');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');


let cart = [];


function displayProducts(filter = 'all') {
    productsContainer.innerHTML = '';
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category;
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
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
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Initialize with all products
displayProducts();

// Filter Products
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayProducts(button.dataset.filter);
    });
});

// Modal Functions
function openModal(modal) {
    modal.style.display = 'flex';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Event Listeners for Modals
userIcon.addEventListener('click', () => openModal(loginModal));
cartIcon.addEventListener('click', () => {
    renderCart();
    openModal(cartModal);
});

showRegister.addEventListener('click', () => {
    closeModal(loginModal);
    openModal(registerModal);
});

showLogin.addEventListener('click', () => {
    closeModal(registerModal);
    openModal(loginModal);
});

closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

continueShoppingBtn.addEventListener('click', () => closeModal(cartModal));
checkoutBtn.addEventListener('click', () => {
    alert('Proceeding to checkout!');
    closeModal(cartModal);
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Cart Functions
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    renderCart();
    
    // Visual feedback
    const button = e.target;
    button.textContent = '✓';
    button.style.backgroundColor = '#4CAF50';
    setTimeout(() => {
        button.textContent = '+';
        button.style.backgroundColor = '';
    }, 1000);
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotalElement.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                    <span class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></span>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to quantity inputs and remove buttons
    document.querySelectorAll('.cart-item-quantity').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

function updateQuantity(e) {
    const productId = parseInt(e.target.dataset.id);
    const newQuantity = parseInt(e.target.value);
    
    if (newQuantity < 1) {
        e.target.value = 1;
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartCount();
        renderCart();
    }
}

function removeItem(e) {
    const productId = parseInt(e.currentTarget.dataset.id);
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

// Form Submissions (simulated)
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login functionality would be implemented here');
    closeModal(loginModal);
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Registration functionality would be implemented here');
    closeModal(registerModal);
});