import express from 'express';
import { CommentsController } from '../controllers/commentsController';

const router = express.Router();
const commentsController = new CommentsController();

router.get('/:motorId', commentsController.buscarComentarios);

/*router.post('/comments', async (req, res) => {
  await commentsController.addComment(req, res);
});*/

router.post('/add', commentsController.addComment);

router.post('/comments/:id/reply', async (req, res) => {
  await commentsController.replyToComment(req, res);
});

router.put('/comments/:id', async (req, res) => {
  await commentsController.editComment(req, res);
});

export default router;
