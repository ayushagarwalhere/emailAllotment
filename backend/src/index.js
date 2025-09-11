import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/adminRoutes.js';

const app = express();
dotenv.config();

let PORT = process.env.PORT || 5001 ;

app.use(express.json())

app.use('/admin', routes);

app.listen(PORT, ()=>{
    console.log(`The server is running at http://localhost:${PORT}`);
})