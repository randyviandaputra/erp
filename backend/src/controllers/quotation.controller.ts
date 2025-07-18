import { Request, Response } from 'express';
import { PrismaClient, QuotationStatus, User } from '@prisma/client';

const prisma = new PrismaClient();

export const createQuotation = async (req: Request, res: Response) => {
  const { customerId, items } = req.body;
  const user = req.user as User;    
  console.log(user)

  if (!customerId || !items || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  try {
    const quotation = await prisma.quotation.create({
      data: {
        customerId,
        createdById: user.id,
        items: {
          create: items.map((item: { productId: string; quantity: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
        statusHistory: {
          create: {
            status: QuotationStatus.PENDING,
            changedById: user.id,
          },
        },
      },
      include: {
        items: true,
        statusHistory: true,
      },
    });

    return res.status(201).json(quotation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create quotation' });
  }
};

export const getAllQuotations = async (req: Request, res: Response) => {
  try {
    const {
      status,
      startDate,
      endDate,
      page = '1',
      limit = '10',
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    const where: any = {};

    // Filter by status
    if (status && typeof status === 'string') {
      where.status = status.toUpperCase();
    }

    // Filter by createdAt range
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate as string);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate as string);
      }
    }

    const [total, quotations] = await Promise.all([
      prisma.quotation.count({ where }),
      prisma.quotation.findMany({
        where,
        include: {
          customer: true,
          createdBy: true,
          approvedBy: true,
          items: { include: { product: true } },
          statusHistory: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
    ]);

    res.json({
      data: quotations,
      meta: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch quotations' });
  }
};

export const getQuotationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const quotation = await prisma.quotation.findUnique({
      where: { id },
      include: {
        customer: true,
        items: { include: { product: true } },
        createdBy: true,
        approvedBy: true,
        statusHistory: true,
      },
    });

    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
    return res.json(quotation);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quotation' });
  }
};

export const approveQuotation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as User;

  try {
    const quotation = await prisma.quotation.findUnique({
      where: { id },
      include: { salesOrders: true },
    });

    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
    if (quotation.status !== QuotationStatus.PENDING) {
      return res.status(400).json({ message: 'Quotation already processed' });
    }

    const updatedQuotation = await prisma.quotation.update({
      where: { id },
      data: {
        status: QuotationStatus.APPROVED,
        approvedById: user.id,
        approvedAt: new Date(),
        statusHistory: {
          create: {
            status: QuotationStatus.APPROVED,
            changedById: user.id,
          },
        },
      },
    });

    // Automatically create SalesOrder after approval
    const salesOrder = await prisma.salesOrder.create({
      data: {
        quotationId: id,
        createdById: user.id,
      },
    });

    return res.status(200).json({
      message: 'Quotation approved and sales order created',
      quotation: updatedQuotation,
      salesOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to approve quotation and create sales order' });
  }
};