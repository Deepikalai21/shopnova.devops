let cart = JSON.parse(
    localStorage.getItem("shopnovaCart") || "[]"
);


const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const subtotalElement =
    document.getElementById("subtotal");

const shippingElement =
    document.getElementById("shipping");

const taxElement =
    document.getElementById("tax");

const totalElement =
    document.getElementById("total");

const itemCountElement =
    document.getElementById("itemCount");


function money(value) {

    return "$" + value.toFixed(2);

}


function saveCart() {

    localStorage.setItem(
        "shopnovaCart",
        JSON.stringify(cart)
    );

}


function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart.style.display = "block";

        updateSummary();

        return;
    }


    emptyCart.style.display = "none";


    cartItems.innerHTML =
        cart.map(function (item) {

            return `

                <div class="cart-item">

                    <div class="cart-image">
                        ${item.emoji}
                    </div>


                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${money(item.price)} each
                        </p>


                        <div class="quantity">

                            <button
                                onclick="changeQuantity(
                                    ${item.id},
                                    -1
                                )"
                            >
                                −
                            </button>

                            <strong>
                                ${item.quantity}
                            </strong>

                            <button
                                onclick="changeQuantity(
                                    ${item.id},
                                    1
                                )"
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="remove"
                            onclick="removeItem(${item.id})"
                        >
                            Remove
                        </button>

                    </div>


                    <div class="item-price">

                        ${money(
                            item.price * item.quantity
                        )}

                    </div>

                </div>

            `;

        }).join("");


    updateSummary();

}


function changeQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);

    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    saveCart();

    renderCart();

}


function removeItem(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveCart();

    renderCart();

    showToast("Product removed");

}


function updateSummary() {

    const itemCount =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const subtotal =
        cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );


    const shipping =
        subtotal === 0
        ? 0
        : subtotal >= 100
            ? 0
            : 8;


    const tax =
        subtotal * 0.08;


    const total =
        subtotal + shipping + tax;


    itemCountElement.textContent =
        itemCount;

    subtotalElement.textContent =
        money(subtotal);

    shippingElement.textContent =
        shipping === 0
        ? "FREE"
        : money(shipping);

    taxElement.textContent =
        money(tax);

    totalElement.textContent =
        money(total);

}


const checkoutBtn =
    document.getElementById("checkoutBtn");


const modal =
    document.getElementById("checkoutModal");


const closeModal =
    document.getElementById("closeModal");


checkoutBtn.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            showToast(
                "Your cart is empty"
            );

            return;
        }

        modal.classList.add("show");

    }
);


closeModal.addEventListener(
    "click",
    function () {

        modal.classList.remove("show");

    }
);


modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    }
);


document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            cart = [];

            saveCart();

            renderCart();


            modal.classList.remove(
                "show"
            );


            this.reset();


            showToast(
                "Demo order placed successfully!"
            );

        }
    );


function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 2200);

}


document.getElementById("year").textContent =
    new Date().getFullYear();


renderCart();