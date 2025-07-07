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

    /*async buscarComentarios(req: Request, res: Response) {
        try {
        console.log("CONTROLLER: buscarComentarios", req.params.motorId)
        const motor = await motorVM.buscarComentarios(req.params.motorId);
        res.status(200).json(motor.comentarios || []);
        } catch (error: any) {
        res.status(500).json({ erro: error.message });
        }
  }*/

  /*async adicionarComentario(req: Request, res: Response) {
        try {
        const { usuario_id, usuario, texto, resposta } = req.body;
        const comentario = { usuario_id, usuario, texto, resposta };
        const comentarios = await motorVM.adicionarComentario(req.params.motorId, comentario);
        res.status(201).json(comentarios);
        } catch (error: any) {
        res.status(500).json({ erro: error.message });
        }
  }*/
}