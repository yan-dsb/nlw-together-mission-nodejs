import { Router } from 'express';
import CreateTagController from '../controllers/CreateTagController';
import ListTagsController from '../controllers/ListTagsController';
import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const tagsRouter = Router();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

tagsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
tagsRouter.get('/', listTagsController.handle);

export default tagsRouter;
