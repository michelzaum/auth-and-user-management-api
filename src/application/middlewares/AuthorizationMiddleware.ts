import { JwtPayload, verify } from "jsonwebtoken";

import { IData, IMiddleware, IResponse } from "../interfaces/IMiddleware";
import { IRequest } from "../interfaces/IRequest";
import { env } from "../config/env";
import { AppError } from "../errors/AppError";
import { Forbidden } from "../errors/Forbidden";

export class AuthorizationMiddleware implements IMiddleware {
  constructor(private readonly allowedRoles: string[]) {}

  async handle(request: IRequest): Promise<IResponse | IData> {
    const accessToken = request.headers.authorization;

    if (!accessToken) {
      return {
        statusCode: 401,
        body: {
          error: 'Unauthorized',
        }
      }
    }

    const [bearer, token] = accessToken.split(' ');

    if (bearer !== 'Bearer') {
      return {
        statusCode: 400,
        body: {
          error: 'Invalid access token',
        },
      }
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
