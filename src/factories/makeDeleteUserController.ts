import { DeleteUserController } from "../application/controllers/DeleteUserController";
import { DeleteUserUseCase } from "../application/useCases/DeleteUserUseCase";

export function makeDeleteUserController() {
  const deleteUserUseCase = new DeleteUserUseCase();

  return new DeleteUserController(deleteUserUseCase);
}
