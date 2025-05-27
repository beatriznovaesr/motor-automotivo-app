import express from 'express';
import { UserController } from '../controllers/UserController';

const router = express.Router();
const controller = new UserController();

router.post('/cadastro', controller.cadastrar);
router.post('/login', controller.loginUser);
router.get('/usuarios/:email', controller.obterUsuarioPorEmail);
router.put('/usuarios/:id', controller.alterarUsuario);
router.put('/usuarios/alterar-senha/:email', controller.alterarSenha);

export default router;
