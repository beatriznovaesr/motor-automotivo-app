import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Erro: MONGODB_URI não está definida no .env');
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB conectado com sucesso');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
};
