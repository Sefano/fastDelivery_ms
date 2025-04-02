import ProductService from "../services/productService.js";
import isAuth from "./middlewares/auth.js";
import { productBody, caregoryBody } from "../utils/validation.js";
import ROLES from "../../../users_ms/src/utils/roles.js";
import { PublishMessage } from "../utils/messageBroker.js";

export default (app, channel) => {
  const service = new ProductService();

  app.post(
    "/product",
    { schema: productBody, preParsing: [isAuth] },
    async (request, reply) => {
      try {
        if (request.user.role !== (ROLES.MANAGER || ROLES.ADMIN)) {
          return reply.code(403).send({ message: "Недостаточно прав" });
        }
        const { name, description, category, price, image } = request.body;
        const data = await service.addProduct(
          name,
          description,
          category,
          price,
          image
        );
        return reply.send(data);
      } catch (error) {
        console.log(error);
      }
    }
  );

  app.post(
    "/category",
    { schema: caregoryBody, preParsing: [isAuth] },
    async (request, reply) => {
      try {
        if (request.user.role !== (ROLES.MANAGER || ROLES.ADMIN)) {
          return reply.code(403).send({ message: "Недостаточно прав" });
        }
        const { name, description } = request.body;
        const data = await service.addCategory(name, description);
        return reply.send(data);
      } catch (error) {
        console.log(error);
      }
    }
  );
  app.get("/category/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      const data = await service.getCategory(id);
      return reply.send(data);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/categories", async (request, reply) => {
    try {
      const data = await service.getCategories();
      return reply.send(data);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/product/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      console.log(id);
      const data = await service.getProduct(id);
      return reply.send(data);
    } catch (error) {
      console.log(error);
    }
  });
  app.get("/products", async (request, reply) => {
    try {
      const data = await service.getProducts();
      return reply.send(data);
    } catch (error) {
      console.log(error);
    }
  });

  app.put("/cart/:id", { preParsing: [isAuth] }, async (request, reply) => {
    try {
      const userId = request.user.id;

      const { id } = request.params;
      const unit = request.body.unit;
      const { _id, name, price, image } = await service.getProduct(id);
      const data = {
        event: "ADD_TO_CART",
        data: { userId, _id, name, price, image, unit },
      };
      PublishMessage(channel, process.env.PRODUCT_BIND, JSON.stringify(data));
      return reply.send({ message: "Продукт добавлен в корзину" });
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/cart", { preParsing: [isAuth] }, async (request, reply) => {
    try {
      return reply.send(data);
    } catch (error) {
      console.log(error);
    }
  });
};
