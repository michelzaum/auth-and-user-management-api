import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prismaClient } from "../../lib/prismaClient";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { env } from '../config/env';

export class SignInUseCase {
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
      { sub: user.id },
      env.jwtSecret,
      { expiresIn: '1d' },
    );

    return accessToken;
  }
}
