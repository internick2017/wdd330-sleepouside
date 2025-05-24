import { loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ProductList.mjs";

// Load header and footer
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadHeaderFooter();
    
    // Get the element for the product list
    const productList = document.querySelector(".product-list");
    
    if (productList) {
      // Create a new ProductList instance for the "tents" category
      const myProductList = new ProductList("tents", null, productList);
      // Initialize the list which will fetch the data and render it
      myProductList.init();
    }
  } catch (error) {
    console.error('Error initializing page:', error);
  }
});