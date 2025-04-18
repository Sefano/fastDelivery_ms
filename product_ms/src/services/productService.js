import ProductRepository from "../database/productRepositiry.js";
import redisClient from "../redis/redis.js";
import { getImageUrl } from "../s3/imageHandler.js";
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
      const products = await this.repository.getProducts();

      //кеш ссылок в редисе

      const imageKeys = products.map((product) => product.image);
      const cachedUrls = await redisClient.mGet(imageKeys);
      console.log(cachedUrls);

      const objProducts = await Promise.all(
        products.map(async (product, index) => {
          let imageUrl;

          const cachedImageUrl = cachedUrls[index];
          if (cachedImageUrl) {
            imageUrl = JSON.parse(cachedImageUrl);
          } else {
            imageUrl = await getImageUrl(product.image);
            await redisClient.set(product.image, JSON.stringify(imageUrl), {
              EX: 60 * 60 * 23,
            });
          }

          return {
            ...product.toObject(),
            imageUrl,
          };
        })
      );

      //без редиса

      // const objProducts = await Promise.all(
      //   products.map(async (product, index) => {
      //     let imageUrl = await getImageUrl(product.image);
      //     return {
      //       ...product.toObject(),
      //       imageUrl,
      //     };
      //   })
      // );

      return objProducts;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsMin() {
    try {
      const products = await this.repository.getProducts();

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
