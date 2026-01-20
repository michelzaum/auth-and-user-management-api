import { UpdateLoggedUserController } from "../application/controllers/UpdateLoggedUserController";
import { UpdateLoggedUserUseCase } from "../application/useCases/UpdateLoggedUserUseCase";

export function makeUpdateLoggedUserController() {
  const updateLoggedUserUseCase = new UpdateLoggedUserUseCase();

  return new UpdateLoggedUserController(updateLoggedUserUseCase);
}
