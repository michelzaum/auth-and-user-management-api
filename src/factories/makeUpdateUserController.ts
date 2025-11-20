import { UpdateUserController } from "../application/controllers/UpdateUserController";
import { UpdateUserUseCase } from "../application/useCases/UpdateUserUseCase";

export function makeUpdateUserController() {
  const updateUserUseCase = new UpdateUserUseCase();

  return new UpdateUserController(updateUserUseCase);
}
