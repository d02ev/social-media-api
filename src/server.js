import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import errorHandler from "./middlewares/error-handler.middleware";
import logger from "./util/logger.util";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use(errorHandler)

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

const port = parseInt(process.env.PORT) || 5000;
app.listen(port, () => logger.info(`Server at http://localhost:${port}`));