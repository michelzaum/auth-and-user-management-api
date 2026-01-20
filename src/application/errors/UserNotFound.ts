import { HttpCodes } from "../../lib/shared/httpCodes";

export class UserNotFound extends Error {
  constructor(private readonly userId: string) {
    super();
  }

  public readonly name = 'User not found';
  public readonly httpCode = HttpCodes.BadRequest;
  public readonly isOperational = true;

  public get message(): string {
    return `User with id '${this.userId}' not found`;
  }
}
