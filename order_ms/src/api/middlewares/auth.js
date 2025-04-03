import { validateSignature } from "../../utils/usersUtils.js";

export default async (request, reply, payload) => {
  const token = payload.headers.authorization || payload.headers.Authorization;
  if (!token) {
    return reply.code(403).send({ message: "Пользователь не авторизован" });
  }
  const userPayload = await validateSignature(token);
  if (userPayload) {
    request.user = userPayload;
    return;
  }
  return reply.code(403).send({ message: "Пользователь не авторизован" });
};
