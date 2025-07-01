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

      // Validação: Usuário não cadastrado
      const user = await User.findOne({ email });
      if (!user) {
        const error: any = new Error('Usuário não cadastrado');
        error.statusCode = 404;
        throw error;
      }

      const senhaCorreta = await bcrypt.compare(senha, user.senha);

      // Validação: Senha incorreta
      if (!senhaCorreta) {
        const error: any = new Error('E-mail ou senha incorretos');
        error.statusCode = 401;
        throw error;
      }
  
      return { mensagem: 'Login realizado com sucesso', user };
    } catch (error: any) {
      console.error('Erro ao realizar login:', error);

      if (error.message === 'Usuário não cadastrado') {
        throw error;
      }

      if (error.message === 'E-mail ou senha incorretos') {
        throw error;
      }

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

    // Campos obrigatórios
    if (!nome || !email || !dataNascimento || !senha || !confirmarSenha) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    // Formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Informe um e-mail válido.');
    }

    // verifica se o usuário existe por email
    if (await this.usuarioExistente(email)) {
      throw new Error('E-mail já cadastrado.');
    }

    // Força mínima da senha
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!senhaRegex.test(senha)) {
      throw new Error('A senha deve ter pelo menos 8 caracteres e conter letras e números.');
    }
    
    // verificação se senha e confirmar senha são iguais
    await this.confirmarSenhaIgualSenha(senha, confirmarSenha);

    // Criptografa a senha
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
        id: user._id.toString(),
        nome: user.nome,
        email: user.email,
        dataNascimento: user.dataNascimento,
        notificacoesAtivadas: user.notificacoesAtivadas
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

  //Tela alterarSenha - Permite alterar a senha do usuário
  async alterarSenha(email: string, senhaAtual: string, senhaNova: string, senhaConfirmada: string) {
    try {
      const usuario = await User.findOne({ email })
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
        
      const senhaAtualValida = await bcrypt.compare(senhaAtual, usuario.senha);
      if (!senhaAtualValida) {
        throw new Error('Senha atual incorreta');
      }

      if (senhaNova !== senhaConfirmada) {
        throw new Error('Senha nova e confirmação de senha diferentes');
      }

      const senhaAtualIgualNova = await bcrypt.compare(senhaNova, usuario.senha);
      if (senhaAtualIgualNova) {
        throw new Error('Senha nova não pode ser igual à atual');
      }

      const novaSenhaHash = await bcrypt.hash(senhaNova, 10);
      usuario.senha = novaSenhaHash;
      await usuario.save();
      console.log("Senha alterada com sucesso")

    } catch (error: any) {
      console.error("Erro ao atualizar senha:", error.message)
      throw error;
    }
  }
}