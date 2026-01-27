import { SignInController } from "./SignInController";
import { SignInUseCase } from "./SignInUseCase";
import { RefreshTokenRepository } from "../refresh-token/RefreshTokenRepository";

export function makeSignInController() {
  const refreshTokenRepository = new RefreshTokenRepository();
  const signInUseCase = new SignInUseCase(refreshTokenRepository);

  return new SignInController(signInUseCase);
}
