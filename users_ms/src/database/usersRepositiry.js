import { User } from "./models/exports.js";

export default class UsersRepository {
  async addUser({ email, password, name, salt }) {
    try {
      console.log("HERE");
      const user = new User({ email, password, name, salt });
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
}
