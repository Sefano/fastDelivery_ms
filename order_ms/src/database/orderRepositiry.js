import ErrorHandler from "../utils/errorHandler.js";
import { Cart, Order } from "./models/exports.js";
import STATUS from "../utils/status.js";
export default class OrderRepository {
  async createOrder(userId) {
    try {
      const cart = await Cart.findOne({ userId });
      const order = new Order({
        userId,
        products: cart.cart,
        amount: cart.cartAmount,
      });

      const savedOrder = order.save();

      await cart.updateOne({
        cart: [],
        cartAmount: 0,
      });

      return savedOrder;
    } catch (error) {
      console.log(error);
    }
  }

  async getOrder(orderId) {
    try {
      const order = await Order.findById({ _id: orderId });
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(userId, productId, name, price, image, unit, sumToAdd) {
    try {
      let cart;
      cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({
          userId,
        });
        await cart.save();
      }

      const existingItemIndex = cart.cart.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex >= 0) {
        cart.cart[existingItemIndex].unit += unit;
        cart.cart[existingItemIndex].product.price += sumToAdd;
        cart.cartAmount += sumToAdd;
        await cart.save();
        return cart;
      }

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

  async deleteFromCart(userId, productId, name, price, image, unit, sumToDec) {
    try {
      // let cart;
      const cart = await Cart.findOne({ userId });

      const existingItemIndex = cart.cart.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex >= 0) {
        if (cart.cart[existingItemIndex].unit === 1) {
          cart.cart.splice(existingItemIndex, 1);
          cart.cartAmount = Math.max(0, cart.cartAmount - sumToDec);
          await cart.save();
          return cart;
        }

        cart.cart[existingItemIndex].unit -= unit;
        cart.cartAmount -= sumToDec;
        await cart.save();
        return cart;
      } else {
        throw new ErrorHandler.BadRequest("Товара нет в корзине");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async clearCart(userId) {
    try {
      const cart = await Cart.findOne({ userId });
      await cart.updateOne({
        cart: [],
        cartAmount: 0,
      });
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async cancelOrder(orderId) {
    try {
      return await Order.findByIdAndUpdate(
        { _id: orderId },
        { status: STATUS.CANCELLED }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async changeStatus(orderId, status) {
    try {
      return await Order.findByIdAndUpdate(
        { _id: orderId },
        { status: status }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
