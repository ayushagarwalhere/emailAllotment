import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/adminRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

let PORT = process.env.PORT || 5001 ;

app.use(express.json());
app.use(cookieParser());

app.use('/admin', routes);
app.use('/superadmin', superAdminRoutes);

app.listen(PORT, ()=>{
    console.log(`The server is running at http://localhost:${PORT}`);
})