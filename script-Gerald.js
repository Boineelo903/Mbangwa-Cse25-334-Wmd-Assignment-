let total = 0;

function addToCart(productName, price) {

    const cartItems =
        document.getElementById("cart-items");

    const li = document.createElement("li");

    li.innerHTML = `
        ${productName}
        <span>$${price}</span>
    `;

    cartItems.appendChild(li);

    total += price;

    document.getElementById("total").textContent = total;
}