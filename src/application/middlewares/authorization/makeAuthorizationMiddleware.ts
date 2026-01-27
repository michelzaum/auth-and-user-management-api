import { AuthorizationMiddleware } from "./AuthorizationMiddleware";

export function makeAuthorizationMiddleware(allowedRoles: string[]) {
  return new AuthorizationMiddleware(allowedRoles);
}
