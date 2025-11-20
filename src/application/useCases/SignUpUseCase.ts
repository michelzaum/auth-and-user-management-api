import { prismaClient } from '../../lib/prismaClient';

interface IInput {
  name: string;
  email: string;
  password: string;
}

export class SignUpUseCase {
  async execute({ name, email, password }: IInput) {
    await prismaClient.user.create({
      data: {
        name,
        email,
        password,
        role: 'USER',
      },
    });
  }
}
