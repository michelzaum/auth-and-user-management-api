import { SignUpController } from "./SignUpController";
import { SignUpUseCase } from "./SignUpUseCase";

export function makeSignUpController(): SignUpController {
  const signUpUseCase = new SignUpUseCase();

  return new SignUpController(signUpUseCase);
}
