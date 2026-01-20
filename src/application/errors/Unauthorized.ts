import { HttpCodes } from "../../lib/shared/httpCodes";

export class Unauthorized extends Error {
  public readonly name = 'Unauthorized';
  public readonly message = 'User is unauthorized';
  public readonly httpCode = HttpCodes.Unauthorized;
  public readonly isOperational = true;
}
