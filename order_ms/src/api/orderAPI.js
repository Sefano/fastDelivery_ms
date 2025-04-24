import OrderService from "../services/orderService.js";
import isAuth from "./middlewares/auth.js";
import { productBody, caregoryBody } from "../utils/validation.js";
import ROLES from "../../../users_ms/src/utils/roles.js";
import { PublishMessage, SubscribeMessage } from "../utils/messageBroker.js";
import { getImageUrl } from "../s3/imageHandler.js";

export default (app, channel) => {
  const service = new OrderService();

  SubscribeMessage(channel, service);

  //Оформить заказ
  app.post("/order", { preParsing: [isAuth] }, async (request, reply) => {
    try {
      const userId = request.user.id;
      const orderData = await service.createOrder(userId);
      const { _id, amount, status, createdAt } = orderData;

      const data = {
        event: "ADD_ORDER",
        data: { userId, orderId: _id, amount, status, date: createdAt },
      };

      PublishMessage(channel, process.env.USERS_BIND, JSON.stringify(data));
      return reply.send(orderData);
    } catch (error) {
      console.log(error);
    }
  });

  //Получить заказ по ID
  app.get(
    "/order/:orderId",
    { preParsing: [isAuth] },
    async (request, reply) => {
      try {
        const { orderId } = request.params;

        const data = await service.getOrder(orderId);

        return reply.send(data);
      } catch (error) {
        console.log(error);
      }
    }
  );

  //Получить все заказы
  app.get("/orders", { preParsing: [isAuth] }, async (request, reply) => {
    try {
      const userId = request.user.id;
      const data = await service.getOrders(userId);

      return reply.send(data);
    } catch (error) {
      console.log(error);
    }
  });

  //Отменить заказ
  app.put(
    "/order/:orderId",
    { preParsing: [isAuth] },
    async (request, reply) => {
      try {
        const { orderId } = request.params;
        const userId = request.user.id;
        const orderData = await service.cancelOrder(orderId);
        const data = {
          event: "CANCEL_ORDER",
          data: { orderId, userId },
        };
        PublishMessage(channel, process.env.USERS_BIND, JSON.stringify(data));
        return reply.send(orderData);
      } catch (error) {
        console.log(error);
      }
    }
  );

  //Изменить статус заказа
  app.put(
    "/order/courier/:orderId",
    { preParsing: [isAuth] },
    async (request, reply) => {
      try {
        if (request.user.role !== (ROLES.MANAGER || ROLES.COURIER)) {
          return reply.code(403).send({ message: "Недостаточно прав" });
        }
        const { orderId } = request.params;
        const { status, userId } = request.body;
        const orderData = await service.changeStatus(orderId, status);
        const data = {
          event: "CHANGE_STATUS_ORDER",
          data: { orderId, userId, status },
        };
        PublishMessage(channel, process.env.USERS_BIND, JSON.stringify(data));
        return reply.send(orderData);
      } catch (error) {
        console.log(error);
      }
    }
  );

  //Добавление товара в корзину

  app.put("/cart", { preParsing: [isAuth] }, async (request, reply) => {
    try {
      const userId = request.user.id;

      const { action, productId, name, price, image, unit } = request.body;

      if (action === "add") {
        const cartData = await service.addToCart(
          userId,
          productId,
          name,
          price,
          image,
          unit
        );

        const data = {
          event: "ADD_TO_CART",
          data: { userId, productId, name, price, image, unit },
        };
        PublishMessage(channel, process.env.USERS_BIND, JSON.stringify(data));

        return reply.send(cartData);
      } else if (action === "delete") {
        const cartData = await service.deleteFromCart(
          userId,
          productId,
          unit,
          name,
          price,
          image
        );

        const data = {
          event: "DELETE_FROM_CART",
          data: { userId, productId, name, price, image, unit },
        };
        PublishMessage(channel, process.env.USERS_BIND, JSON.stringify(data));

        return reply.send(cartData);
      } else if (action === "clear") {
        const cartData = await service.clearCart(userId);
        const data = {
          event: "CLEAR_CART",
          data: { userId },
        };
        PublishMessage(channel, process.env.USERS_BIND, JSON.stringify(data));
        return reply.send(cartData);
      }
    } catch (error) {
      console.log(error);
    }
  });

  app.delete("/cart/", { preParsing: [isAuth] }, async (request, reply) => {
    try {
      const userId = request.user.id;

      const { productId, unit, name, price, image } = request.body;

      const cartData = await service.addToCart(
        userId,
        productId,
        unit,
        name,
        price,
        image
      );

      const data = {
        event: "ADD_TO_CART",
        data: { userId, productId, name, price, image, unit },
      };
      PublishMessage(channel, process.env.USERS_BIND, JSON.stringify(data));

      return reply.send(cartData);
      return reply.send({ message: "Продукт добавлен в корзину" });
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/cart", { preParsing: [isAuth] }, async (request, reply) => {
    const userId = request.user.id;
    const cart = await service.getCart(userId);
    if (!cart) {
      return reply.send({ message: "Нет корзины" });
    }
    let updatedCart = cart.toObject();
    for (const item of updatedCart.cart) {
      if (item.product.urlExpiresIn < Date.now() + 3600 * 1000) {
        const updatedUrl = await getImageUrl(item.product.image);
        item.product.imgUrl = updatedUrl;
        item.product.urlExpiresIn = Date.now() + 24 * 3600 * 1000;
      }
    }

    return reply.send(updatedCart);
  });
};
