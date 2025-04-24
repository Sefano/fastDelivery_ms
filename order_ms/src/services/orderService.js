import OrderRepository from "../database/orderRepositiry.js";
import redisClient from "../redis/redis.js";
import { getImageUrl } from "../s3/imageHandler.js";
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

      const imageKeys = order.products.map((product) => product.product.image);

      const cachedUrls = await redisClient.mGet(imageKeys);

      const productsWithUrl = await Promise.all(
        order.products.map(async (product, index) => {
          let imageUrl;

          const cachedImageUrl = cachedUrls[index];
          if (cachedImageUrl) {
            imageUrl = JSON.parse(cachedImageUrl);
          } else {
            imageUrl = await getImageUrl(product.product.image);
            await redisClient.set(
              product.product.image,
              JSON.stringify(imageUrl),
              {
                EX: 60 * 60 * 23,
              }
            );
          }

          return {
            ...product.toObject(),
            product: {
              ...product.product.toObject(),
              imageUrl,
            },
          };
        })
      );

      return {
        ...order.toObject(),
        products: productsWithUrl,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders(userId) {
    try {
      let data;
      data = await this.repository.getOrders(userId);
      if (!data) {
        data = [];
        return data;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async cancelOrder(orderId) {
    try {
      const order = await this.repository.cancelOrder(orderId);
      const imageKeys = order.products.map((product) => product.product.image);

      const cachedUrls = await redisClient.mGet(imageKeys);

      const productsWithUrl = await Promise.all(
        order.products.map(async (product, index) => {
          let imageUrl;

          const cachedImageUrl = cachedUrls[index];
          if (cachedImageUrl) {
            imageUrl = JSON.parse(cachedImageUrl);
          } else {
            imageUrl = await getImageUrl(product.product.image);
            await redisClient.set(
              product.product.image,
              JSON.stringify(imageUrl),
              {
                EX: 60 * 60 * 23,
              }
            );
          }

          return {
            ...product.toObject(),
            product: {
              ...product.product.toObject(),
              imageUrl,
            },
          };
        })
      );

      return {
        ...order.toObject(),
        products: productsWithUrl,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async changeStatus(orderId, status) {
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

  async getCart(userId) {
    try {
      const cart = await this.repository.getCart(userId);
      // for (const product of cart.cart) {
      //   let imageUrl = await getImageUrl(product.product.image);
      //   product.product.image = imageUrl;
      // }
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
