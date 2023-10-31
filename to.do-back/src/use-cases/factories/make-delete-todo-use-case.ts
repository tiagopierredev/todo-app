import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaTodoRepository } from "@/repositories/prisma/prisma-todo-repository";
import { DeleteTodoUseCase } from "../deleteTodo";

export function makeDeleteTodoUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const todoRepository = new PrismaTodoRepository();
  const deleteTodoUseCase = new DeleteTodoUseCase(usersRepository, todoRepository);
  return deleteTodoUseCase;
}




