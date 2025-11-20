import { prismaClient } from "../../lib/prismaClient";

export class ListAllUsersUseCase {
  async execute() {
    return prismaClient.user.findMany();
  }
}
