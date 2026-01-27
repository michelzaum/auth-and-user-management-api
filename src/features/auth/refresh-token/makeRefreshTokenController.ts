import { RefreshTokenController } from "./RefreshTokenController";
import { RefreshTokenRepository } from "./RefreshTokenRepository";

export function makeRefreshTokenController() {
  const refreshTokenRespository = new RefreshTokenRepository();

  return new RefreshTokenController(refreshTokenRespository);
}
