import { prismaClient } from "../../lib/prismaClient";

export class ListAllUsersUseCase {
  async execute() {
    return await prismaClient.user.findMany();
  }
}
