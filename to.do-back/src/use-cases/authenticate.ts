import { InvalidCredentialsError } from "./erros/invalid-credencial-erro";
import { UsersRepository } from "@/repositories/user-repository";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
