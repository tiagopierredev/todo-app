import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credencial-erro";
import { TodoNotExist } from "@/use-cases/erros/todo-not-exist";
import { makeDeleteTodoUseCase } from "@/use-cases/factories/make-delete-todo-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteTodo(request: FastifyRequest, reply: FastifyReply) {
  const deleteTodoBodySchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = deleteTodoBodySchema.parse(request.query);

  try {
    const deleteTodo = makeDeleteTodoUseCase();

    await deleteTodo.execute({
      id,
      userId: request.user.sub,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof InvalidCredentialsError || err instanceof TodoNotExist) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}
