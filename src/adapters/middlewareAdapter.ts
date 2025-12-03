import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "../application/interfaces/IMiddleware";

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middleware.handle({
      body: request.body,
      params: request.params,
      headers: request.headers,
    });

    if ('statusCode' in result) {
      response.status(result.statusCode).json(result.body);
      return;
    }

    next();
  }
}
