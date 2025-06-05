// Product Listing Page JavaScript
// This file handles the rendering of products on the product listing page

// Import required modules
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
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

    // Get category from URL parameter
    const category = getParam("category");

    // Initialize product list
    const dataSource = new ExternalServices(); // Default to 'tents' if no category
    const listElement = document.querySelector(".product-list");

    if (listElement) {
      const myList = new ProductList(category, dataSource, listElement);
      myList.init();
    }
  } catch (error) {
    // Display error message to the user
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = "Error loading products. Please try again later.";
    const main = document.querySelector("main");
    if (main) {
      main.prepend(errorElement);
    } else {
      document.body.prepend(errorElement);
    }
  }
});
