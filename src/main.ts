import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { seed } from 'prisma/seed';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (process.env.RUN_SEEDS === 'true') {
    logger.log('Ejecutando seeds...');
    await seed();
  }

  await app.listen(process.env.PORT ?? 3000);

  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
