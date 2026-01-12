import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { UpdateUserUseCase } from "../useCases/UpdateUserUseCase";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handler(request: IRequest): Promise<IResponse> {
    try {
      const { name, email, password, role } = request.body;
      const { id } = request.params;
  
      const result = await this.updateUserUseCase.execute({ id, name, email, password, role });
  
      return {
        statusCode: 200,
        body: result,
      }
    } catch (error) {
      throw error;
    }
  }
}
