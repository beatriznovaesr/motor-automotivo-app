import { Request, Response } from 'express';
import { MotorService } from '../services/motorService';

const motorVM = new MotorService();

export class MotorController {
    async procurarMotor(req: Request, res: Response) {
        try {
            const { palavraPesquisada } = req.body;
            const resultado = await motorVM.procurarMotor(palavraPesquisada);
            res.status(200).json(resultado);

        } catch (error: any) {
            console.error('Erro no controller:', error);
            res.status(400).json({ erro: error.message });
        }
    }
}