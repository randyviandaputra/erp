import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  // Create USERS
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password,
      role: Role.ADMIN,
    },
  });

  const salesUser = await prisma.user.upsert({
    where: { email: 'sales@example.com' },
    update: {},
    create: {
      name: 'Sales User',
      email: 'sales@example.com',
      password,
      role: Role.SALES,
    },
  });

  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'Customer User',
      email: 'customer@example.com',
      password,
      role: Role.CUSTOMER,
    },
  });

  // Create CUSTOMERS
  await prisma.customer.upsert({
    where: { userId: salesUser.id },
    update: {},
    create: {
      name: 'Sales Customer Company',
      userId: salesUser.id,
    },
  });

  await prisma.customer.upsert({
    where: { userId: customerUser.id },
    update: {},
    create: {
      name: 'Customer Corp',
      userId: customerUser.id,
    },
  });

  // Create PRODUCTS
  await prisma.product.upsert({
    where: { id: randomUUID() },
    update: {},
    create: {
      name: 'Product 1',
      price: 100,
    },
  });

  await prisma.product.upsert({
    where: { id: randomUUID() },
    update: {},
    create: {
      name: 'Product 2',
      price: 200,
    },
  });

  await prisma.product.upsert({
    where: { id: randomUUID() },
    update: {},
    create: {
      name: 'Product 3',
      price: 300,
    },
  });

  console.log('✅ Seed complete: 3 users, 2 customers, 3 products created.');
}

main()
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
