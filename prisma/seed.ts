import { PrismaClient } from '@prisma/client';
import { PRODUCTS } from './products.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Running Seed');

  const products = await prisma.product.findMany();

  if (products.length === 0) {
    await prisma.product.createMany({
      data: PRODUCTS,
      skipDuplicates: true,
    });

    console.log('🌱 [Product]: Seed finished');
  }

  console.log('🌱 Seed finished');
}

export async function seed() {
  try {
    await main();
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Ejecutar automáticamente cuando se llama directamente
if (require.main === module) {
  seed();
}
