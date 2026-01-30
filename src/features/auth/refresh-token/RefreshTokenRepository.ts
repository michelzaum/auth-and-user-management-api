import { AppError } from "../../../application/errors/AppError";
import { InvalidRefreshToken } from "../../../application/errors/InvalidRefreshToken";
import { prismaClient } from "../../../lib/prismaClient";

interface ICreateDTO {
  userId: string;
  expiresAt: Date;
}

export class RefreshTokenRepository {
  async findById(id: string) {
    try {
      return await prismaClient.refreshToken.findUnique({
        where: { id },
      });
    } catch {
      const { name, httpCode, isOperational, message } =
        new InvalidRefreshToken();

      throw new AppError(name, httpCode, isOperational, message);
    }
  }

  async create({ userId, expiresAt }: ICreateDTO) {
    return await prismaClient.refreshToken.create({
      data: {
        userId,
        expiresAt,
      },
    });
  }

  async delete(id: string) {
    return await prismaClient.refreshToken.delete({
      where: { id },
    });
  }
}
