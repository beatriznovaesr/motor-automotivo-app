import express from 'express';
import { UserController } from '../controllers/UserController';
import { UserViewModel } from '../viewmodels/UserViewModel';

const router = express.Router();
const controller = new UserController();

router.post('/cadastro', controller.cadastrar);
router.post('/login', UserViewModel.loginUser);

export default router;

