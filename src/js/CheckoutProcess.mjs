import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// Helper function to convert form data to JSON
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemSubtotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    if (!this.list || this.list.length === 0) {
      this.itemSubtotal = 0;
      this.displayOrderTotals();
      return;
    }

    // Calculate the subtotal from cart items
    this.itemSubtotal = this.list.reduce((total, item) => {
      return total + (parseFloat(item.price) * (item.quantity || 1));
    }, 0);

    this.displayOrderTotals();
  }

  calculateOrderTotal() {
    // Calculate tax (6% of subtotal)
    this.tax = this.itemSubtotal * 0.06;

    // Calculate shipping ($10 for first item + $2 for each additional item)
    const itemCount = this.list.reduce((count, item) => count + (item.quantity || 1), 0);
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    // Calculate order total
    this.orderTotal = this.itemSubtotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // Update subtotal
    const subtotalElement = document.getElementById("subtotal");
    if (subtotalElement) {
      subtotalElement.textContent = this.itemSubtotal.toFixed(2);
    }

    // Update tax
    const taxElement = document.getElementById("tax");
    if (taxElement) {
      taxElement.textContent = this.tax.toFixed(2);
    }

    // Update shipping
    const shippingElement = document.getElementById("shipping");
    if (shippingElement) {
      shippingElement.textContent = this.shipping.toFixed(2);
    }

    // Update order total
    const orderTotalElement = document.getElementById("order-total");
    if (orderTotalElement) {
      orderTotalElement.textContent = this.orderTotal.toFixed(2);
    }
  }

  // Takes the items currently stored in the cart (localStorage) and returns them in a simplified form
  packageItems(items) {
    return items.map(item => ({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      quantity: item.quantity || 1
    }));
  }

  async checkout(form) {
    try {
      // Get the form element data by the form name
      const formData = formDataToJSON(form);

      // Create order date in ISO format
      const orderDate = new Date().toISOString();

      // Package the items for the order
      const packagedItems = this.packageItems(this.list);

      // Create the JSON order object
      const order = {
        orderDate: orderDate,
        fname: formData.fname,
        lname: formData.lname,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        cardNumber: formData.cardNumber,
        expiration: formData.expiration,
        code: formData.code,
        items: packagedItems,
        orderTotal: this.orderTotal.toFixed(2),
        shipping: this.shipping,
        tax: this.tax.toFixed(2)
      };

      // Call the checkout method in the ExternalServices module
      const response = await this.services.checkout(order);
      return response;
    } catch (error) {
      console.error("Checkout error:", error);
      throw error;
    }
  }
}
