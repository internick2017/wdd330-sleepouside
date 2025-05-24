import { loadHeaderFooter } from '../js/utils.mjs';
import ShoppingCart from '../js/ShoppingCart.mjs';

// Initialize the shopping cart
const cart = ShoppingCart.getInstance();

// Load header, footer, and render cart
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadHeaderFooter();
    await cart.renderCart();
    
    // Add any additional cart page initialization here
  } catch (error) {
    console.error('Error initializing cart page:', error);
  }
});

// Example of how to add an item to the cart:
// cart.addItem({
//   id: 'product-id',
//   name: 'Product Name',
//   price: 99.99,
//   image: '/path/to/image.jpg',
//   color: 'Red',
//   quantity: 1
// });
