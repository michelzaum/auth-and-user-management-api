import { ListAllUsersController } from "./ListAllUsersController";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

export function makeListAllUsersController() {
  const listAllUsersUseCase = new ListAllUsersUseCase();

  return new ListAllUsersController(listAllUsersUseCase);
}
