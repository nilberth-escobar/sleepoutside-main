import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function generateProductTemplate(product) {
  return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>
  `;
}

export default class ProductDetailView {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.productData = {};
    this.dataSource = dataSource;
  }

  async initialize() {
    try {
      this.productData = await this.dataSource.findProductById(this.productId);
      this.renderProductDetails("main");
      if (!this.productData) {
        throw new Error(`Product with ID ${this.productId} not found`);
      }
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    } catch (error) {
      console.error("Error initializing ProductDetails:", error);
    }
  }

  addToCart() {
    let currentCart = getLocalStorage("so-cart") || [];
    if (!Array.isArray(currentCart)) {
      currentCart = [currentCart];
    }
    
    const existingItemIndex = currentCart.findIndex(item => item.Id === this.productData.Id);
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      this.productData.quantity = 1;
      currentCart.push(this.productData);
    }

    setLocalStorage("so-cart", currentCart);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = "";
      element.insertAdjacentHTML("afterbegin", generateProductTemplate(this.productData));
    }
  }
}