import MotorModel, { Motor } from '../models/Motor';

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
                    { carro: { $elemMatch: { $regex: regex } } }
                ]
            }).exec();
            return motors;

        } catch (error) {
            console.error('Erro ao buscar motores no banco de dados:', error);
            throw new Error('Não foi possível buscar motores');
        } 
    }

}