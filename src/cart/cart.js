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
const cart = ShoppingCart.getInstance();

// Load header, footer, and render cart
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHeaderFooter();
    updateActiveNav();
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
