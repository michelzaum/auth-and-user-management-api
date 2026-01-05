import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prismaClient } from "../../lib/prismaClient";
import { REFRESH_TOKEN_EXP_TIME_IN_DAYS } from "../../lib/constants";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { env } from '../config/env';
import { RefreshTokenRepository } from '../repositories/RefreshTokenRepository';

export class SignInUseCase {
  constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {}

  async execute(email: string, password: string) {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      {
        sub: user.id,
        role: user.role,
      },
      env.jwtSecret,
      { expiresIn: '1d' },
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXP_TIME_IN_DAYS);

    const { id } = await this.refreshTokenRepository.create({ userId: user.id, expiresAt });

    return {
      accessToken,
      refreshToken: id,
    };
  }
}
