import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/adminRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

const app = express();
dotenv.config();


let PORT = process.env.PORT || 5001 ;

app.use(express.json());  
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/students", studentRoutes);


app.listen(PORT, ()=>{
    console.log(`The server is running at http://localhost:${PORT}`);
})