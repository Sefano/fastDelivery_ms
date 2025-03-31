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
  async addAddress() {}
  async findUser(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
