import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// Initialize product data source
const dataSource = new ExternalServices();
const productId = getParam("product");

// DOM Elements
const productImage = document.querySelector(".product-detail img");
const productTitle = document.querySelector(".product-detail h2");
const productBrand = document.querySelector(".product-detail h3");
const productPrice = document.querySelector(".product-card__price");
const productColor = document.querySelector(".product__color");
const productDescription = document.querySelector(".product__description");
const addToCartBtn = document.getElementById("addToCart");

// Load product data and update the page
async function loadProductDetails() {
  if (!productId) {
    showError("No product selected. Please go back and select a product.");
    return;
  }

  try {
    const product = await dataSource.findProductById(productId);
    if (!product) {
      showError("Product not found. The requested product could not be loaded.");
      return;
    }

    // Update the page with product details
    updateProductDisplay(product);
  } catch (error) {
    showError("Error loading product details. Please try again later.");
  }
}

// Update the product display with the fetched data
function updateProductDisplay(product) {
  // Set image - use PrimaryLarge for detail view
  if (product.Images && product.Images.length > 0) {
    const primaryLargeImage = product.Images.find(img =>
      img.ImageType === "PrimaryLarge"
    ) || product.Images[0];

    if (primaryLargeImage) {
      productImage.src = primaryLargeImage.URL;
      productImage.alt = product.Name;
    }
  }

  // Set product details
  if (productTitle) productTitle.textContent = product.NameWithoutBrand || product.Name;
  if (productBrand) productBrand.textContent = product.Brand?.Name || "";
  if (productPrice) productPrice.textContent = `$${product.FinalPrice?.toFixed(2) || "0.00"}`;

  // Set color if available
  if (productColor) {
    const colorText = product.Colors?.length > 0 ? product.Colors[0].ColorName : "Color not specified";
    productColor.textContent = colorText;
  }

  // Set description
  if (productDescription) {
    productDescription.textContent = product.Description || "No description available.";
  }

  // Update add to cart button
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product.Id;
  }
}

// Show error message to user
function showError(message) {
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  const main = document.querySelector("main");
  if (main) {
    main.prepend(errorElement);
  } else {
    document.body.prepend(errorElement);
  }
}

// Add to cart handler
async function addToCartHandler(e) {
  try {
    const product = await dataSource.findProductById(e.target.dataset.id);
    if (product) {
      addProductToCart(product);
      // Show success message
      const successMsg = document.createElement("div");
      successMsg.className = "success-message";
      successMsg.textContent = `${product.Name} added to cart!`;
      document.querySelector("main").prepend(successMsg);

      // Remove message after 3 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
    }
  } catch (error) {
    showError("Error adding item to cart. Please try again.");
  }
}

// Add product to cart
function addProductToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  // Format product to match cart item structure
  const cartItem = {
    id: product.Id,
    name: product.Name,
    image: product.Images && product.Images.length > 0 ?
           product.Images.find(img => img.ImageType === "PrimarySmall")?.URL ||
           product.Images[0].URL : "",
    price: product.FinalPrice,
    color: product.Colors && product.Colors.length > 0 ? product.Colors[0].ColorName : "N/A",
    quantity: 1
  };

  // Check if item already exists in cart
  const existingItemIndex = cartItems.findIndex(item => item.id === cartItem.id);
  if (existingItemIndex >= 0) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    cartItems.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Function to update active navigation link
function updateActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    // Check if the current path includes the link path or if we're on the home page
    if ((currentPath === "/" && linkPath === "/index.html") ||
        (currentPath !== "/" && linkPath !== "/index.html" &&
         (linkPath.includes("product_listing") || linkPath.includes("product_pages")))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHeaderFooter();
    updateActiveNav();
    await loadProductDetails();

    // Add event listener for add to cart button
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", addToCartHandler);
    }
  } catch (error) {
    showError("Error initializing product page. Please try again later.");
  }
});
