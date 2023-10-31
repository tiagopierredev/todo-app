import { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate";
import { register } from "./controllers/register";
import { createTodo } from "./controllers/createTodo";
import { listTodo } from "./controllers/listTodo";
import { checkTodo } from "./controllers/checkTodo";
import { deleteTodo } from "./controllers/deleteTodo";

export async function appRoutes(app: FastifyInstance) {
  app.post("/login", authenticate);
  app.post("/register", register);

  app.post("/todo", createTodo);
  app.get("/todo", listTodo);
  app.patch("/todo", checkTodo);
  app.delete("/todo", deleteTodo);
}
