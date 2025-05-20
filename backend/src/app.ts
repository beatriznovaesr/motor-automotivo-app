import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
<<<<<<< HEAD
=======
import pingRoutes from './routes/pingRoutes';
>>>>>>> alterar-cadastro

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
<<<<<<< HEAD
=======
app.use('/ping', pingRoutes);
>>>>>>> alterar-cadastro

export default app;
