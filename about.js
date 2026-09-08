document.addEventListener("DOMContentLoaded", function () {

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    updateCartCount();

});


function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("shopnovaCart") || "[]"
    );

    const count = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}