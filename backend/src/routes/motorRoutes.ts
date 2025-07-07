import express from 'express';
import { MotorController } from '../controllers/motorController';

const router = express.Router();
const controller = new MotorController();

router.post('/procurar-motor', controller.procurarMotor);
//router.get('/motor/comentarios/:motorId', controller.buscarComentarios);
//router.post('/motor/:motorId/comentarios', controller.adicionarComentario);
export default router;