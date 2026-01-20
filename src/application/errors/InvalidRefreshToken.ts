import { HttpCodes } from "../../lib/shared/httpCodes";

export class InvalidRefreshToken extends Error {
  public readonly name = 'Invalid refresh token';
  public readonly message = 'Invalid or expired refresh token';
  public readonly httpCode = HttpCodes.Unauthorized;
  public readonly isOperational = true;
}
