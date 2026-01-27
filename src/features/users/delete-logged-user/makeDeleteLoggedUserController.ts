import { DeleteLoggedUserController } from "./DeleteLoggedUserController";
import { DeleteLoggedUserUseCase } from "./DeleteLoggedUserUseCase";

export function makeDeleteLoggedUserController() {
  const deleteLoggedUserUseCase = new DeleteLoggedUserUseCase();

  return new DeleteLoggedUserController(deleteLoggedUserUseCase);
}
