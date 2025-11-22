import { GetLoggedUserController } from "../application/controllers/GetLoggedUserController";
import { GetLoggedUserUseCase } from "../application/useCases/GetLoggedUserUseCase";

export function makeGetLoggedUserController() {
  const getLoggedUserUseCase = new GetLoggedUserUseCase();

  return new GetLoggedUserController(getLoggedUserUseCase);
}
