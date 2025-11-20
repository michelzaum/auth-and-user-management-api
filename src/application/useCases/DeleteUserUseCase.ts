import { prismaClient } from "../../lib/prismaClient";

export class DeleteUserUseCase {
  async execute(id: string) {
    return await prismaClient.user.delete({
      where: { id },
    });
  }
}
