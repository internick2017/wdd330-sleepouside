import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key || 'cart';
    this.parentSelector = parentSelector || '.product-list';
    this.parentElement = document.querySelector(this.parentSelector);
    this.items = this.getItems();
  }

  getItems() {
    return getLocalStorage(this.key) || [];
  }

  saveItems() {
    setLocalStorage(this.key, this.items);
  }

  async addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      this.items.push({
        ...product,
        quantity: product.quantity || 1
      });
    }
    this.saveItems();
    await this.renderCart();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveItems();
    this.renderCart();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveItems();
      this.renderCart();
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      return total + (parseFloat(item.price) * (item.quantity || 1));
    }, 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => {
      return count + (item.quantity || 1);
    }, 0);
  }

  async renderCart() {
    if (!this.parentElement) return;

    // Load the template
    const template = await this.loadTemplate();

    // Render each item
    const itemsHtml = this.items.map(item => {
      return this.renderCartItem(template, item);
    }).join('');

    // Update the DOM
    this.parentElement.innerHTML = itemsHtml || '<p>Your cart is empty.</p>';

    // Add event listeners
    this.parentElement.querySelectorAll('.cart-card__remove').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        this.removeItem(productId);
      });
    });

    // Update cart count in header if it exists
    this.updateCartCount();

    // Update cart total if element exists
    this.updateCartTotal();

    return this.parentElement;
  }

  async loadTemplate() {
    try {
      const response = await fetch('/partials/cart-item.html');
      return await response.text();
    } catch (error) {
      console.error('Error loading cart item template:', error);
      return '';
    }
  }

  renderCartItem(template, product) {
    return template.replace(/\$\{([^}]+)\}/g, (match, property) => {
      // Handle nested properties and provide defaults
      if (property === 'price') {
        return parseFloat(product.price || 0).toFixed(2);
      }
      if (property === 'quantity') {
        return product.quantity || 1;
      }
      if (property === 'color') {
        return product.color || 'N/A';
      }
      return product[property] || '';
    });
  }

  updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    if (cartCounts.length > 0) {
      const count = this.getItemCount();
      cartCounts.forEach(element => {
        element.textContent = count > 0 ? count : '';
        element.style.display = count > 0 ? 'flex' : 'none';
      });
    }
  }

  updateCartTotal() {
    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
      const total = this.getTotal();
      totalElement.textContent = total.toFixed(2);
    }
  }

  // Static method to get or create cart instance
  static getInstance(key = "cart", parentSelector = ".product-list") {
    if (!ShoppingCart.instance) {
      ShoppingCart.instance = new ShoppingCart(key, parentSelector);
    }
    return ShoppingCart.instance;
  }
}
