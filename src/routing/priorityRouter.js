import { Router } from "express";
import getPriorities from "../controllers/prioritiesController.js";

const priorityRouter = Router();

priorityRouter.get('/priorities', getPriorities);

export default priorityRouter;