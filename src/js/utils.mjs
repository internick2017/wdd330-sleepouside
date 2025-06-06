// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const html = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, html.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback();
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text();
  return html;
}

/**
 * Gets a URL parameter by name
 * @param {string} paramName - The name of the URL parameter to get
 * @param {string} url - The URL to parse (defaults to window.location.href)
 * @returns {string|null} The value of the parameter or null if not found
 */
export function getParam(paramName, url = window.location.href) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(paramName);
}

function showError(message) {
  // Create or find error container
  let errorContainer = document.querySelector(".error-container");
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.className = "error-container";
    document.body.prepend(errorContainer);
  }

  // Create error element
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;

  // Add to container
  errorContainer.appendChild(errorElement);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    errorElement.remove();
    // Remove container if empty
    if (errorContainer.children.length === 0) {
      errorContainer.remove();
    }
  }, 5000);
}

export async function loadHeaderFooter() {
  // Check if header and footer elements already exist
  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");

  // Only load templates if the elements don't already contain content
  if (!headerElement?.innerHTML.trim()) {
    try {
      const header = await loadTemplate("/partials/header.html");
      if (headerElement) {
        renderWithTemplate(header, headerElement);
      }
    } catch (error) {
      // Log error in a production-safe way or use a logging service
      const errorMessage = "Error loading header: " + error.message;
      // Consider implementing a proper error handling/logging mechanism here
      // add error handling logic here
      showError(errorMessage);

      // Add this function definition at the end of the file
    }
  }

  if (!footerElement?.innerHTML.trim()) {
    try {
      const footer = await loadTemplate("/partials/footer.html");
      if (footerElement) {
        renderWithTemplate(footer, footerElement);
      }
      // Log error in a production-safe way or use a logging service
      // Consider implementing a proper error handling/logging mechanism here
    } catch (error) {
      // Log error in a production-safe way or use a logging service
      const errorMessage = "Error loading footer: " + error.message;
      // Consider implementing a proper error handling/logging mechanism here
      showError(errorMessage);
    }
  }

  // Initialize cart count after header is loaded
  initializeCartCount();
}

/**
 * Initialize cart count display on page load
 */
export function initializeCartCount() {
  // Use setTimeout to ensure DOM is ready and avoid potential import issues
  setTimeout(() => {
    // Check if cart count elements exist before initializing
    const cartCountElements = document.querySelectorAll(".cart-count");
    if (cartCountElements.length > 0) {
      // Import ShoppingCart dynamically to avoid circular dependencies
      import("./ShoppingCart.mjs")
        .then(({ default: ShoppingCart }) => {
          const cart = ShoppingCart.getInstance("so-cart", ".product-list");
          cart.updateCartCount();
        })
        .catch((error) => {
          // Silently handle import errors to avoid console noise
        });
    }
  }, 100);
}
