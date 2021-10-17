import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';

import './database';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ type: 'error', message: err.message });
  }
  console.error(err);
  return response
    .status(500)
    .json({ type: 'error', message: 'Internal server error' });
});

app.listen(3333, () => console.log('Server started listening on port 3333'));
