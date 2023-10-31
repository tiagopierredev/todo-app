import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credencial-erro";
import { makeCreateTodoUseCase } from "@/use-cases/factories/make-create-todo-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createTodo(request: FastifyRequest, reply: FastifyReply) {
  const createTodoBodySchema = z.object({
    userId: z.string().uuid(),
    name: z.string(),
  });

  const { name, userId } = createTodoBodySchema.parse(request.body);

  try {
    const createTodo = makeCreateTodoUseCase();

    await createTodo.execute({
      name,
      userId,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}
