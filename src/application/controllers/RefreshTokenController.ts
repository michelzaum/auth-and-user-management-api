import z from "zod";
import { sign } from "jsonwebtoken";
import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { env } from "../config/env";
import { REFRESH_TOKEN_EXP_TIME_IN_DAYS } from "../../lib/constants";
import { HttpCodes } from "../../lib/shared/httpCodes";
import { AppError } from "../errors/AppError";
import { InvalidRefreshToken } from "../errors/InvalidRefreshToken";

const schema = z.object({
  refreshToken: z.string().min(1),
});

export class RefreshTokenController implements IController {
  constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {}

  async handler(request: IRequest): Promise<IResponse> {
    try {
      const validateSchema = schema.safeParse(request.body);
  
      if (!validateSchema.success) {
        const field = validateSchema.error.issues[0].path;
        const message = validateSchema.error.issues[0].message;
  
        throw new AppError(
          validateSchema.error.name,
          HttpCodes.Unauthorized,
          true,
          `${field}: ${message}`,
        );
      }
  
      const { refreshToken: refreshTokenId } = request.body;
  
      const refreshToken = await this.refreshTokenRepository.findById(refreshTokenId);
  
      if (!refreshToken) {
        const { name, httpCode, isOperational, message } = new InvalidRefreshToken();
  
        throw new AppError(
          name,
          httpCode,
          isOperational,
          message,
        );
      }
  
      if (Date.now() > refreshToken.expiresAt.getTime()) {
        const { name, httpCode, isOperational, message } = new InvalidRefreshToken();
  
        throw new AppError(
          name,
          httpCode,
          isOperational,
          message,
        );
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
    } catch (error) {
      throw error;
    }
  }
}
