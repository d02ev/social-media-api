import { Router } from "express";
import { login, logout, refreshToken, register } from "../controllers/auth.controller";
import authHandler from "../middlewares/auth-handler.middleware";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/refresh", refreshToken);
authRoutes.post("/logout", authHandler, logout);

export default authRoutes;