import cors from "cors";
import express from "express";
import healthCheckRoute from "./routes/health-check.js";
import { rateLimiterMiddleware } from "./middleware/rate-limiter.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use("/health-check", rateLimiterMiddleware, healthCheckRoute);

export default app;
