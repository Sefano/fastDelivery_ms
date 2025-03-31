import Fastify from "fastify";
import "dotenv/config";
import usersAPI from "./api/usersAPI.js";

const PORT = process.env.MS_PORT;

const app = Fastify({
  logger: true,
});

usersAPI(app);

const start = async () => {
  try {
    app.listen({ port: PORT }, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
