import { prismaClient } from "../../lib/prismaClient";
import { AppError } from "../errors/AppError";
import { UserNotFound } from "../errors/UserNotFound";

export class DeleteUserUseCase {
  async execute(id: string) {
    await prismaClient.$transaction(async (tx) => {
      const userToDelete = await tx.user.findUnique({
        where: { id },
      });

      if (!userToDelete) {
        const { name, httpCode, isOperational, message } = new UserNotFound(id);

        throw new AppError(
          name, httpCode, isOperational, message
        );
      }

      return await tx.user.delete({
        where: { id },
      });
    });
  }
}
