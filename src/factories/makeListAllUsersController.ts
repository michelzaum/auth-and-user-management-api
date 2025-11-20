import { ListAllUsersController } from "../application/controllers/ListAllUsersController";
import { ListAllUsersUseCase } from "../application/useCases/ListAllUsersUseCase";

export function makeListAllUsersController() {
  const listAllUsersUseCase = new ListAllUsersUseCase();

  return new ListAllUsersController(listAllUsersUseCase);
}
