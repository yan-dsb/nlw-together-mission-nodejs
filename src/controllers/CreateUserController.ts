import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, isAdmin } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, isAdmin });

    return response.json(user);
  }
}
