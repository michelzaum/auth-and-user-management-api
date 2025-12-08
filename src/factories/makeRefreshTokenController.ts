import { RefreshTokenController } from "../application/controllers/RefreshTokenController";

export function makeRefreshTokenController() {
  return new RefreshTokenController();
}
