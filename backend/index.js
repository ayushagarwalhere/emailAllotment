import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from "cors";
import routes from "./src/routes/auth.js"
import adminRoutes from "./src/routes/adminRoutes.js";
import superAdminRoutes from "./src/routes/superAdminRoutes.js"
import studentRoutes from "./src/routes/stundentRoutes.js"
import {rateLimiterMiddleware} from "./src/middlewares/rate-limiter.js"
import healthCheckRoute from "./src/routes/health-check.js"

// import {swaggerUi,swaggerSpec} from './src/utils/swagger.js'

const app = express();
dotenv.config();

let PORT = process.env.PORT || 5000 ;

//swagger
// app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/health-check", rateLimiterMiddleware, healthCheckRoute);
app.use('/auth', routes);
app.use('/admin', adminRoutes);
app.use('/superadmin', superAdminRoutes);
app.use("/students", studentRoutes);


app.listen(PORT, ()=>{
    console.log(`The server is running at http://localhost:${PORT}`);
})