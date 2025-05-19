import { renderListWithTemplate } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // Initialize properties
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    // Get the product data
    const productData = new ProductData(this.category);
    this.products = await productData.getData();

    // Add sorting controls to the page
    this.addSortingControls();

    // Render the list
    this.renderList();
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
    return `<li class="product-card">
      <a href="product_pages/${product.Id}.html">
        <img
          src="${product.Image}"
          alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`;
  }
}