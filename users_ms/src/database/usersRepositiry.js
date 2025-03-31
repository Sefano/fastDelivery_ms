import { User } from "./models/exports.js";

export default class UsersRepository {
  async addUser({ email, password, name, salt }) {
    try {
      const user = new User({ email, password, name, salt });
      const savedUser = await user.save();
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
}
