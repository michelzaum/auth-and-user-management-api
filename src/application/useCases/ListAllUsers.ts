import { prismaClient } from "../../lib/prismaClient";

export class ListAllUsers {
  async execute() {
    return prismaClient.user.findMany();
  }
}
