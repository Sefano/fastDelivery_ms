import Fastify, { fastify } from "fastify";
import "dotenv/config";
import productAPI from "./api/productAPI.js";
import mongoose from "mongoose";
import cors from "cors";
import fastifyMiddie from "@fastify/middie";
import isAuth from "./api/middlewares/auth.js";
import { CreateChannel } from "./utils/messageBroker.js";
import { S3Client } from "@aws-sdk/client-s3";
import fastifyMultipart from "@fastify/multipart";
import redisClient from "./redis/redis.js";

const PORT = process.env.MS_PORT;

const app = Fastify({
  logger: true,
});

//middlewares
await app.register(fastifyMiddie);
await app.register(fastifyMultipart, {
  limits: {
    fileSize: 10000000,
  },
  attachFieldsToBody: true,
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//rabbitMqBroker
const channel = await CreateChannel();

//s3 yandexCient
export const s3Client = new S3Client({
  region: process.env.region,
  endpoint: process.env.endpoint_url,
  credentials: {
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
  },
});

//redis
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("ready", () => console.log("Redis запущен"));

//router
productAPI(app, channel);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // await mongoose.model("product").syncIndexes();
    // await mongoose
    //   .model("product")
    //   .listIndexes()
    //   .then(console.log)
    //   .catch(console.error);
    await redisClient.connect();
    app.listen({ port: PORT }, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
