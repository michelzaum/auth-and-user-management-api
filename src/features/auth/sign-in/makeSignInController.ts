import { SignInController } from "./SignInController";
import { RefreshTokenRepository } from "../../../application/repositories/RefreshTokenRepository";
import { SignInUseCase } from "./SignInUseCase";

export function makeSignInController() {
  const refreshTokenRepository = new RefreshTokenRepository();
  const signInUseCase = new SignInUseCase(refreshTokenRepository);

  return new SignInController(signInUseCase);
}
