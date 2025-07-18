import { Router } from 'express';
import {
  createQuotation,
  getAllQuotations,
  getQuotationById,
  approveQuotation,
} from '../controllers/quotation.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.use(authMiddleware);

router.post('/', authMiddleware , createQuotation);
router.get('/', authMiddleware, getAllQuotations);
router.get('/:id', authMiddleware, getQuotationById);
router.put('/:id/approve', authMiddleware, requireRole(Role.SALES), approveQuotation);


export default router;
