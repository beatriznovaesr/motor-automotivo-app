import MotorModel, { Motor, Comentario } from '../models/Motor';

export class MotorService {

    async procurarMotor(palavraPesquisada: string): Promise<Motor[]> {
        if (!palavraPesquisada || palavraPesquisada.trim() === '') {
            return [];
        }

        const regex = new RegExp(palavraPesquisada, 'i');

        try {
            const motors = await MotorModel.find({
                $or: [
                    { modelo: { $regex: regex } },
                    { montadora: { $regex: regex } },
                    { carro: { $regex: regex } },
                    { carro: { $elemMatch: { $regex: regex } } },
                    { comentario: {$regex: regex} }
                ]
            }).exec();
            return motors;

        } catch (error) {
            console.error('Erro ao buscar motores no banco de dados:', error);
            throw new Error('Não foi possível buscar motores');
        } 
    }

    async buscarComentarios(motorId: string): Promise<Motor> {
        const motor = await MotorModel.findById(motorId);
        if (!motor) throw new Error("Motor não encontrado");
        return motor;
    }

    async adicionarComentario(motorId: string, comentario: Comentario): Promise<Comentario[]> {
        const motor = await MotorModel.findById(motorId);
        if (!motor) throw new Error("Motor não encontrado");
        motor.comentarios = motor.comentarios || [];
        motor.comentarios.push(comentario);
        await motor.save();
        return motor.comentarios;
    }

}