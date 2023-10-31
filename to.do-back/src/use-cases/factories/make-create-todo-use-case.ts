import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaTodoRepository } from "@/repositories/prisma/prisma-todo-repository";
import { CreateTodoUseCase } from "../create-todo";

export function makeCreateTodoUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const todoRepository = new PrismaTodoRepository();
  const createTodoUseCase = new CreateTodoUseCase(usersRepository, todoRepository);
  return createTodoUseCase;
}




