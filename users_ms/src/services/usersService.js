import UsersRepository from "../database/usersRepositiry.js";
import ErrorHandler from "../utils/errorHandler.js";
import {
  generatePassword,
  generateSalt,
  generateToken,
} from "../utils/usersUtils.js";

export default class UserService {
  constructor() {
    this.repository = new UsersRepository();
  }
  async SignUp(email, password, name) {
    try {
      const userExsist = await this.repository.findUser(email);
      if (userExsist) {
        throw ErrorHandler.BadRequest("Пользователь уже существует ");
      }
      const salt = await generateSalt();
      const dbPassword = await generatePassword(password, salt);
      const user = await this.repository.addUser({
        email,
        password: dbPassword,
        name,
        salt,
      });
      const token = await generateToken({
        email,
        name,
        id: user._id,
        role: user.role,
      });
      return { id: user._id, token };
    } catch (error) {
      console.log(error);
    }
  }
}
