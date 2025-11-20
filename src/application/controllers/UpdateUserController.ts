import { IController, IRequest, IResponse } from "../interfaces/IController";
import { UpdateUserUseCase } from "../useCases/UpdateUserUseCase";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handler(request: IRequest): Promise<IResponse> {
    const { name, email, password, role } = request.body;
    const { id } = request.params;

    this.updateUserUseCase.execute({ id, name, email, password, role });

    return {
      statusCode: 200,
      body: null,
    }
  }
}
