import express from 'express';

import { makeSignUpController } from './factories/makeSignUpController';
import { routeAdapter } from './adapters/routeAdapter';
import { makeListAllUsersController } from './factories/makeListAllUsersController';

const app = express();
const port = 3001;

app.use(express.json())

app.post('/users', routeAdapter(makeSignUpController()));
app.get('/users', routeAdapter(makeListAllUsersController()));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
