import { Router } from 'express';
import { getProducts } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getProducts);

export default router;
