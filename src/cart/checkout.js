import { loadHeaderFooter } from "../js/utils.mjs";

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
    // Add any checkout specific JavaScript here
  } catch (error) {
    // Display error message to the user
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = "Error loading checkout. Please try again later.";
    document.querySelector("main").prepend(errorElement);
  }
});
