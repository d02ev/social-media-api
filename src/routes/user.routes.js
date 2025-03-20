import { Router } from "express";
import authHandler from "../middlewares/auth-handler.middleware";
import { me } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/me", authHandler, me);

export default userRoutes;