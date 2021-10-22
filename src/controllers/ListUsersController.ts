import { Request, Response } from 'express';
import ListUsersService from '../services/ListUsersService';

export default class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.handle();

    return response.json(users);
  }
}
