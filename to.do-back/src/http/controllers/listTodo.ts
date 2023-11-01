import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credencial-erro";
import { makeCreateTodoUseCase } from "@/use-cases/factories/make-create-todo-use-case";
import { makeListTodoUseCase } from "@/use-cases/factories/make-list-todo-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listTodo(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listTodo = makeListTodoUseCase();

    const todos = await listTodo.execute({
      id: request.user.sub,
    });

    return reply.status(200).send({
      ...todos,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}
