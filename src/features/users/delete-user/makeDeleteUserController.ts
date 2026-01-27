import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export function makeDeleteUserController() {
  const deleteUserUseCase = new DeleteUserUseCase();

  return new DeleteUserController(deleteUserUseCase);
}
