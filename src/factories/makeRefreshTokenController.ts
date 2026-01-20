import { RefreshTokenController } from "../application/controllers/RefreshTokenController";
import { RefreshTokenRepository } from "../application/repositories/RefreshTokenRepository";

export function makeRefreshTokenController() {
  const refreshTokenRespository = new RefreshTokenRepository();

  return new RefreshTokenController(refreshTokenRespository);
}
