import { User } from "./models/exports.js";
import STATUS from "../utils/status.js";

export default class UsersRepository {
  async addUser({ email, password, name, salt, role }) {
    try {
      console.log("HERE");
      const user = new User({ email, password, name, salt, role });
      const savedUser = await user.save();
      // await savedUser.updateOne({
      //   $push: { address: { userId: savedUser._id } },
      // });
      return savedUser;
    } catch (error) {
      console.log(error);
    }
  }
  async addAddress(street, city, house, apartments, user) {
    try {
      const changeUser = await User.findOne({ email: user.email });

      await changeUser.updateOne({
        $push: { address: { street, city, house, apartments } },
      });

      return changeUser;
    } catch (error) {
      console.log(error);
    }
  }
  async findUser(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async addToCart(userId, productId, name, price, image, unit, sumToAdd) {
    try {
      console.log(sumToAdd);
      const user = await User.findById({ _id: userId });

      const existingItemIndex = user.cart.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex >= 0) {
        user.cart[existingItemIndex].unit += unit;
        user.cart[existingItemIndex].product.price += sumToAdd;
        user.cartAmount += sumToAdd;
        await user.save();
        return user;
      }

      await user.updateOne({
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
        cartAmount: user.cartAmount + sumToAdd,
      });
      // const userToUpdate = await User.findByIdAndUpdate(
      //   { _id: userId },
      //   {
      //     $push: {
      //       cart: {
      //         product: {
      //           id: _id,
      //           name,
      //           price,
      //           image,
      //         },
      //         unit,
      //       },
      //     },

      //     cartAmount: cartAmount + sumToAdd,
      //   }
      // );
      return { cart: user.cart, cartAmount: user.cartAmount };
    } catch (error) {
      console.log(error);
    }
  }

  async removeFromCart(userId, productId, name, price, image, unit, sumToDec) {
    try {
      const user = await User.findById({ _id: userId });

      const existingItemIndex = user.cart.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex >= 0) {
        if (user.cart[existingItemIndex].unit === 1) {
          user.cart.splice(existingItemIndex, 1);
          user.cartAmount = Math.max(0, cart.cartAmount - sumToDec);
          await user.save();
          return user;
        }
        user.cart[existingItemIndex].unit -= unit;
        user.cartAmount -= sumToDec;
        await user.save();
        return user;
      } else {
        throw new ErrorHandler.BadRequest("Товара нет в корзине");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async clearCart(userId) {
    try {
      const user = await User.findById({ _id: userId });

      await user.updateOne({
        cart: [],
        cartAmount: 0,
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async addOrder(userId, orderId, amount, date, status) {
    try {
      const user = await User.findById(userId);

      await user.updateOne({
        $push: {
          orders: {
            orderId,
            amount,
            date,
            status,
          },
        },
      });

      await user.updateOne({
        cart: [],
        cartAmount: 0,
      });
      return user.orders;
    } catch (error) {
      console.log(error);
    }
  }

  async cancelOrder(orderId, userId) {
    try {
      const result = await User.updateOne(
        {
          _id: userId,
          "orders.orderId": orderId,
        },
        {
          $set: {
            "orders.$.status": STATUS.CANCELLED,
          },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async changeStatus(orderId, userId, status) {
    try {
      const result = await User.updateOne(
        {
          _id: userId,
          "orders.orderId": orderId,
        },
        {
          $set: {
            "orders.$.status": status,
          },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
