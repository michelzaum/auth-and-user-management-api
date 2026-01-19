import { JwtPayload, verify } from "jsonwebtoken";

import { IData, IMiddleware, IResponse } from "../interfaces/IMiddleware";
import { IRequest } from "../interfaces/IRequest";
import { env } from "../config/env";
import { AppError } from "../errors/AppError";
import { Forbidden } from "../errors/Forbidden";
import { InvalidAccessToken } from "../errors/InvalidAccessToken";
import { Unauthorized } from "../errors/Unauthorized";

export class AuthorizationMiddleware implements IMiddleware {
  constructor(private readonly allowedRoles: string[]) {}

  async handle(request: IRequest): Promise<IResponse | IData> {
    const accessToken = request.headers.authorization;

    if (!accessToken) {
      const { name, httpCode, isOperational, message } = new Unauthorized();

      throw new AppError(name, httpCode, isOperational, message);
    }

    const [bearer, token] = accessToken.split(' ');

    if (bearer !== 'Bearer') {
      const { name, httpCode, isOperational, message } = new InvalidAccessToken();

      throw new AppError(name, httpCode, isOperational, message);
    }

    const payload = verify(token, env.jwtSecret) as JwtPayload;

    if (!this.allowedRoles.includes(payload.role)) {
      const { name, httpCode, isOperational, message } = new Forbidden();

      throw new AppError(name, httpCode, isOperational, message);
    }

    return {
      data: {
        user: {
          id: payload.sub,
          role: payload.role,
        }
      }
    }
  }
}
