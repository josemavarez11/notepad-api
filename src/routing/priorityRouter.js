/**
 * @description Router for handling priority-related routes.
 * @module priorityRouter
 */

// External module import.
import { Router } from "express";

// Internal module import.
import getPriorities from "../controllers/prioritiesController.js";

/**
 * Instance of the Express Router.
 * @type {object}
 * @const
 */
const priorityRouter = Router();

/**
 * Route for getting all priorities.
 * @name GET /getAllPriorities
 * @function
 * @memberof module:priorityRouter
 */
priorityRouter.get('/getAllPriorities', getPriorities);

export default priorityRouter;