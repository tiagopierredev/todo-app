import { UsersRepository } from "@/repositories/user-repository";
import { Todo } from "@prisma/client";
import { TodoRepository } from "@/repositories/todo-repository";
import { InvalidCredentialsError } from "./erros/invalid-credencial-erro";

interface ListTodoUseCaseRequest {
  id: string;
}

interface ListTodoUseCaseResponse {
  todos: Todo[];
  count: number;
  checked: number;
}

export class ListTodoUseCase {
  constructor(
    private userRepository: UsersRepository,
    private todoRepository: TodoRepository
  ) {}

  async execute({
    id,
  }: ListTodoUseCaseRequest): Promise<ListTodoUseCaseResponse> {
    const userIsExists = await this.userRepository.findById(id);

    if (!userIsExists) {
      throw new InvalidCredentialsError();
    }

    const todos = await this.todoRepository.list(id);

    return todos;
  }
}
