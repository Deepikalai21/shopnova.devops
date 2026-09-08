const products = [

    {
        id: 1,
        name: "Nova Wireless Headphones",
        category: "Electronics",
        price: 129.99,
        rating: 4.9,
        emoji: "🎧",
        tag: "HOT"
    },

    {
        id: 2,
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 99.99,
        rating: 4.7,
        emoji: "⌚",
        tag: "NEW"
    },

    {
        id: 3,
        name: "Mechanical Keyboard",
        category: "Electronics",
        price: 89.99,
        rating: 4.8,
        emoji: "⌨️",
        tag: ""
    },

    {
        id: 4,
        name: "Aero Street Sneakers",
        category: "Fashion",
        price: 79.99,
        rating: 4.8,
        emoji: "👟",
        tag: "BEST"
    },

    {
        id: 5,
        name: "Cloud Hoodie",
        category: "Fashion",
        price: 54.99,
        rating: 4.6,
        emoji: "🧥",
        tag: "NEW"
    },

    {
        id: 6,
        name: "Classic Backpack",
        category: "Accessories",
        price: 69.99,
        rating: 4.7,
        emoji: "🎒",
        tag: ""
    },

    {
        id: 7,
        name: "Minimal Table Lamp",
        category: "Home",
        price: 44.99,
        rating: 4.5,
        emoji: "💡",
        tag: ""
    },

    {
        id: 8,
        name: "Ceramic Coffee Set",
        category: "Home",
        price: 39.99,
        rating: 4.6,
        emoji: "☕",
        tag: "SALE"
    },

    {
        id: 9,
        name: "Nova Sunglasses",
        category: "Accessories",
        price: 34.99,
        rating: 4.4,
        emoji: "🕶️",
        tag: ""
    },

    {
        id: 10,
        name: "Portable Bluetooth Speaker",
        category: "Electronics",
        price: 59.99,
        rating: 4.8,
        emoji: "🔊",
        tag: "HOT"
    },

    {
        id: 11,
        name: "Everyday Overshirt",
        category: "Fashion",
        price: 49.99,
        rating: 4.5,
        emoji: "👔",
        tag: ""
    },

    {
        id: 12,
        name: "Travel Organizer",
        category: "Accessories",
        price: 29.99,
        rating: 4.3,
        emoji: "🧳",
        tag: ""
    }

];


let cart = JSON.parse(
    localStorage.getItem("shopnovaCart") || "[]"
);


const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const emptyMessage = document.getElementById("emptyMessage");


function money(value) {

    return "$" + value.toFixed(2);

}


function renderProducts() {

    let list = [...products];

    const search =
        searchInput.value.toLowerCase().trim();

    const category =
        categoryFilter.value;

    const sort =
        sortFilter.value;


    if (search) {

        list = list.filter(function (product) {

            return (
                product.name.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search)
            );

        });

    }


    if (category !== "All") {

        list = list.filter(function (product) {

            return product.category === category;

        });

    }


    if (sort === "low") {

        list.sort((a, b) => a.price - b.price);

    }

    else if (sort === "high") {

        list.sort((a, b) => b.price - a.price);

    }

    else if (sort === "rating") {

        list.sort((a, b) => b.rating - a.rating);

    }


    if (list.length === 0) {

        productGrid.innerHTML = "";

        emptyMessage.style.display = "block";

        return;

    }


    emptyMessage.style.display = "none";


    productGrid.innerHTML = list.map(function (product) {

        return `

            <article class="product-card">

                <div class="product-image">

                    ${
                        product.tag
                        ? `<span class="product-tag">
                            ${product.tag}
                           </span>`
                        : ""
                    }

                    <span>
                        ${product.emoji}
                    </span>

                </div>


                <div class="product-info">

                    <span class="category">
                        ${product.category}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="rating">
                        ★ ${product.rating}
                    </div>


                    <div class="price-row">

                        <span class="price">
                            ${money(product.price)}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addToCart(${product.id})"
                        >
                            Add
                        </button>

                    </div>

                </div>

            </article>

        `;

    }).join("");

}


function addToCart(id) {

    const product = products.find(
        item => item.id === id
    );


    const existing = cart.find(
        item => item.id === id
    );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });

    }


    saveCart();

    showToast(
        product.name + " added to cart"
    );

}


function saveCart() {

    localStorage.setItem(
        "shopnovaCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const element =
        document.getElementById("cartCount");

    if (element) {
        element.textContent = count;
    }

}


function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 2000);

}


searchInput.addEventListener(
    "input",
    renderProducts
);


categoryFilter.addEventListener(
    "change",
    renderProducts
);


sortFilter.addEventListener(
    "change",
    renderProducts
);


document.getElementById("year").textContent =
    new Date().getFullYear();


const params =
    new URLSearchParams(window.location.search);

const selectedCategory =
    params.get("category");


if (selectedCategory) {

    categoryFilter.value =
        selectedCategory;

}


renderProducts();

updateCartCount();