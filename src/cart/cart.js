import { loadHeaderFooter } from "../js/utils.mjs";
import ShoppingCart from "../js/ShoppingCart.mjs";

// Initialize the shopping cart
const cart = ShoppingCart.getInstance();

// Load header, footer, and render cart
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHeaderFooter();
    await cart.renderCart();
    
    // Add any additional cart page initialization here
  } catch (error) {
    // Display error message to the user
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = "Error loading cart. Please try again later.";
    document.querySelector("main").prepend(errorElement);
  }
});

// Example of how to add an item to the cart:
// cart.addItem({
//   id: 'product-id',
//   name: 'Product Name',
//   price: 99.99,
//   image: '/path/to/image.jpg',
//   color: 'Red',
//   quantity: 1
// });
