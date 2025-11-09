import express from 'express';

const app = express();
const port = 3001;

app.get('/', (request, response) => {
  response.send({ message: 'Hello world' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
