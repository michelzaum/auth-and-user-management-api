import { Request, Response } from 'express';

import { IController } from "../application/interfaces/IController";

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { body, statusCode } = await controller.handler({
      body: request.body,
    });

    response.status(statusCode).json(body);
  }
}
