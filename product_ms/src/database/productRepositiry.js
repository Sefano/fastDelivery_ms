import { Category, Product } from "./models/exports.js";

export default class ProductRepository {
  async addProduct(name, description, category, price, image) {
    try {
      const product = new Product({
        name,
        description,
        category,
        price,
        image,
      });

      const savedProduct = await product.save();

      await Category.findByIdAndUpdate(
        { _id: category },
        {
          $push: {
            products: savedProduct._id,
          },
        }
      );
      return savedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async addCategory(name, description) {
    try {
      const category = new Category(name, description);
      const savedCategory = await category.save();
      return savedCategory;
    } catch (error) {
      console.log(error);
    }
  }
  async getCategory(id) {
    try {
      const category = await Category.findById(id).populate("products");
      return category;
    } catch (error) {
      console.log(error);
    }
  }
  async getCategories() {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart() {}
}
