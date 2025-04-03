import ErrorHandler from "../utils/errorHandler.js";
import { Cart, Order } from "./models/exports.js";
export default class OrderRepository {
  async createOrder(userId, cart, amount) {
    try {
      const order = new Order({
        userId,
        products: cart,
        amount,
      });
      const savedOrder = order.save();
      return savedOrder;
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(userId, productId, name, price, image, unit, sumToAdd) {
    try {
      const cart = await Cart.findOne({ userId });

      const updatedCart = await cart.updateOne({
        $push: {
          cart: {
            product: {
              id: productId,
              name,
              price,
              image,
            },
            unit,
          },
        },
        cartAmount: cart.cartAmount + sumToAdd,
      });

      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(userId) {
    try {
      const isExist = await Cart.findOne({ userId });
      if (isExist) {
        throw new ErrorHandler.BadRequest(
          "Корзина для этого пользователя уже существует"
        );
      }
      const cart = new Cart({ userId });
      const savedCart = await cart.save();
      return savedCart;
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
}
