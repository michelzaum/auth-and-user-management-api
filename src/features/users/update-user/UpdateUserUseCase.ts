import { prismaClient } from "../../../lib/prismaClient";
import { AppError } from "../../../application/errors/AppError";
import { UserNotFound } from "../../../application/errors/UserNotFound";

interface IInput {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}

export class UpdateUserUseCase {
  async execute({ id, name, email, password, role }: IInput) {
    return await prismaClient.$transaction(async (tx) => {
      const userToUpdate = await tx.user.findUnique({
        where: { id },
      });

      if (!userToUpdate) {
        const { name, httpCode, isOperational, message } = new UserNotFound(id);

        throw new AppError(name, httpCode, isOperational, message);
      }

      const result = await tx.user.update({
        data: {
          name,
          email,
          password,
          role,
        },
        where: { id },
      });

      return result;
    });
  }
}
