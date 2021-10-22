import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import tagsRouter from './tags.routes';
import complimentsRouter from './compliments.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/tags', tagsRouter);
router.use('/compliments', complimentsRouter);

export default router;
