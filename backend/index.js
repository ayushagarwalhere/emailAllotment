import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth/route.js';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5678;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
