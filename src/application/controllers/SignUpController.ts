import { IController, IRequest, IResponse } from "../interfaces/IController";
import { SignUpUseCase } from "../useCases/SignUpUseCase";

export class SignUpController implements IController{
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handler({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, email, password } = body;

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
