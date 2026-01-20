import { prismaClient } from "../../lib/prismaClient";

export class GetLoggedUserUseCase {
  async execute(id: string) {
    return await prismaClient.user.findUnique({
      where: { id },
    });
  }
}
