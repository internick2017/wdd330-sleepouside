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
    return template.replace(/\$\{([^}]+)\}/g, (match, p1) => {
      const keys = p1.split('.');
      let value = product;
      for (const key of keys) {
        value = value?.[key];
        if (value === undefined) break;
      }
      return value !== undefined ? value : '';
    });
  }

  updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const count = this.getItemCount();
      cartCount.textContent = count > 0 ? count : '';
      cartCount.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  // Static method to get or create cart instance
  static getInstance(key = 'cart', parentSelector = '.product-list') {
    if (!ShoppingCart.instance) {
      ShoppingCart.instance = new ShoppingCart(key, parentSelector);
    }
    return ShoppingCart.instance;
  }
}
