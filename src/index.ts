import express from 'express';

import { routeAdapter } from './adapters/routeAdapter';

import { makeSignUpController } from './factories/makeSignUpController';
import { makeListAllUsersController } from './factories/makeListAllUsersController';
import { makeUpdateUserController } from './factories/makeUpdateUserController';
import { makeDeleteUserController } from './factories/makeDeleteUserController';
import { makeSignInController } from './factories/makeSignInController';
import { makeGetLoggedUserController } from './factories/makeGetLoggedUserController';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { makeAuthenticationMiddleware } from './factories/makeAuthenticationMiddleware';
import { makeRefreshTokenController } from './factories/makeRefreshTokenController';
import { makeAuthorizationMiddleware } from './factories/makeAuthorizationMiddleware';

const app = express();
const port = 3001;

app.use(express.json())

app.post('/users', routeAdapter(makeSignUpController()));

app.post('/sign-in', routeAdapter(makeSignInController()));

app.get(
  '/users',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['ADMIN'])),
  routeAdapter(makeListAllUsersController()),
);

app.put(
  '/users/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['ADMIN'])),
  routeAdapter(makeUpdateUserController())
);

app.delete(
  '/users/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['ADMIN'])),
  routeAdapter(makeDeleteUserController())
);

app.get(
  '/me',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetLoggedUserController()),
);

app.post('/refresh-token',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeRefreshTokenController()),
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
