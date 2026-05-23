let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".btn-add");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");


// ADD TO CART BUTTONS
addButtons.forEach(function (button) {

    const productCard = button.closest(".product-card");

    const productName = productCard.querySelector("h3").textContent;

    // check if product already exists in cart
    const alreadyAdded = cart.some(item => item.name === productName);

    if (alreadyAdded) {

        button.textContent = "Added ✓";

        button.style.background = "blue";
    }

    button.addEventListener("click", function () {

        // stop duplicates
        const exists = cart.some(item => item.name === productName);

        if (exists) {
            return;
        }

        const productPriceText = productCard.querySelector(".price").textContent;

        const productPrice = Number(
            productPriceText.replace("P", "").trim()
        );

        cart.push({
            name: productName,
            price: productPrice
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCart();

        // change button permanently
        button.textContent = "Added ✓";

        button.style.background = "blue";
    });

});


// UPDATE CART
function updateCart() {

    if (!cartItems || !totalDisplay) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function (item, index) {

        total += item.price;

        const li = document.createElement("li");

        li.classList.add("cart-item");

        li.innerHTML = `
            ${item.name} - P${item.price}

            <button class="remove-btn" onclick="removeItem(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(li);
    });

    totalDisplay.textContent = total;
}


// REMOVE ITEM
function removeItem(index) {

    const removedProduct = cart[index].name;

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    // reset product button
    addButtons.forEach(function(button){

        const productCard = button.closest(".product-card");

        const productName = productCard.querySelector("h3").textContent;

        if(productName === removedProduct){

            button.textContent = "Add to Cart";

            button.style.background = "";
        }
    });

    updateCart();
}


// LOAD CART
updateCart();
const payButton = document.getElementById("pay-btn");

if(payButton){

    payButton.addEventListener("click", function(){

        if(cart.length === 0){

            alert("Your cart is empty!");

            return;
        }

        alert("Payment Successful! Thank you for shopping with Nolo Cosmetics.");

        // clear cart after payment
        cart = [];

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCart();

    });

}