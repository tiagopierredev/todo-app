import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { TodoRepository } from "../todo-repository";

export class PrismaTodoRepository implements TodoRepository {
  async create(data: Prisma.TodoCreateInput) {
    const todo = await prisma.todo.create({
      data,
    });

    return todo;
  }

  async list(id: string) {
    const todos = await prisma.todo.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const count = await prisma.todo.count({
      where: {
        userId: id,
      },
    });

    const checked = await prisma.todo.count({
      where: {
        userId: id,
        is_checked: true,
      },
    });

    return {
      todos,
      count,
      checked,
    };
  }

  async findById(id: string) {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    return todo;
  }

  async checkTodo(id: string, currentChecked: boolean) {
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        is_checked: currentChecked,
      },
    });

    return todo;
  }

  async deleteTodo(id: string) {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return todo;
  }
}
