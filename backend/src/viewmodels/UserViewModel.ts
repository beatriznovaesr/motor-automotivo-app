import bcrypt from 'bcryptjs';
import User from '../models/User';
import * as userController from '../controllers/UserController';
import { Request, Response } from 'express';

export class UserViewModel {
  static loginUser(arg0: string, loginUser: any) {
      throw new Error('Method not implemented.');
  }
  async criarUsuario(data: {
    nome: string;
    email: string;
    dataNascimento: string;
    senha: string;
    confirmarSenha: string;
  }) {
    const { nome, email, dataNascimento, senha, confirmarSenha } = data;

    if (senha !== confirmarSenha) {
      throw new Error('As senhas não coincidem');
    }

    const usuarioExistente = await User.findOne({ nome, email });
    if (usuarioExistente) {
      throw new Error('Nome e e-mail já está em uso');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({
      nome,
      email,
      dataNascimento,
      senha: senhaHash,
    });

    await novoUsuario.save();
    return { mensagem: 'Usuário criado com sucesso' };
  }
}

export const loginUser = async (req: Request, res: Response) => {
  return userController.loginUser(req, res);
};