import { prismaClient } from "../../../lib/prismaClient";

interface ICreateDTO {
  userId: string;
  expiresAt: Date;
}

export class RefreshTokenRepository {
  async findById(id: string) {
    return prismaClient.refreshToken.findUnique({
      where: { id },
    });
  }

  async create({ userId, expiresAt }: ICreateDTO) {
    return prismaClient.refreshToken.create({
      data: {
        userId,
        expiresAt,
      },
    });
  }

  async delete(id: string) {
    return prismaClient.refreshToken.delete({
      where: { id },
    });
  }
}
