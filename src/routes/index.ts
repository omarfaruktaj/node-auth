import { Router } from 'express';

const router = Router();

router.get('/routes', (req, res) => {
  res.status(200).json({ message: 'hello' });
});

export default router;
