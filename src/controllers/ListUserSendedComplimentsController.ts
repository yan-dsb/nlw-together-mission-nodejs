import { Request, Response } from 'express';
import ListUserSendedComplimentsService from '../services/ListUserSendedComplimentsService';

export default class ListUserSendedComplimentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const listUserSendedCompliments = new ListUserSendedComplimentsService();

    const compliments = await listUserSendedCompliments.execute(user_id);

    return response.json(compliments);
  }
}
