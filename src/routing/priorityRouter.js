import { Router } from "express";
import getPriorities from "../controllers/prioritiesController.js";

const priorityRouter = Router();

priorityRouter.get('/getAllPriorities', getPriorities);

export default priorityRouter;