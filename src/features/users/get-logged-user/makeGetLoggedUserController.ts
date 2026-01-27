import { GetLoggedUserController } from "./GetLoggedUserController";
import { GetLoggedUserUseCase } from "./GetLoggedUserUseCase";

export function makeGetLoggedUserController() {
  const getLoggedUserUseCase = new GetLoggedUserUseCase();

  return new GetLoggedUserController(getLoggedUserUseCase);
}
