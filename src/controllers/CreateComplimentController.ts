import { Request, Response } from 'express';
import CreateComplimentService from '../services/CreateComplimentService';

export default class CreateComplimentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tag_id, user_sender, user_receiver, message } = request.body;
    // const { user_id } = request;

    const createCompliment = new CreateComplimentService();

    const compliment = await createCompliment.execute({
      tag_id,
      // user_sender: user_id,
      user_sender,
      user_receiver,
      message
    });

    return response.json(compliment);
  }
}
