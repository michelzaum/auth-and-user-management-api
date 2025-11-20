import express from 'express';

import { makeSignUpController } from './factories/makeSignUpController';
import { routeAdapter } from './adapters/routeAdapter';
import { makeListAllUsersController } from './factories/makeListAllUsersController';
import { makeUpdateUserController } from './factories/makeUpdateUserController';
import { makeDeleteUserController } from './factories/makeDeleteUserController';

const app = express();
const port = 3001;

app.use(express.json())

app.post('/users', routeAdapter(makeSignUpController()));
app.get('/users', routeAdapter(makeListAllUsersController()));
app.put('/users/:id', routeAdapter(makeUpdateUserController()));
app.delete('/users/:id', routeAdapter(makeDeleteUserController()));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
