import { Router } from "express";
import {
	login,
	logout,
	refreshToken,
	register,
} from "../controllers/auth.controller";
import authHandler from "../middlewares/auth-handler.middleware";
import registerUserRequestValidator from "../middlewares/validators/register-user-request.validator";
import loginUserRequestValidator from "../middlewares/validators/login-user-request.validator";

const authRoutes = Router();

authRoutes.post("/register", registerUserRequestValidator, register);
authRoutes.post("/login", loginUserRequestValidator,login);
authRoutes.post("/refresh", refreshToken);
authRoutes.post("/logout", authHandler, logout);

export default authRoutes;
