import z, { ZodError } from "zod";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { IController, IRequest, IResponse } from "../interfaces/IController";
import { SignInUseCase } from "../useCases/SignInUseCase";

const schema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handler({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);
  
      const accessToken = await this.signInUseCase.execute(email, password);

      return {
        statusCode: 200,
        body: {
          accessToken,
        }
      }
    } catch (error) {
      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: 'Invalid credentials.',
          },
        }
      }

      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: {
            error: error.issues,
          },
        }
      }

      throw error;
    }
  }
}