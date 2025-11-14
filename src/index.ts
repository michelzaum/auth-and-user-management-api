import express from 'express';

import { makeSignUpController } from './factories/makeSignUpController';
import { routeAdapter } from './adapters/routeAdapter';

const app = express();
const port = 3001;

app.use(express.json())

app.post('/users', routeAdapter(makeSignUpController()));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
