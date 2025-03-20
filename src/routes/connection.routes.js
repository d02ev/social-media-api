import { Router } from "express";
import { follow, unfollow } from "../controllers/connection.controller";
import authHandler from "../middlewares/auth-handler.middleware";

const connectionRoutes = Router();

connectionRoutes.post("/follow/:id", authHandler, follow);
connectionRoutes.delete("/unfollow/:id", authHandler, unfollow);

export default connectionRoutes;