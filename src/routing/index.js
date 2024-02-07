import { Router } from "express";

import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import priorityRouter from './priorityRouter.js';
import categoriesRouter from './categoriesRouter.js';
import notesRouter from './notesRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/priorities', priorityRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/notes', notesRouter);

export default router;