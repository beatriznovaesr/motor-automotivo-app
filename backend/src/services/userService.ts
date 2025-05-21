import bcrypt from 'bcryptjs';
import User from '../models/User';

//user service tem as regras de negócio
export class UserService {
  async loginUser(data: {
    email: string;
    senha: string;
  }) {
    const { email, senha } = data;

    try {

      //Verificação se o usuário existe por email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
  
      // Validação de senha
      /*if (user.senha !== senha) {
        throw new Error('Senha incorreta');
      }*/

      const senhaCorreta = await bcrypt.compare(senha, user.senha);
      if (!senhaCorreta) {
        throw new Error('Senha incorreta');
      }
  
      // Sucesso
      return { mensagem: 'Login realizado com sucesso', user };
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw new Error('Erro interno no servidor');
    }
  }

  async criarUsuario(data: {
    nome: string;
    email: string;
    dataNascimento: string;
    senha: string;
    confirmarSenha: string;
  }) {
    const { nome, email, dataNascimento, senha, confirmarSenha } = data;

    // verificação se senha e confirmar senha são iguais
    await this.confirmarSenhaIgualSenha(senha, confirmarSenha);

    // verifica se o usuário existe por email
    if (await this.usuarioExistente(email)) {
      throw new Error('E-mail já está em uso');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({
      nome,
      email,
      dataNascimento,
      senha: senhaHash,
    });

    //salva user no banco
    await novoUsuario.save();
    return { mensagem: 'Usuário criado com sucesso' };
  }

  // verifica se o usuário existe por email
  async usuarioExistente( email:string){
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return true; 
    }
    return false;

  }
  
  // verificação se senha e confirmar senha são iguais
  async confirmarSenhaIgualSenha(senha:string, confirmarSenha:string){
    if (senha !== confirmarSenha) {
      throw new Error('As senhas não coincidem');
    }
  }

  async obterUsuarioPorEmail(email: string) {
    try {
      //Verificação se o usuário existe por email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      return {
        nome: user.nome,
        email: user.email,
        dataNascimento: user.dataNascimento,
      };
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      throw new Error('Erro interno no servidor');
    }
  }

  //Tela alterarCadastro - Encontra um usuário pelo id e realiza alterações
  async alterarUsuario(id: string, dados: any) {
    try {
      return await User.findByIdAndUpdate(id, dados, { new: true });

    } catch (error) {
      console.error('Erro ao alterar dados do usuário', error);
      throw new Error('Erro interno');
    }
  }

}