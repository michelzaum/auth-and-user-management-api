import { HttpCodes } from "../../lib/shared/httpCodes";

export class AppError extends Error {
  constructor(
    public readonly name: string,
    public readonly statusCode: HttpCodes,
    public readonly isOperational: boolean,
    public readonly description: string,
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain

    Error.captureStackTrace(this);
  }
}
