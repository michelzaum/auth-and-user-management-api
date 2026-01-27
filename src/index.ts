require("./instrument");

import * as Sentry from "@sentry/node";

import express, { NextFunction, Request, Response } from "express";

import { routeAdapter } from "./adapters/routeAdapter";
import { middlewareAdapter } from "./adapters/middlewareAdapter";

import { makeAuthorizationMiddleware } from "./application/middlewares/authorization/makeAuthorizationMiddleware";
import { makeAuthenticationMiddleware } from "./application/middlewares/authentication/makeAuthenticationMiddleware";

import { makeSignUpController } from "./features/auth/sign-up/makeSignUpController";
import { makeListAllUsersController } from "./features/users/list-all-users/makeListAllUsersController";
import { makeUpdateUserController } from "./features/users/update-user/makeUpdateUserController";
import { makeDeleteUserController } from "./features/users/delete-user/makeDeleteUserController";
import { makeSignInController } from "./features/auth/sign-in/makeSignInController";
import { makeGetLoggedUserController } from "./features/users/get-logged-user/makeGetLoggedUserController";
import { makeRefreshTokenController } from "./features/auth/refresh-token/makeRefreshTokenController";
import { makeUpdateLoggedUserController } from "./features/users/update-logged-user/makeUpdateLoggedUserController";
import { makeDeleteLoggedUserController } from "./features/users/delete-logged-user/makeDeleteLoggedUserController";
import { AppError } from "./application/errors/AppError";

const app = express();
const port = 3001;

app.use(express.json());

app.post("/users", routeAdapter(makeSignUpController()));

app.post("/sign-in", routeAdapter(makeSignInController()));

app.post("/refresh-token", routeAdapter(makeRefreshTokenController()));

app.get(
  "/users/me",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetLoggedUserController()),
);

app.patch(
  "/users/me",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateLoggedUserController()),
);

app.delete(
  "/users/me",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteLoggedUserController()),
);

app.get(
  "/admin/users",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["ADMIN"])),
  routeAdapter(makeListAllUsersController()),
);

app.patch(
  "/admin/users/:id",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["ADMIN"])),
  routeAdapter(makeUpdateUserController()),
);

app.delete(
  "/admin/users/:id",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["ADMIN"])),
  routeAdapter(makeDeleteUserController()),
);

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    Sentry.logger.error(`${error.name}: ${error.description}`, [], {
      stackTrace: error.stack,
      status: error.statusCode,
      payload: req.body,
      headers: req.headers,
      requestedUrl: req.url,
    });

    res.status(error.statusCode).json({
      type: error.name,
      message: error.message,
    });
  }
});
