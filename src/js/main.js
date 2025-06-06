import { loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ProductList.mjs";

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

// Load header and footer
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHeaderFooter();
    updateActiveNav();
    
    // Get the element for the product list
    const productList = document.querySelector(".product-list");
    
    if (productList) {
      // Create a new ProductList instance for the "tents" category
      const myProductList = new ProductList("tents", null, productList);
      // Initialize the list which will fetch the data and render it
      myProductList.init();
    }
  } catch (error) {
    // Display error message to the user
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = "Error loading page content. Please try again later.";
    document.querySelector("main").prepend(errorElement);
  }
});