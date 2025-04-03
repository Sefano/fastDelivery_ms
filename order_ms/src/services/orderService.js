import OrderRepository from "../database/orderRepositiry.js";
import ErrorHandler from "../utils/errorHandler.js";

export default class OrderService {
  constructor() {
    this.repository = new OrderRepository();
  }
  async createOrder(userId, cart) {
    try {
      const amount = cart.reduce((sum, item) => {
        return sum + item.product.price * item.unit;
      }, 0);
      const order = await this.repository.createOrder(userId, cart, amount);
      return order;
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

  // async addToCart(street, city, house, apartments, user) {
  //   try {
  //     const changeUser = await this.repository.addToCart(
  //       street,
  //       city,
  //       house,
  //       apartments,
  //       user
  //     );
  //     return changeUser;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async addToCart(userId, productId, name, price, image, unit) {
    try {
      const sumToAdd = price * unit;
      const cart = await this.repository.addToCart(
        userId,
        productId,
        name,
        price,
        image,
        unit,
        sumToAdd
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(userId) {
    try {
      return await this.repository.createCart(userId);
    } catch (error) {
      console.log(error);
    }
  }

  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);
    const { event, data } = payload;

    const {
      userId,
      productId,
      name,
      price,
      image,
      unit,
      orderId,
      amount,
      date,
      status,
    } = data;
    switch (event) {
      case "ADD_TO_CART":
        this.addToCart(userId, productId, name, price, image, unit);
        break;
      case "CREATE_CART":
        this.createCart(userId);
        break;
      default:
        break;
    }
  }
}
