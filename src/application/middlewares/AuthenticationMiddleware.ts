import { IMiddleware, IResponse } from "../interfaces/IMiddleware";
import { IRequest } from "../interfaces/IRequest";

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse> {
    console.log(headers);

    return {
      statusCode: 200,
      body: {},
    }
  }
}
