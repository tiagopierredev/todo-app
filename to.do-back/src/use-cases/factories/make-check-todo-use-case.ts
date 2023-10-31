import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaTodoRepository } from "@/repositories/prisma/prisma-todo-repository";
import { CheckTodoUseCase } from "../checkTodo";

export function makeCheckedTodoUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const todoRepository = new PrismaTodoRepository();
  const createTodoUseCase = new CheckTodoUseCase(usersRepository, todoRepository);
  return createTodoUseCase;
}




