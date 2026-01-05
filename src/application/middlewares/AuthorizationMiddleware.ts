import { IData, IMiddleware, IResponse } from "../interfaces/IMiddleware";
import { IRequest } from "../interfaces/IRequest";

export class AuthorizationMiddleware implements IMiddleware {
  constructor(allowedRoles: string[]) {
    console.log(allowedRoles)
  }

  async handle(request: IRequest): Promise<IResponse | IData> {
    return {
      statusCode: 200,
      body: {}
    }
  }
}
