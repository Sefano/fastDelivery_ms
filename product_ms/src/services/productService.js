import ProductRepository from "../database/productRepositiry.js";
import ErrorHandler from "../utils/errorHandler.js";

export default class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }
  async addProduct({ name, description, category, price, image }) {
    try {
      const product = await this.repository.addProduct(
        name,
        description,
        category,
        price,
        image
      );

      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async addCategory(name, description) {
    try {
      const category = await this.repository.addCategory({
        name,
        description,
      });
      return category;
    } catch (error) {
      console.log(error);
    }
  }
  async getCategory(id) {
    try {
      return await this.repository.getCategory(id);
    } catch (error) {
      console.log(error);
    }
  }

  async getCategories() {
    try {
      return await this.repository.getCategories();
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct(id) {
    try {
      return await this.repository.getProduct(id);
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      return await this.repository.getProducts();
    } catch (error) {
      console.log(error);
    }
  }
}
