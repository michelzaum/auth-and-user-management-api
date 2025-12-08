import { SignInController } from "../application/controllers/SignInController";
import { RefreshTokenRepository } from "../application/repositories/RefreshTokenRepository";
import { SignInUseCase } from "../application/useCases/SignInUseCase";

export function makeSignInController() {
  const refreshTokenRepository = new RefreshTokenRepository();
  const signInUseCase = new SignInUseCase(refreshTokenRepository);

  return new SignInController(signInUseCase);
}
