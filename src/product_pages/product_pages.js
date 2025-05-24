import { loadHeaderFooter } from "../js/utils.mjs";

// Load header and footer
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHeaderFooter();
    // Add any product page specific JavaScript here
  } catch (error) {
    // Display error message to the user
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = "Error loading product page. Please try again later.";
    const main = document.querySelector("main");
    if (main) {
      main.prepend(errorElement);
    } else {
      document.body.prepend(errorElement);
    }
  }
});
