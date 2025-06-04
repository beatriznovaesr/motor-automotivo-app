import mongoose from 'mongoose';

export interface Motor {
    modelo: string,
    montadora: string,
    informacoes?: string,
    carro: string | string[],
    desenho: string | string[]
} 

const MotorSchema = new mongoose.Schema<Motor>({
    modelo: { type: String, required: true },
    montadora: {type: String, required: true },
    informacoes: {type: String },
    carro: { type: mongoose.Schema.Types.Mixed, required: true },
    desenho: { type: mongoose.Schema.Types.Mixed, required: true }
});

//Para facilitar as buscas case-insensitive e de substring
MotorSchema.index ({
    modelo: 'text',
    montadora: 'text',
    informacoes: 'text',
    carro: 'text'
});

export default mongoose.model<Motor>('Motor', MotorSchema)