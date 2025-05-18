import Fastify, { fastify } from "fastify";
import "dotenv/config";
import usersAPI from "./api/usersAPI.js";
import mongoose from "mongoose";
import cors from "cors";
import fastifyMiddie from "@fastify/middie";
import isAuth from "./api/middlewares/auth.js";
import { S3Client } from "@aws-sdk/client-s3";
import { CreateChannel } from "./utils/messageBroker.js";
import redisClient from "../redis/redis.js";

const PORT = process.env.MS_PORT;

const app = Fastify({
  logger: true,
});

//middlewares
await app.register(fastifyMiddie);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const channel = await CreateChannel();

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
usersAPI(app, channel);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await redisClient.connect();
    app.listen({ port: PORT }, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
