import { HttpCodes } from "../../lib/shared/httpCodes";

export class InvalidCredentials extends Error {
  public readonly name = 'Invalid credentials';
  public readonly message = 'Invalid credentials provided';
  public readonly httpCode = HttpCodes.BadRequest;
  public readonly isOperational = true;
}
