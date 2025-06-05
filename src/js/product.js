import { setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();

function addProductToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
