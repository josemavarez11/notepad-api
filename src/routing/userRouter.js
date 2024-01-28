import { Router } from "express";
import authenticate from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get('/profile', authenticate, (req, res) => res.status(201).json({
    message: `Welcome ${req.user.username}!`
}));

export default userRouter;