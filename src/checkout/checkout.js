import { loadHeaderFooter } from "../js/utils.mjs";
import CheckoutProcess from "../js/CheckoutProcess.mjs";

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

let myCheckout;

// Load header and footer
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHeaderFooter();
    updateActiveNav();

    // Initialize checkout process
    myCheckout = new CheckoutProcess("cart", ".order-summary");
    myCheckout.init();
    myCheckout.calculateOrderTotal();

    // Set up form submission
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", handleCheckoutSubmission);
    }

    // Set up zip code listener to calculate shipping and tax
    const zipInput = document.getElementById("zip");
    if (zipInput) {
      zipInput.addEventListener("blur", () => {
        if (zipInput.value.trim().length >= 5) {
          myCheckout.calculateOrderTotal();
        }
      });
    }

  } catch (error) {
    // Display error message to the user
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = "Error loading checkout. Please try again later.";
    document.querySelector("main").prepend(errorElement);
  }
});

// Handle form submission
async function handleCheckoutSubmission(e) {
  e.preventDefault();

  const form = e.target;
  const submitButton = document.getElementById("submit-order");

  // Disable submit button to prevent double submission
  submitButton.disabled = true;
  submitButton.textContent = "Processing...";

  try {
    const response = await myCheckout.checkout(form);

    // Handle successful response
    if (response) {
      // Clear the cart
      localStorage.removeItem("cart");

      // Show success message
      displaySuccessMessage("Order placed successfully!");

      // Optionally redirect to a success page
      // window.location.href = "/order-success.html";
    }
  } catch (error) {
    console.error("Checkout failed:", error);
    displayErrorMessage("Order submission failed. Please try again.");
  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = "Place Order";
  }
}

// Display success message
function displaySuccessMessage(message) {
  const successElement = document.createElement("div");
  successElement.className = "success-message";
  successElement.innerHTML = `
    <h3>Success!</h3>
    <p>${message}</p>
    <p>You will receive an email confirmation shortly.</p>
  `;
  document.querySelector("main").prepend(successElement);

  // Scroll to top to show message
  window.scrollTo(0, 0);
}

// Display error message
function displayErrorMessage(message) {
  // Remove any existing error messages
  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.innerHTML = `
    <h3>Error</h3>
    <p>${message}</p>
  `;
  document.querySelector("main").prepend(errorElement);

  // Scroll to top to show message
  window.scrollTo(0, 0);
}
