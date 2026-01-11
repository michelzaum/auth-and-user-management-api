import z, { ZodError } from "zod";

import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { SignUpUseCase } from "../useCases/SignUpUseCase";
import { UserAlreadyExists } from "../errors/UserAlreadyExists";
import { AppError } from "../errors/AppError";
import { HttpCodes } from "../../lib/shared/httpCodes";

const schema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
  password: z.string().min(8),
});

export class SignUpController implements IController{
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handler({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name, password } = schema.parse(body);

      await this.signUpUseCase.execute({ name, email, password });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppError(
          'Validation Error',
          HttpCodes.BadRequest,
          true,
          `${error.issues[0].path}: ${error.issues[0].message}`,
        );
      }

      if (error instanceof UserAlreadyExists) {
        const { name, httpCode, isOperational, message } = error;

        throw new AppError(
          name,
          httpCode,
          isOperational,
          message,
        );
      }

      throw error;
    }
  }
}
