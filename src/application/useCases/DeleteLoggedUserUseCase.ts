import { prismaClient } from "../../lib/prismaClient";

export class DeleteLoggedUserUseCase {
  async execute(userId: string) {
    try {
      await prismaClient.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
