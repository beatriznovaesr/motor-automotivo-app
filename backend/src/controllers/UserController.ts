import { Request, Response } from 'express';
import { UserViewModel } from '../viewmodels/UserViewModel';
import User from '../models/User';

const userVM = new UserViewModel();

export class UserController {
  async cadastrar(req: Request, res: Response) {
    try {
      const resultado = await userVM.criarUsuario(req.body);
      res.status(201).json(resultado);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }
}

// Login de usuário
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verificação se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Validação de senha
    if (user.senha !== password) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Sucesso
    res.status(200).json({ message: 'Login realizado com sucesso', user });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};