import { JwtPayload, verify } from "jsonwebtoken";
import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { UpdateLoggedUserUseCase } from "../useCases/UpdateLoggedUserUseCase";
import { env } from "../config/env";
import { Unauthorized } from "../errors/Unauthorized";
import { AppError } from "../errors/AppError";

export class UpdateLoggedUserController implements IController {
  constructor(private readonly updateLoggedUserUseCase: UpdateLoggedUserUseCase) {}

  async handler(request: IRequest): Promise<IResponse> {
    try {
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
    } catch (error) {
      throw error;
    }
  }
}
