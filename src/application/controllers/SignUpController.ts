import z from "zod";

import { IController, IRequest, IResponse } from "../interfaces/IController";
import { SignUpUseCase } from "../useCases/SignUpUseCase";

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
      console.log(error);
      return {
        statusCode: 400,
        body: null,
      }
    }
  }
}
