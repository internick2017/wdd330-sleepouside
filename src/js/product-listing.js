// Product Listing Page JavaScript
// This file handles the rendering of products on the product listing page

// Import required modules
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Load header and footer
loadHeaderFooter();

// Get category from URL parameter
const category = getParam("category");

// Initialize product list
const dataSource = new ProductData(category || "tents"); // Default to 'tents' if no category
const listElement = document.querySelector(".product-list");

if (listElement) {
  const myList = new ProductList(category, dataSource, listElement);
  myList.init();
}
