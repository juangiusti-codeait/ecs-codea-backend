import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ProductsModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
