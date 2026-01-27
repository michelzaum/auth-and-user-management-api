import { UpdateLoggedUserController } from "./UpdateLoggedUserController";
import { UpdateLoggedUserUseCase } from "./UpdateLoggedUserUseCase";

export function makeUpdateLoggedUserController() {
  const updateLoggedUserUseCase = new UpdateLoggedUserUseCase();

  return new UpdateLoggedUserController(updateLoggedUserUseCase);
}
