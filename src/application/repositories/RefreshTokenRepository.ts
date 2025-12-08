import { prismaClient } from '../../lib/prismaClient';

export class RefreshTokenRepository {
  async findById(id: string) {
    return prismaClient.refreshToken.findUnique({
      where: { id },
    });
  }
}
