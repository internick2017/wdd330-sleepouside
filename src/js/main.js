import ProductList from "./ProductList.mjs";

// Get the element for the product list
const productList = document.querySelector(".product-list");

// Create a new ProductList instance for the "tents" category
const myProductList = new ProductList("tents", null, productList);

// Initialize the list which will fetch the data and render it
myProductList.init();