import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userVM = new UserService();

export class UserController {
  async cadastrar(req: Request, res: Response) {
    try {
      const resultado = await userVM.criarUsuario(req.body);
      res.status(201).json(resultado);
    } catch (error: any) {
      //mensagem de falha para o cadastro
      res.status(400).json({ erro: error.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const resultado = await userVM.loginUser(req.body);
      res.status(201).json(resultado);
    } catch (error: any) {
      //mensagem de falha para o login
      res.status(400).json({ erro: error.message });
    }
  }

  async obterUsuarioPorEmail(req: Request, res: Response) {
    try {
      const resultado = await userVM.obterUsuarioPorEmail(req.params.email);
      res.status(200).json(resultado);
    } catch (error: any) {
      //mensagem de falha para enviar os dados do usuário
      res.status(400).json({ erro: error.message });
    }
  }

}