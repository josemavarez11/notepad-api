import { Router } from "express";
import AuthController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.get('/logout', AuthController.logout);

export default authRouter;

