import { JwtPayload, verify } from "jsonwebtoken";
import {
  IController,
  IResponse,
} from "../../../application/interfaces/IController";
import { IRequest } from "../../../application/interfaces/IRequest";
import { UpdateLoggedUserUseCase } from "./UpdateLoggedUserUseCase";
import { env } from "../../../application/config/env";
import { Unauthorized } from "../../../application/errors/Unauthorized";
import { AppError } from "../../../application/errors/AppError";
import { InvalidAccessToken } from "../../../application/errors/InvalidAccessToken";

export class UpdateLoggedUserController implements IController {
  constructor(
    private readonly updateLoggedUserUseCase: UpdateLoggedUserUseCase,
  ) {}

  async handler(request: IRequest): Promise<IResponse> {
    try {
      const authorization = request.headers.authorization;

      if (!authorization) {
        const { name, httpCode, isOperational, message } = new Unauthorized();

        throw new AppError(name, httpCode, isOperational, message);
      }

      const { name, email, password } = request.body;

      const [, token] = authorization.split(" ");

      const { sub: userId } = verify(token, env.jwtSecret) as JwtPayload;

      if (!userId) {
        const { name, httpCode, isOperational, message } =
          new InvalidAccessToken();

        throw new AppError(name, httpCode, isOperational, message);
      }

      const updatedUser = await this.updateLoggedUserUseCase.execute(userId, {
        name,
        email,
        password,
      });

      return {
        statusCode: 200,
        body: {
          user: updatedUser,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
