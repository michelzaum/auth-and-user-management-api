import { HttpCodes } from "../../lib/shared/httpCodes";

export class UserAlreadyExists extends Error {
  public readonly name = 'User already exists';
  public readonly message = 'This e-mail is already in use';
  public readonly httpCode = HttpCodes.Conflict;
  public readonly isOperational = true;
}
