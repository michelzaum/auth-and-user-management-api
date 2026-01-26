require("./instrument");

import * as Sentry from "@sentry/node";

import express, { NextFunction, Request, Response } from "express";

import { routeAdapter } from "./adapters/routeAdapter";
import { middlewareAdapter } from "./adapters/middlewareAdapter";

import { makeSignUpController } from "./factories/makeSignUpController";
import { makeListAllUsersController } from "./factories/makeListAllUsersController";
import { makeUpdateUserController } from "./factories/makeUpdateUserController";
import { makeDeleteUserController } from "./factories/makeDeleteUserController";
import { makeSignInController } from "./factories/makeSignInController";
import { makeGetLoggedUserController } from "./factories/makeGetLoggedUserController";
import { makeAuthenticationMiddleware } from "./factories/makeAuthenticationMiddleware";
import { makeRefreshTokenController } from "./factories/makeRefreshTokenController";
import { makeAuthorizationMiddleware } from "./factories/makeAuthorizationMiddleware";
import { makeUpdateLoggedUserController } from "./factories/makeUpdateLoggedUserController";
import { makeDeleteLoggedUserController } from "./factories/makeDeleteLoggedUserController";
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
    // Sentry.captureException(error);
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
      // stack: error.stack, error.stack will be added in the log monitor
    });
  }
});
