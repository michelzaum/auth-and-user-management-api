import { SignInController } from "../application/controllers/SignInController";
import { SignInUseCase } from "../application/useCases/SignInUseCase";

export function makeSignInController() {
  const signInUseCase = new SignInUseCase();

  return new SignInController(signInUseCase);
}
