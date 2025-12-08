import z from "zod";
import { sign } from "jsonwebtoken";
import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { env } from "../config/env";
import { REFRESH_TOKEN_EXP_TIME_IN_DAYS } from "../../lib/constants";

const schema = z.object({
  refreshToken: z.string().min(1),
});

export class RefreshTokenController implements IController {
  constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {}

  async handler(request: IRequest): Promise<IResponse> {
    const validateSchema = schema.safeParse(request.body);

    if (!validateSchema.success) {
      return {
        statusCode: 400,
        body: {
          error: validateSchema.error.issues,
        }
      }
    }

    const { refreshToken: refreshTokenId } = request.body;

    const refreshToken = await this.refreshTokenRepository.findById(refreshTokenId);

    if (!refreshToken) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid refresh token.',
        }
      }
    }

    if (Date.now() > refreshToken.expiresAt.getTime()) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid refresh token.',
        }
      }
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXP_TIME_IN_DAYS);

    const [accessToken, newRefreshToken] = await Promise.all([
      sign(
        { sub: refreshToken.userId },
        env.jwtSecret,
        { expiresIn: '1d' },
      ),
      this.refreshTokenRepository.create({ userId: refreshToken.userId, expiresAt }),
      this.refreshTokenRepository.delete(refreshToken.id)
    ]);

    return {
      statusCode: 200,
      body: {
        accessToken,
        refreshToken: newRefreshToken.id,
      },
    }
  }
}
