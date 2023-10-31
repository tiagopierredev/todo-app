import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credencial-erro";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email("Email invalid"),
    password: z.string().min(6, "Password must have at least 6 characters"),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    
    const { user } = await authenticateUseCase.execute({
      email: email.toLowerCase(),
      password,
    });

    return reply.status(200).send(user);
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}
