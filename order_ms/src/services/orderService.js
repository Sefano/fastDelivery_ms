import OrderRepository from "../database/orderRepositiry.js";
import ErrorHandler from "../utils/errorHandler.js";

export default class OrderService {
  constructor() {
    this.repository = new OrderRepository();
  }
  async createOrder(userId, cart) {
    try {
      // const amount = cart.reduce((sum, item) => {
      //   return sum + item.product.price * item.unit;
      // }, 0);
      const order = await this.repository.createOrder(userId);
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  async getOrder(orderId) {
    try {
      const order = await this.repository.getOrder(orderId);
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  async cancelOrder(orderId) {
    try {
      return await this.repository.cancelOrder(orderId);
    } catch (error) {
      console.log(error);
    }
  }

  async cancelOrder(orderId, status) {
    try {
      return await this.repository.changeStatus(orderId, status);
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

  async deleteFromCart(userId, productId, unit, name, price, image) {
    try {
      const sumToDec = price * unit;
      const cart = await this.repository.deleteFromCart(
        userId,
        productId,
        name,
        price,
        image,
        unit,
        sumToDec
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async clearCart(userId) {
    try {
      const cart = await this.repository.clearCart(userId);
      return cart;
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

      default:
        break;
    }
  }
}
