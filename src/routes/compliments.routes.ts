import { Router } from 'express';
import CreateComplimentController from '../controllers/CreateComplimentController';
import ListUserReceivedComplimentsController from '../controllers/ListUserReceivedComplimentsController';
import ListUserSendedComplimentsController from '../controllers/ListUserSendedComplimentsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const complimentsRouter = Router();
const createComplimentController = new CreateComplimentController();
const listUserReceivedComplimentsController =
  new ListUserReceivedComplimentsController();
const listUserSendedComplimentsController =
  new ListUserSendedComplimentsController();

complimentsRouter.post(
  '/',
  ensureAuthenticated,
  createComplimentController.handle
);
complimentsRouter.get(
  '/received',
  ensureAuthenticated,
  listUserReceivedComplimentsController.handle
);
complimentsRouter.get(
  '/sended',
  ensureAuthenticated,
  listUserSendedComplimentsController.handle
);

export default complimentsRouter;
