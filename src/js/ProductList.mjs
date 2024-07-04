// productList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
   <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
   />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <span class="product-card__discount">$${product.SuggestedRetailPrice} </span>
  <p class="product-card__price">$${product.FinalPrice}</p>
  </a>
</li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);
    document.querySelector(".title").innerHTML = this.category;
    this.addSortingEventListeners();
  }

  renderList(list) {
    list.splice(2, 1);
    list.splice(3, 1);
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  addSortingEventListeners() {
    const sortNameBtn = document.getElementById("sort-name");
    const sortPriceBtn = document.getElementById("sort-price");

    sortNameBtn.addEventListener("click", () => this.sortProducts("name"));
    sortPriceBtn.addEventListener("click", () => this.sortProducts("price"));
  }

  sortProducts(criteria) {
    if (criteria === "name") {
      this.products.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (criteria === "price") {
      this.products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    this.renderList(this.products);
  }
}