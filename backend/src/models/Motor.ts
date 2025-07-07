import mongoose from 'mongoose';
import CommentSchema from './Comments';

/*export interface Comentario {
  usuario: string;
  texto: string;
  resposta?: boolean;
}*/

export interface Motor {
  modelo: string;
  montadora: string;
  informacoes?: string;
  carro: string | string[];
  desenho: string | string[];
  //comentarios?: [Comment]; // <-- novo campo
}

/*const ComentarioSchema = new mongoose.Schema<Comentario>({
  usuario: { type: String, required: true },
  texto: { type: String, required: true },
  resposta: { type: Boolean, default: false }
});*/

const MotorSchema = new mongoose.Schema<Motor>({
  modelo: { type: String, required: true },
  montadora: { type: String, required: true },
  informacoes: { type: String },
  carro: { type: mongoose.Schema.Types.Mixed, required: true },
  desenho: { type: mongoose.Schema.Types.Mixed, required: true },
  //comentarios: [CommentSchema] // <-- novo campo
});


export default mongoose.model<Motor>('Motor', MotorSchema)