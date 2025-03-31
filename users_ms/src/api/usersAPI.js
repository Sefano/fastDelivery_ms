import UserService from "../services/usersService.js";

export default (app) => {
  const service = new UserService();
  app.post("/signup", (request, reply) => {
    try {
      const { email, password, name } = request.body;
      const data = service.SignUp(email, password, name);
    } catch (error) {
      console.log(error);
    }
  });
  app.post("/signin", (request, reply) => {
    reply.send({ hello: "world" });
  });
  app.get("/address", (request, reply) => {
    reply.send({ hello: "world" });
  });
  app.get("/profile", (request, reply) => {
    reply.send({ hello: "world" });
  });
};
