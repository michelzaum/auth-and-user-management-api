import { IController, IRequest, IResponse } from "../interfaces/IController";
import { DeleteUserUseCase } from "../useCases/DeleteUserUseCase";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handler(request: IRequest): Promise<IResponse> {
    const { id } = request.params;

    await this.deleteUserUseCase.execute(id);

    return {
      statusCode: 200,
      body: null,
    }
  }
}
