import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaTodoRepository } from "@/repositories/prisma/prisma-todo-repository";
import { ListTodoUseCase } from "../list-todo";

export function makeListTodoUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const todoRepository = new PrismaTodoRepository();
  const createListTodoUseCase = new ListTodoUseCase(usersRepository, todoRepository);
  return createListTodoUseCase;
}




