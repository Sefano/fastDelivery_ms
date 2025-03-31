import { User } from "./models/exports.js";

export default class UsersRepository {
  async addUser() {}
  async addAddress() {}
  async findUser(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
