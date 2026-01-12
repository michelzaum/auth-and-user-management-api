import { JwtPayload, verify } from "jsonwebtoken";
import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { env } from "../config/env";
import { DeleteLoggedUserUseCase } from "../useCases/DeleteLoggedUserUseCase";
import { AppError } from "../errors/AppError";
import { Unauthorized } from "../errors/Unauthorized";

export class DeleteLoggedUserController implements IController {
  constructor(private readonly deleteLoggedUserUseCase: DeleteLoggedUserUseCase) {}

  async handler(request: IRequest): Promise<IResponse> {
    const authorization = request.headers.authorization;

    if (!authorization) {
      const { name, httpCode, isOperational, message } = new Unauthorized();

      throw new AppError(
        name,
        httpCode,
        isOperational,
        message,
      );
    }

    const [, token] = authorization.split(' ');

    const { sub: userId } = verify(token, env.jwtSecret) as JwtPayload;

    if (!userId) {
      return {
        statusCode: 400,
        body: {
          error: 'Invalid userId',
        }
      }
    }

    await this.deleteLoggedUserUseCase.execute(userId);

    return {
      statusCode: 204,
      body: null,
    }
  }
}
