import { JwtPayload, verify } from "jsonwebtoken";
import { IController, IRequest, IResponse } from "../interfaces/IController";
import { GetLoggedUserUseCase } from "../useCases/GetLoggedUserUseCase";
import { env } from "../config/env";

export class GetLoggedUserController implements IController {
  constructor(private readonly getLoggedUserUseCase: GetLoggedUserUseCase) {}

  async handler(request: IRequest): Promise<IResponse> {
    const accessToken = request.headers?.authorization;

    if (!accessToken) {
      return {
        statusCode: 401,
        body: {
          error: 'Unauthorized. Invalid access token.'
        },
      }
    }

    try {
      const token = accessToken.split(' ')[1];

      const { sub: userId } = verify(token, env.jwtSecret) as JwtPayload;

      // TODO: revisit this to try another option instead of sending empty string
      const user = await this.getLoggedUserUseCase.execute(userId || '');

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
