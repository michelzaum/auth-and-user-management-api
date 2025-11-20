import { SignUpController } from "../application/controllers/SignUpController";
import { SignUpUseCase } from "../application/useCases/SignUpUseCase";

export function makeSignUpController(): SignUpController {
  const signUpUseCase = new SignUpUseCase();

  return new SignUpController(signUpUseCase);
}
