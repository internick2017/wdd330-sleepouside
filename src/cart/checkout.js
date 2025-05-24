import { loadHeaderFooter } from "../js/utils.mjs";

// Load header and footer
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHeaderFooter();
    // Add any checkout specific JavaScript here
  } catch (error) {
    // Display error message to the user
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = "Error loading checkout. Please try again later.";
    document.querySelector("main").prepend(errorElement);
  }
});
