import UsersRepository from "../database/usersRepositiry.js";
import ErrorHandler from "../utils/errorHandler.js";
import {
  generatePassword,
  generateSalt,
  generateToken,
  validatePassword,
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

  async SignIn(email, password) {
    try {
      const userExsist = await this.repository.findUser(email);
      if (!userExsist) {
        throw ErrorHandler.BadRequest("Неверная почта или пароль");
      }
      const isValidPassword = await validatePassword(
        password,
        userExsist.password,
        userExsist.salt
      );
      if (!isValidPassword) {
        throw ErrorHandler.BadRequest("Неверная почта или пароль");
      }
      const token = await generateToken({
        email,
        name: userExsist.name,
        id: userExsist._id,
        role: userExsist.role,
      });
      return { id: userExsist._id, token };
    } catch (error) {
      console.log(error);
    }
  }

  async addAddress(street, city, house, apartments, user) {
    try {
      const changeUser = await this.repository.addAddress(
        street,
        city,
        house,
        apartments,
        user
      );
      return changeUser;
    } catch (error) {
      console.log(error);
    }
  }

  async getProfile(email) {
    try {
      return await this.repository.findUser(email);
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(userId, productId, name, price, image, unit) {
    try {
      const sumToAdd = price * unit;
      return await this.repository.addToCart(
        userId,
        productId,
        name,
        price,
        image,
        unit,
        sumToAdd
      );
    } catch (error) {
      console.log(error);
    }
  }

  async addOrder() {}
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
      case "ADD_ORDER":
        this.addOrder(orderId, amount, date, status);
      default:
        break;
    }
  }
}
