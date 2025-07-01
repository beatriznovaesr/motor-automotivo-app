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
      console.error('Erro no login:', error);

      if (error.statusCode === 404) {
        res.status(404).json({ erro: 'Usuário não cadastrado' });
      } else if (error.statusCode === 401) {
        res.status(401).json({ erro: 'E-mail ou senha incorretos' });
      } else {
        res.status(500).json({ erro: 'Erro interno no servidor' });
      }
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

  async alterarUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dadosAlterados = req.body;

      const usuarioAlterado = await userVM.alterarUsuario(id, dadosAlterados);

      if (!usuarioAlterado) {
        res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.status(200).json(usuarioAlterado);

    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async alterarSenha(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const { senhaAtual, senhaNova, senhaConfirmada } = req.body;

      await userVM.alterarSenha(email, senhaAtual, senhaNova, senhaConfirmada);

      res.status(200).json({ mensagem: "Senha alterada com sucesso!" });
      
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

}