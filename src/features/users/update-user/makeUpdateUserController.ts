import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export function makeUpdateUserController() {
  const updateUserUseCase = new UpdateUserUseCase();

  return new UpdateUserController(updateUserUseCase);
}
