import { loadHeaderFooter } from "../js/utils.mjs";
import ShoppingCart from "../js/ShoppingCart.mjs";

// Function to update active navigation link
function updateActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    // Check if the current path includes the link path or if we're on the home page
    if ((currentPath === "/" && linkPath === "/index.html") ||
        (currentPath !== "/" && linkPath !== "/index.html" && currentPath.includes(linkPath.replace("/index.html", "")))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Initialize the shopping cart
const cart = ShoppingCart.getInstance("so-cart", ".product-list");

// Load header, footer, and render cart
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHeaderFooter();
    updateActiveNav();
    await cart.renderCart();
    updateCartTotal();
    setupCheckoutButton();

    // Add any additional cart page initialization here
  } catch (error) {

    // Display error message to the user
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = `Error loading cart: ${error.message || "Please try again later."}`;

    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.prepend(errorElement);
    } else {
      document.body.prepend(errorElement);
    }
  }
});

// Function to update cart total display
function updateCartTotal() {
  const totalElement = document.getElementById("cart-total");
  if (totalElement) {
    const total = cart.getTotal();
    totalElement.textContent = total.toFixed(2);
  }
}

// Function to setup checkout button
function setupCheckoutButton() {
  const checkoutButton = document.getElementById("checkout-btn");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      // Check if cart is empty
      if (cart.getItemCount() === 0) {
        alert("Your cart is empty. Please add items to proceed to checkout.");
        return;
      }
      // Redirect to checkout page
      window.location.href = "/checkout/index.html";
    });
  }
}

// Example of how to add an item to the cart:
// cart.addItem({
//   id: 'product-id',
//   name: 'Product Name',
//   price: 99.99,
//   image: '/path/to/image.jpg',
//   color: 'Red',
//   quantity: 1
// });
