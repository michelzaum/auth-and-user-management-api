import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";

export class RefreshTokenController implements IController {
  async handler(request: IRequest): Promise<IResponse> {
    console.log(request)

    return {
      body: null,
      statusCode: 200,
    }
  }
}
