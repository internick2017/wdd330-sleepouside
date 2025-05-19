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
    // Render the list
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