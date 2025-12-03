import { IRequest } from "./IRequest";

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IController {
  handler(request: IRequest): Promise<IResponse>;
}
