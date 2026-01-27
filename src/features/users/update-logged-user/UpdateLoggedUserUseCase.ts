import { prismaClient } from "../../../lib/prismaClient";

interface IInput {
  name: string;
  email: string;
  password: string;
}

export class UpdateLoggedUserUseCase {
  async execute(userId: string, { name, email, password }: IInput) {
    try {
      return await prismaClient.user.update({
        data: {
          name,
          email,
          password,
        },
        where: { id: userId },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
