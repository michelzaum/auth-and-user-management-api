import { JwtPayload, verify } from "jsonwebtoken";
import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { GetLoggedUserUseCase } from "../useCases/GetLoggedUserUseCase";
import { env } from "../config/env";
import { InvalidAccessToken } from "../errors/InvalidAccessToken";
import { AppError } from "../errors/AppError";

export class GetLoggedUserController implements IController {
  constructor(private readonly getLoggedUserUseCase: GetLoggedUserUseCase) {}

  async handler(request: IRequest): Promise<IResponse> {
    const accessToken = request.headers?.authorization;

    if (!accessToken) {
      const { name, httpCode, isOperational, message } = new InvalidAccessToken();

      throw new AppError(
        name,
        httpCode,
        isOperational,
        message,
      );
    }

    try {
      const token = accessToken.split(' ')[1];

      const { sub: userId } = verify(token, env.jwtSecret) as JwtPayload;

      if (!userId) {
        const { name, httpCode, isOperational, message } = new InvalidAccessToken();

        throw new AppError(
          name,
          httpCode,
          isOperational,
          message,
        );
      }

      const user = await this.getLoggedUserUseCase.execute(userId);

      return {
        statusCode: 200,
        body: user,
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: {
          error: 'User not found.',
        }
      }
    }
  }
}
