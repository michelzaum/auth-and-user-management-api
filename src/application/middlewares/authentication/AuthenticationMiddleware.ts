import { JwtPayload, verify } from "jsonwebtoken";
import { IData, IMiddleware, IResponse } from "../../interfaces/IMiddleware";
import { IRequest } from "../../interfaces/IRequest";
import { env } from "../../config/env";
import { AppError } from "../../errors/AppError";
import { Unauthorized } from "../../errors/Unauthorized";
import { InvalidAccessToken } from "../../errors/InvalidAccessToken";

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const authorization = headers.authorization;

    if (!authorization) {
      const { name, httpCode, isOperational, message } = new Unauthorized();

      throw new AppError(name, httpCode, isOperational, message);
    }

    try {
      const [bearer, token] = authorization.split(" ");

      if (bearer != "Bearer") {
        const { name, httpCode, isOperational, message } =
          new InvalidAccessToken();

        throw new AppError(name, httpCode, isOperational, message);
      }

      const payload = verify(token, env.jwtSecret) as JwtPayload;

      return {
        data: {
          user: {
            id: payload.id,
            role: payload.role,
          },
        },
      };
    } catch (error) {
      const { name, httpCode, isOperational, message } =
        new InvalidAccessToken();

      throw new AppError(name, httpCode, isOperational, message);
    }
  }
}
