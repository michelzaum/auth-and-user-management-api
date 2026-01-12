import { JwtPayload, verify } from "jsonwebtoken";
import { IData, IMiddleware, IResponse } from "../interfaces/IMiddleware";
import { IRequest } from "../interfaces/IRequest";
import { env } from "../config/env";
import { AppError } from "../errors/AppError";
import { Unauthorized } from "../errors/Unauthorized";

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const authorization = headers.authorization;

    if (!authorization) {
      const { name, httpCode, isOperational, message } = new Unauthorized();

      throw new AppError(
        name,
        httpCode,
        isOperational,
        message,
      );
    }

    try {
      const [bearer, token] = authorization.split(' ');

      if (bearer != 'Bearer') {
        throw new Error();
      }

      const payload = verify(token, env.jwtSecret) as JwtPayload;

      return {
        data: {
          user: {
            id: payload.id,
            role: payload.role,
          }
        }
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: {
          message: 'Invalid access token',
        }
      }
    }
  }
}
