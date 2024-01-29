import { Router } from "express";
import authenticate from "../middlewares/authMiddleware.js";
import { deleteUser, updatePassword, updateEmail, updateUsername } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get('/profile', authenticate, (req, res) => res.status(201).json({
    message: `Welcome ${req.user.username}!`
}));

userRouter.put('/updatePassword', updatePassword);
userRouter.put('/updateUsername', updateUsername);
userRouter.put('/updateEmail', updateEmail);
userRouter.delete('/delete', deleteUser);

export default userRouter;