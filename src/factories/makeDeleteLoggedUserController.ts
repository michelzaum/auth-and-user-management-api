import { DeleteLoggedUserController } from "../application/controllers/DeleteLoggedUserController";
import { DeleteLoggedUserUseCase } from "../application/useCases/DeleteLoggedUserUseCase";

export function makeDeleteLoggedUserController() {
  const deleteLoggedUserUseCase = new DeleteLoggedUserUseCase();

  return new DeleteLoggedUserController(deleteLoggedUserUseCase);
}
