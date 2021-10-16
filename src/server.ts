import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (request: Request, response: Response) => response.json({ message: 'Hello world' }));

app.listen(3333, () => console.log('Server started listening on port 3333'));
