import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credencial-erro";
import { TodoNotExist } from "@/use-cases/erros/todo-not-exist";
import { makeCheckedTodoUseCase } from "@/use-cases/factories/make-check-todo-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function checkTodo(request: FastifyRequest, reply: FastifyReply) {
  const checkTodoBodySchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = checkTodoBodySchema.parse(request.query);

  try {
    const checkTodo = makeCheckedTodoUseCase();

    await checkTodo.execute({
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
