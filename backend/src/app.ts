import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { globalRateLimit } from "./middlewares/rateLimitMiddleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(globalRateLimit);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Doctor Booking API is running",
  });
});

app.use("/api", routes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
