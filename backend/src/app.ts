import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import pingRoutes from './routes/pingRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/ping', pingRoutes);

export default app;
