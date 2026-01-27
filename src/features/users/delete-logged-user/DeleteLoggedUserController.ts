import { JwtPayload, verify } from "jsonwebtoken";
import {
  IController,
  IResponse,
} from "../../../application/interfaces/IController";
import { IRequest } from "../../../application/interfaces/IRequest";
import { env } from "../../../application/config/env";
import { DeleteLoggedUserUseCase } from "./DeleteLoggedUserUseCase";
import { AppError } from "../../../application/errors/AppError";
import { Unauthorized } from "../../../application/errors/Unauthorized";
import { InvalidAccessToken } from "../../../application/errors/InvalidAccessToken";

export class DeleteLoggedUserController implements IController {
  constructor(
    private readonly deleteLoggedUserUseCase: DeleteLoggedUserUseCase,
  ) {}

  async handler(request: IRequest): Promise<IResponse> {
    try {
      const authorization = request.headers.authorization;

      if (!authorization) {
        const { name, httpCode, isOperational, message } = new Unauthorized();

        throw new AppError(name, httpCode, isOperational, message);
      }

      const [, token] = authorization.split(" ");

      const { sub: userId } = verify(token, env.jwtSecret) as JwtPayload;

      if (!userId) {
        const { name, httpCode, isOperational, message } =
          new InvalidAccessToken();

        throw new AppError(name, httpCode, isOperational, message);
      }

      await this.deleteLoggedUserUseCase.execute(userId);

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
