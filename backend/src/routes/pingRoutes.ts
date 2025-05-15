import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.status(200).json({
    message: 'pong',
    serverTime: new Date().toISOString()
  });
});

export default router;
