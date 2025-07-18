import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createSalesOrder, getSalesOrders } from '../controllers/salesOrder.controller';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.use(authMiddleware);

router.post('/', authMiddleware, requireRole(Role.SALES), createSalesOrder);
router.get('/', authMiddleware, requireRole(Role.SALES), getSalesOrders);

export default router;
