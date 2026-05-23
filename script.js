let cart = [];
let total = 0;

const addButtons = document.querySelectorAll(".btn-add");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");

addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const productCard = button.closest(".product-card");

        const productName = productCard.querySelector("h3").textContent;
        const productPriceText = productCard.querySelector(".price").textContent;
        const productPrice = Number(productPriceText.replace("P", "").trim());

        cart.push({
            name: productName,
            price: productPrice
        });

        total = total + productPrice;

        updateCart();

        button.textContent = "Added!";
        setTimeout(function () {
            button.textContent = "Add to Cart";
        }, 1000);
    });
});

function updateCart() {
    cartItems.innerHTML = "";

    cart.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item.name + " - P" + item.price;
        cartItems.appendChild(li);
    });

    totalDisplay.textContent = total;
}