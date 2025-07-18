import { Request, Response } from 'express';
import { PrismaClient, QuotationStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const createSalesOrder = async (req: Request, res: Response) => {
  const { quotationId } = req.body;
  const user = req.user;

  if (!quotationId) {
    return res.status(400).json({ message: 'quotationId is required' });
  }

  if (!user?.id) {
    return res.status(401).json({ message: 'User authentication required' });
  }

  try {
    const quotation = await prisma.quotation.findUnique({
      where: { id: quotationId },
      include: { salesOrders: true },
    });

    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });

    if (quotation.status !== QuotationStatus.APPROVED) {
      return res.status(400).json({ message: 'Quotation is not approved' });
    }

    if (quotation.salesOrders.length > 0) {
      return res.status(400).json({ message: 'Sales order already exists for this quotation' });
    }

    const salesOrder = await prisma.salesOrder.create({
      data: {
        quotationId,
        createdById: user.id,
      },
    });

    return res.status(201).json({ message: 'Sales order created', salesOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create sales order' });
  }
};

export const getSalesOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.salesOrder.findMany({
      include: {
        quotation: {
          include: {
            customer: true,
            items: { include: { product: true } },
          },
        },
        createdBy: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch sales orders' });
  }
};
