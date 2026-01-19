import { HttpCodes } from "../../lib/shared/httpCodes";

export class Forbidden extends Error {
  public readonly name = 'Forbidden';
  public readonly message = 'User is not allowed to perform the requested action or access the requested resource.';
  public readonly httpCode = HttpCodes.Forbidden;
  public readonly isOperational = true;
}
