import express from 'express';

import { routeAdapter } from './adapters/routeAdapter';

import { makeSignUpController } from './factories/makeSignUpController';
import { makeListAllUsersController } from './factories/makeListAllUsersController';
import { makeUpdateUserController } from './factories/makeUpdateUserController';
import { makeDeleteUserController } from './factories/makeDeleteUserController';
import { makeSignInController } from './factories/makeSignInController';
import { makeGetLoggedUserController } from './factories/makeGetLoggedUserController';

const app = express();
const port = 3001;

app.use(express.json())

app.post('/users', routeAdapter(makeSignUpController()));
app.get('/users', routeAdapter(makeListAllUsersController()));
app.put('/users/:id', routeAdapter(makeUpdateUserController()));
app.delete('/users/:id', routeAdapter(makeDeleteUserController()));
app.post('/sign-in', routeAdapter(makeSignInController()));
app.get('/me', routeAdapter(makeGetLoggedUserController()));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
