import UserService from "../services/usersService.js";
import isAuth from "./middlewares/auth.js";
import { addressBody, userUpBody, userInBody } from "../utils/validation.js";
import { SubscribeMessage } from "../utils/messageBroker.js";

export default (app, channel) => {
  const service = new UserService();
  SubscribeMessage(channel, service);

  app.post("/signup", { schema: userUpBody }, async (request, reply) => {
    try {
      const { email, password, name } = request.body;
      const data = await service.SignUp(email, password, name);
      return reply.send(data);
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
