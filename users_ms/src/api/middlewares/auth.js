import redisClient from "../../../redis/redis.js";
import { validateSignature } from "../../utils/usersUtils.js";

export default async (request, reply, payload) => {
  const token = payload.headers.authorization || payload.headers.Authorization;
  if (!token) {
    reply.code(401).send({ message: "Пользователь не авторизован" });
  }

  const blToken = token.split(" ")[1];
  const isBl = await redisClient.get(`bl:${blToken}`);
  console.log(isBl);
  if (isBl) {
    reply.code(401).send({ message: "Пользователь не авторизован" });
  }
  const userPayload = await validateSignature(token);
  if (userPayload) {
    request.user = userPayload;
    return;
  }
  reply.code(401).send({ message: "Пользователь не авторизован" });
};
