import UsersRepository from "../database/usersRepositiry.js";
import { generateSalt } from "../utils/usersUtils.js";

export default class UserService {
  constructor() {
    this.repository = new UsersRepository();
  }
  async SignUp(email, password, name) {
    try {
      const userExsist = this.repository.findUser(email);
      if (userExsist) {
        return;
      }
      const salt = await generateSalt();
    } catch (error) {
      console.log(error);
    }
  }
}
