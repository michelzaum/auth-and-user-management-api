import { ListAllUsersController } from "../application/controllers/ListAllUsersController";
import { ListAllUsersUseCase } from "../application/useCases/ListAllUsers";

export function makeListAllUsersController() {
  const listAllUsersUseCase = new ListAllUsersUseCase();

  return new ListAllUsersController(listAllUsersUseCase);
}
