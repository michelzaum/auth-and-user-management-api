import z, { ZodError } from "zod";
import { InvalidCredentials } from "../../../application/errors/InvalidCredentials";
import {
  IController,
  IResponse,
} from "../../../application/interfaces/IController";
import { IRequest } from "../../../application/interfaces/IRequest";
import { SignInUseCase } from "./SignInUseCase";
import { AppError } from "../../../application/errors/AppError";
import { HttpCodes } from "../../../lib/shared/httpCodes";

const schema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handler({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      const { accessToken, refreshToken } = await this.signInUseCase.execute(
        email,
        password,
      );

      return {
        statusCode: 200,
        body: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      if (error instanceof InvalidCredentials) {
        const { name, httpCode, isOperational, message } = error;

        throw new AppError(name, httpCode, isOperational, message);
      }

      if (error instanceof ZodError) {
        const field = error.issues[0].path;
        const message = error.issues[0].message;

        throw new AppError(
          error.name,
          HttpCodes.BadRequest,
          true,
          `${field}: ${message}`,
        );
      }

      throw error;
    }
  }
}
