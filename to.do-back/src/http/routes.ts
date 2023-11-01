import { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate";
import { register } from "./controllers/register";
import { createTodo } from "./controllers/createTodo";
import { listTodo } from "./controllers/listTodo";
import { checkTodo } from "./controllers/checkTodo";
import { deleteTodo } from "./controllers/deleteTodo";
import { verifyJwt } from "./middlewares/verify-jwt";
import { refresh } from "./controllers/refresh";

export async function appRoutes(app: FastifyInstance) {
  app.post("/login", authenticate);
  app.post("/register", register);

  app.patch("/refresh/token", refresh);

  // Authenticated routes
  app.post("/todo", { onRequest: [verifyJwt] }, createTodo);
  app.get("/todo", { onRequest: [verifyJwt] }, listTodo);
  app.patch("/todo", { onRequest: [verifyJwt] }, checkTodo);
  app.delete("/todo", { onRequest: [verifyJwt] }, deleteTodo);
}
