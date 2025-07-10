import express from 'express';
import { FavoritesController } from '../controllers/favoritesController';

const router = express.Router();
const controller = new FavoritesController();

router.post('/add', controller.addFavorite);
router.get('/:userId', controller.findFavorites);

export default router;