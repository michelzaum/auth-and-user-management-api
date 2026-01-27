import { prismaClient } from "../../../lib/prismaClient";

import { AppError } from "../../../application/errors/AppError";
import { UserNotFound } from "../../../application/errors/UserNotFound";

export class DeleteLoggedUserUseCase {
  async execute(id: string) {
    await prismaClient.$transaction(async (tx) => {
      const userToDelete = await tx.user.findUnique({
        where: { id },
      });

      if (!userToDelete) {
        const { name, httpCode, isOperational, message } = new UserNotFound(id);

        throw new AppError(name, httpCode, isOperational, message);
      }

      await tx.user.delete({
        where: { id },
      });
    });
  }
}
