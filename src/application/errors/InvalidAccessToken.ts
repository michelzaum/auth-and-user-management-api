import { HttpCodes } from "../../lib/shared/httpCodes";

export class InvalidAccessToken extends Error {
  public readonly name = 'Unauthorized';
  public readonly message = 'Invalid access token';
  public readonly httpCode = HttpCodes.Unauthorized;
  public readonly isOperational = true;
}
