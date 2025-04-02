import Fastify, { fastify } from "fastify";
import "dotenv/config";
import productAPI from "./api/productAPI.js";
import mongoose from "mongoose";
import cors from "cors";
import fastifyMiddie from "@fastify/middie";
import isAuth from "./api/middlewares/auth.js";
import { CreateChannel } from "./utils/messageBroker.js";

const PORT = process.env.MS_PORT;

const app = Fastify({
  logger: true,
});

//middlewares
await app.register(fastifyMiddie);
app.use(cors());

const channel = await CreateChannel();

productAPI(app, channel);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen({ port: PORT }, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
