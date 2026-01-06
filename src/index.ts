import express from 'express';

import { routeAdapter } from './adapters/routeAdapter';
import { middlewareAdapter } from './adapters/middlewareAdapter';

import { makeSignUpController } from './factories/makeSignUpController';
import { makeListAllUsersController } from './factories/makeListAllUsersController';
import { makeUpdateUserController } from './factories/makeUpdateUserController';
import { makeDeleteUserController } from './factories/makeDeleteUserController';
import { makeSignInController } from './factories/makeSignInController';
import { makeGetLoggedUserController } from './factories/makeGetLoggedUserController';
import { makeAuthenticationMiddleware } from './factories/makeAuthenticationMiddleware';
import { makeRefreshTokenController } from './factories/makeRefreshTokenController';
import { makeAuthorizationMiddleware } from './factories/makeAuthorizationMiddleware';
import { makeUpdateLoggedUserController } from './factories/makeUpdateLoggedUserController';
import { makeDeleteLoggedUserController } from './factories/makeDeleteLoggedUserController';

const app = express();
const port = 3001;

app.use(express.json())

app.post('/users', routeAdapter(makeSignUpController()));

app.post('/sign-in', routeAdapter(makeSignInController()));

app.get(
  '/users/me',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetLoggedUserController()),
);

app.patch(
  '/users/me',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateLoggedUserController()),
);

app.delete(
  '/users/me',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteLoggedUserController()),
);

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

app.post('/refresh-token',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeRefreshTokenController()),
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
