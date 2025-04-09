import ProductService from "../services/productService.js";
import isAuth from "./middlewares/auth.js";
import { productBody, caregoryBody } from "../utils/validation.js";
import ROLES from "../../../users_ms/src/utils/roles.js";
import { PublishMessage } from "../utils/messageBroker.js";
import { uploadFile, uploadImage } from "../s3/imageHandler.js";
import { pipeline } from "node:stream/promises";
import fs from "fs";

export default (app, channel) => {
  const service = new ProductService();

  app.post("/testProduct", async (request, reply) => {
    try {
      const image = request.body.image;

      const { name, description, category, price } = request.body;

      image.filename = `${name.value}_${category.value.split(" ").join("")}`;

      const buffer = image._buf;
      const filename = image.filename;
      const type = image.mimetype;

      const [s3Upload, data] = await Promise.all([
        uploadImage(filename, buffer, type),
        service.addProduct({
          name: name.value,
          description: description.value,
          category: category.value,
          price: price.value,
          image: filename,
        }),
      ]);

      // const data = await service.addProduct({
      //   name: name.value,
      //   description: description.value,
      //   category: category.value,
      //   price: price.value,
      //   image: filename,
      // });

      // await uploadImage(filename, buffer, type);
      return reply.send(data);
    } catch (error) {
      console.log(error);
    }
  });

  app.post(
    "/product",
    { schema: productBody, preParsing: [isAuth] },
    async (request, reply) => {
      try {
        const permission =
          request.user.role === ROLES.MANAGER ||
          request.user.role === ROLES.ADMIN;
        if (!permission) {
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
        await uploadFile(name);
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
};
