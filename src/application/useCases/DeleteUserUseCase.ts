import { prismaClient } from "../../lib/prismaClient";
import { HttpCodes } from "../../lib/shared/httpCodes";
import { AppError } from "../errors/AppError";

export class DeleteUserUseCase {
  async execute(id: string) {
    await prismaClient.$transaction(async (tx) => {
      const userToDelete = await tx.user.findUnique({
        where: { id },
      });

      if (!userToDelete) {
        throw new AppError(
          'User not found',
          HttpCodes.BadRequest,
          true,
          `User with id ${id} not found.`,
        );
      }

      return await tx.user.delete({
        where: { id },
      });
    });
  }
}
