import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import motorRoutes from './routes/motorRoutes';
import notificationRoutes from  './routes/notificationRoutes';
import commentsRoutes from  './routes/commentsRoutes';
import favesRoute from './routes/favesRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/motors', motorRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/favorites', favesRoute);

export default app;
