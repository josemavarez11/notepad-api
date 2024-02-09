/**
 * @description Express router for handling user-related routes.
 * @module userRouter
 */

// External module import.
import { Router } from "express";

// Internal module import.
import authenticate from "../middlewares/authMiddleware.js";
import { deleteUser, updatePassword, updateEmail, updateUsername } from "../controllers/usersController.js";

/**
 * Instance of the Express Router.
 * @type {object}
 * @const
 */
const userRouter = Router();

/**
 * Route for retrieving user profile.
 * @name get/profile
 * @function
 * @memberof module:userRouter
 */
userRouter.get('/profile', authenticate, (req, res) => res.status(201).json({
    message: `Welcome ${req.user.username}!`
}));

/**
 * Route for updating user password.
 * It needs: id and newPassword.
 * @name put/updatePassword
 * @function
 * @memberof module:userRouter
 */
userRouter.put('/updatePassword', authenticate, updatePassword);

/**
 * Route for updating user username.
 * It needs: id and newUsername.
 * @name put/updateUsername
 * @function
 * @memberof module:userRouter
 */
userRouter.put('/updateUsername', authenticate, updateUsername);

/**
 * Route for updating user email.
 * It needs: id and newEmail.
 * @name put/updateEmail
 * @function
 * @memberof module:userRouter
 */
userRouter.put('/updateEmail', authenticate, updateEmail);

/**
 * Route for deleting user.
 * It needs: id.
 * @name delete/delete
 * @function
 * @memberof module:userRouter
 */
userRouter.delete('/delete', authenticate, deleteUser);

export default userRouter;