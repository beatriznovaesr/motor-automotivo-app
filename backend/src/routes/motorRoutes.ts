import express from 'express';
import { MotorController } from '../controllers/motorController';

const router = express.Router();
const controller = new MotorController();

router.post('/procurar-motor', controller.procurarMotor);

export default router;