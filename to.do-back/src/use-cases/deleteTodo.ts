import { UsersRepository } from "@/repositories/user-repository";
import { Todo } from "@prisma/client";
import { TodoRepository } from "@/repositories/todo-repository";
import { InvalidCredentialsError } from "./erros/invalid-credencial-erro";
import { TodoNotExist } from "./erros/todo-not-exist";

interface DeleteTodoUseCaseRequest {
  id: string;
  userId: string;
}

interface DeleteTodoUseCaseResponse {
  todo: Todo | null;
}

export class DeleteTodoUseCase {
  constructor(
    private userRepository: UsersRepository,
    private todoRepository: TodoRepository
  ) {}

  async execute({
    id,
    userId,
  }: DeleteTodoUseCaseRequest): Promise<DeleteTodoUseCaseResponse> {
    const userIsExists = await this.userRepository.findById(userId);

    if (!userIsExists) {
      throw new InvalidCredentialsError();
    }

    const doesTodoExists = await this.todoRepository.findById(id);
  
    if (!doesTodoExists) {
      throw new TodoNotExist();
    }

    if (doesTodoExists.userId !== userId) {
      throw new InvalidCredentialsError();
    }
 
    const todo = await this.todoRepository.deleteTodo(id);

    return {
      todo,
    };
  }
}
