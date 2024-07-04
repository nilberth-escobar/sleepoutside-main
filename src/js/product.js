import { extractParam } from "./utils.mjs";
import ProductInfo from "./ProductData.mjs";
import ProductDetailView from "./ProductDetails.mjs";

const dataProvider = new ProductInfo("tents");
const productIdentifier = extractParam("product");

const productDetails = new ProductDetailView(productIdentifier, dataProvider);
productDetails.initialize();