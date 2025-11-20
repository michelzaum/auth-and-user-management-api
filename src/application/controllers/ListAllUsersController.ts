import { IController, IResponse } from "../interfaces/IController";
import { ListAllUsersUseCase } from "../useCases/ListAllUsers";

export class ListAllUsersController implements IController {
  constructor(private readonly listAllUsersUseCase: ListAllUsersUseCase) {}

  async handler(): Promise<IResponse> {
    const result = await this.listAllUsersUseCase.execute();

    return {
      statusCode: 200,
      body: result,
    };
  }
}
