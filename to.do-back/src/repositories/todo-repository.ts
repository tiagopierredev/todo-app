import { Prisma, Todo } from "@prisma/client";

export interface TodoRepository {
  create(data: Prisma.TodoCreateInput): Promise<Todo>;
  checkTodo(id: string, currentChecked: boolean): Promise<Todo | null>;
  deleteTodo: (id: string) => Promise<Todo | null>;
  list(id: String): Promise<{ todos: Todo[]; count: number; checked: number }>;
  findById(id: string): Promise<Todo | null>;
}
