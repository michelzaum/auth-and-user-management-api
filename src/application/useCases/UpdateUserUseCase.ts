import { prismaClient } from "../../lib/prismaClient";

interface IInput {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}

export class UpdateUserUseCase {
  async execute({ id, name, email, password, role }: IInput) {
    const result = prismaClient.user.update({
      data: {
        name, email, password, role,
      },
      where: { id },
    });

    return result;
  }
}
