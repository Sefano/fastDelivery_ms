import ProductService from "../services/productService.js";
import isAuth from "./middlewares/auth.js";
import { productBody, caregoryBody } from "../utils/validation.js";
import ROLES from "../../../users_ms/src/utils/roles.js";

export default (app) => {
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

  app.put("/cart", async (request, reply) => {
    try {
      const data = await service.addToCart();
      return reply.send({ message: "Адрес успешно обновлен" });
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
