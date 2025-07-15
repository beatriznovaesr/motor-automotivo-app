import express from 'express';
import { CommentsController } from '../controllers/commentsController';

const router = express.Router();
const commentsController = new CommentsController();

router.get('/:motorId', commentsController.buscarComentarios);
router.get("/notifications/:userId",commentsController.criarNotificacoes);
router.post('/add', commentsController.addComment);


router.post('/reply/:id', async (req, res) => {
  await commentsController.replyToComment(req, res);
});

router.put('/edit/:id', async (req, res) => {
  await commentsController.editComment(req, res);
});

router.delete('/delete/:id', async (req, res) => {
  await commentsController.deletarComentario(req, res);
});

export default router;
