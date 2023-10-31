import { UsersRepository } from "@/repositories/user-repository";
import { Todo } from "@prisma/client";
import { TodoRepository } from "@/repositories/todo-repository";
import { InvalidCredentialsError } from "./erros/invalid-credencial-erro";

interface CreateTodoUseCaseRequest {
  name: string;
  userId: string;
}

interface CreateTodoUseCaseResponse {
  todo: Todo;
}

export class CreateTodoUseCase {
  constructor(
    private userRepository: UsersRepository,
    private todoRepository: TodoRepository
  ) {}

  async execute({
    name,
    userId,
  }: CreateTodoUseCaseRequest): Promise<CreateTodoUseCaseResponse> {
    const userIsExists = await this.userRepository.findById(userId);

    if (!userIsExists) {
      throw new InvalidCredentialsError();
    }

    const todo = await this.todoRepository.create({
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    });

    return {
      todo,
    };
  }
}
