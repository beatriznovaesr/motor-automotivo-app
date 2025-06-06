import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  senha: { type: String, required: true },
  notificacoesAtivadas: { type: Boolean, default: true}
});

export default mongoose.model('User', UserSchema);
