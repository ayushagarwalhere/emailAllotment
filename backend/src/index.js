import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/adminRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import healthCheckRoute from "./routes/health-check.js";
import { rateLimiterMiddleware } from "./middleware/rate-limiter.js";

const app = express();
dotenv.config();

let PORT = process.env.PORT || 5000 ;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/health-check", rateLimiterMiddleware, healthCheckRoute);
app.use('/admin', routes);
app.use('/superadmin', superAdminRoutes);

app.listen(PORT, ()=>{
    console.log(`The server is running at http://localhost:${PORT}`);
})