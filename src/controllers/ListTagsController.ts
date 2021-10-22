import { Request, Response } from 'express';
import ListTagsService from '../services/ListTagsService';

export default class ListTagsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.execute();

    return response.json(tags);
  }
}
