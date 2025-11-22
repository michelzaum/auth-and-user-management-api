import { hash } from 'bcrypt';

import { prismaClient } from '../../lib/prismaClient';
import { UserAlreadyExists } from '../errors/UserAlreadyExists';

interface IInput {
  name: string;
  email: string;
  password: string;
}

export class SignUpUseCase {
  async execute({ name, email, password }: IInput) {
    const userAlreadyExists = await prismaClient.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await hash(password, 8);

    await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });
  }
}
