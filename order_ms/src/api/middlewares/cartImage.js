import { validateSignature } from "../../utils/usersUtils.js";

export default async (request, reply) => {
  const userPayload = await validateSignature(token);
  if (userPayload) {
    request.user = userPayload;
    return;
  }
  return reply.code(403).send({ message: "Пользователь не авторизован" });
};
