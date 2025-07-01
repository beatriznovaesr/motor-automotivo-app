import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import motorRoutes from './routes/motorRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/motors', motorRoutes);

export default app;
