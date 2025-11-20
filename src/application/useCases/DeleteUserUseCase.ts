import { prismaClient } from "../../lib/prismaClient";

export class DeleteUserUseCase {
  async execute(id: string) {
    const result = prismaClient.user.delete({
      where: { id },
    });

    return result;
  }
}