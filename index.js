document.addEventListener("DOMContentLoaded", function () {

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    updateCartCount();

    const menuBtn = document.getElementById("menuBtn");

    if (menuBtn) {
        menuBtn.addEventListener("click", function () {

            const nav = document.querySelector("nav");

            if (nav.style.display === "flex") {
                nav.style.display = "";
            } else {
                nav.style.display = "flex";
                nav.style.flexDirection = "column";
                nav.style.position = "absolute";
                nav.style.top = "75px";
                nav.style.right = "5%";
                nav.style.background = "white";
                nav.style.padding = "20px";
                nav.style.borderRadius = "12px";
                nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.1)";
            }

        });
    }

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