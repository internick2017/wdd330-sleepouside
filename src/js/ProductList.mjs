import { renderListWithTemplate } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // Initialize properties
    this.category = category || 'tents';
    this.dataSource = dataSource || new ProductData();
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    try {
      // Get the product data from the API
      this.products = await this.dataSource.getData(this.category);
      
      // If no products found, show a message
      if (!this.products || this.products.length === 0) {
        this.listElement.innerHTML = '<p class="no-products">No products found in this category.</p>';
        return;
      }

      // Add sorting controls to the page
      this.addSortingControls();

      // Render the list
      this.renderList();
    } catch (error) {
      this.listElement.innerHTML = '<p class="error">Error loading products. Please try again later.</p>';
    }
  }

  addSortingControls() {
    // Create and insert sorting controls before the product list
    const sortingHtml = `
      <div class="sort-controls">
        <label for="sort-select">Sort by:</label>
        <select id="sort-select">
          <option value="name">Name</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
        </select>
      </div>
    `;
    this.listElement.insertAdjacentHTML('beforebegin', sortingHtml);

    // Add event listener for sorting
    document.getElementById('sort-select').addEventListener('change', (e) => {
      this.sortProducts(e.target.value);
    });
  }

  sortProducts(sortBy) {
    switch(sortBy) {
      case 'name':
        this.products.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case 'price-low':
        this.products.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case 'price-high':
        this.products.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
    }
    // Re-render the list with sorted products
    this.renderList();
  }

  renderList() {
    renderListWithTemplate(
      this.productCardTemplate,
      this.listElement,
      this.products
    );
  }

  productCardTemplate(product) {
    // Handle images - the Images is an object with different size variants
    let imageUrl = '/images/placeholder.jpg';
    
    if (product.Images) {
      // Try to get the best available image in this order of preference
      if (product.Images.PrimaryMedium) {
        imageUrl = product.Images.PrimaryMedium;
      } else if (product.Images.PrimaryLarge) {
        imageUrl = product.Images.PrimaryLarge;
      } else if (product.Images.PrimarySmall) {
        imageUrl = product.Images.PrimarySmall;
      } else if (product.Images.PrimaryExtraLarge) {
        imageUrl = product.Images.PrimaryExtraLarge;
      } else if (product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
        // If there are extra images, use the first one
        imageUrl = product.Images.ExtraImages[0];
      }
    } else if (product.image) {
      // Fallback to direct image property if exists
      imageUrl = product.image;
    }
    
    const productName = product.Name || product.name || 'Product Name';
    const brandName = (product.Brand && (product.Brand.Name || product.Brand.name)) || '';
    const displayName = product.NameWithoutBrand || product.name || productName;
    const price = product.FinalPrice || product.finalPrice || product.price || 0;
    const formattedPrice = `$${parseFloat(price).toFixed(2)}`;
    
    return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id || ''}">
        <img
          src="${imageUrl}"
          alt="${productName}"
          loading="lazy"
        />
        <h3 class="card__brand">${brandName}</h3>
        <h2 class="card__name">${displayName}</h2>
        <p class="product-card__price">${formattedPrice}</p>
      </a>
    </li>`;
  }
}