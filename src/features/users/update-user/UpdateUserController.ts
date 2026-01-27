import {
  IController,
  IResponse,
} from "../../../application/interfaces/IController";
import { IRequest } from "../../../application/interfaces/IRequest";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handler(request: IRequest): Promise<IResponse> {
    try {
      const { name, email, password, role } = request.body;
      const { id } = request.params;

      const result = await this.updateUserUseCase.execute({
        id,
        name,
        email,
        password,
        role,
      });

      return {
        statusCode: 200,
        body: result,
      };
    } catch (error) {
      throw error;
    }
  }
}
