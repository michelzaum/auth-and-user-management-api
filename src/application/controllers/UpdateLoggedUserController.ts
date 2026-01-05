import { JwtPayload, verify } from "jsonwebtoken";
import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { UpdateLoggedUserUseCase } from "../useCases/UpdateLoggedUserUseCase";
import { env } from "../config/env";

export class UpdateLoggedUserController implements IController {
  constructor(private readonly updateLoggedUserUseCase: UpdateLoggedUserUseCase) {}

  async handler(request: IRequest): Promise<IResponse> {
    const authorization = request.headers.authorization;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Unauthorized',
        },
      }
    }

    const { name, email, password } = request.body;

    const [, token] = authorization.split(' ');

    const { sub: userId } = verify(token, env.jwtSecret) as JwtPayload;

    if (!userId) {
      return {
        statusCode: 400,
        body: {
          error: 'Invalid userId',
        },
      }
    }

    const updatedUser = await this.updateLoggedUserUseCase.execute(userId, { name, email, password })

    return {
      statusCode: 200,
      body: {
        user: updatedUser,
      }
    }
  }
}
