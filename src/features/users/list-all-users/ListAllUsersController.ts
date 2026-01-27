import {
  IController,
  IResponse,
} from "../../../application/interfaces/IController";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

export class ListAllUsersController implements IController {
  constructor(private readonly listAllUsersUseCase: ListAllUsersUseCase) {}

  async handler(): Promise<IResponse> {
    try {
      const result = await this.listAllUsersUseCase.execute();

      return {
        statusCode: 200,
        body: result,
      };
    } catch (error) {
      throw error;
    }
  }
}
