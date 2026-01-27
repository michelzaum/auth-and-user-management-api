import { AuthenticationMiddleware } from "./AuthenticationMiddleware";

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware();
}
