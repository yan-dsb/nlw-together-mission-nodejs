import 'reflect-metadata';
import express, { Request, Response } from 'express';

import './database';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (request: Request, response: Response) =>
  response.json({ message: 'Hello world' })
);

app.listen(3333, () => console.log('Server started listening on port 3333'));
