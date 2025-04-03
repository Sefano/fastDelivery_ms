import UserService from "../services/usersService.js";
import isAuth from "./middlewares/auth.js";
import { addressBody, userUpBody, userInBody } from "../utils/validation.js";
import { PublishMessage, SubscribeMessage } from "../utils/messageBroker.js";

export default (app, channel) => {
  const service = new UserService();
  SubscribeMessage(channel, service);

  app.post("/signup", { schema: userUpBody }, async (request, reply) => {
    try {
      const { email, password, name } = request.body;
      const userData = await service.SignUp(email, password, name);
      console.log(userData);
      const { id } = userData;
      const data = {
        event: "CREATE_CART",
        data: { userId: id },
      };
      console.log(data);
      PublishMessage(channel, process.env.USER_CART_BIND, JSON.stringify(data));
      return reply.send(userData);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/signin", { schema: { userInBody } }, async (request, reply) => {
    try {
      const { email, password } = request.body;
      const data = await service.SignIn(email, password);
      return reply.send(data);
    } catch (error) {
      console.log(error);
    }
  });

  app.put(
    "/address",
    { schema: addressBody, preParsing: [isAuth] },
    async (request, reply) => {
      try {
        const { street, city, house, apartments } = request.body;
        const user = request.user;
        const data = await service.addAddress(
          street,
          city,
          house,
          apartments,
          user
        );
        if (!data) {
          return reply.code(500).send({ message: "Не удалось добавить адрес" });
        }
        return reply.send({ message: "Адрес успешно обновлен" });
      } catch (error) {
        console.log(error);
      }
    }
  );

  app.get("/profile", { preParsing: [isAuth] }, async (request, reply) => {
    try {
      const email = request.user.email;
      const data = await service.getProfile(email);
      return reply.send(data);
    } catch (error) {
      console.log(error);
    }
  });
};
