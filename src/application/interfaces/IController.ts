export interface IRequest {
  body: Record<string, any>;
  params?: any;
}

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IController {
  handler(request: IRequest): Promise<IResponse>;
}
