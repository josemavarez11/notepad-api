/**
 * @description Router for handling authentication routes.
 * @module authRouter
 */

// External module import.
import { Router } from "express";

// Internal module import.
import AuthController from "../controllers/authController.js";

/**
 * Instance of the Express Router.
 * @type {object}
 * @const
 */
const authRouter = Router();

/**
 * Route to register a new user.
 * It needs: username, email and password.
 * @name post/register
 * @function
 * @memberof module:authRouter
 */
authRouter.post('/register', AuthController.register);

/**
 * Route to log in a user.
 * It needs: username and password.
 * @name post/login
 * @function
 * @memberof module:authRouter
 */
authRouter.post('/login', AuthController.login);

/**
 * Route to log out a user.
 * @name get/logout
 * @function
 * @memberof module:authRouter
 */
authRouter.get('/logout', AuthController.logout);

export default authRouter;

