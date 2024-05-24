import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthcheckModule } from '@app/modules/healthcheck/healthcheck.module';
import { SessionMiddleware } from '@app/modules/session/middlewares/session.middleware';
import { CustomerModule } from '@app/modules/customer/customer.module';
import { CustomerController } from '@app/modules/customer/controllers/customer.controller';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import appConfig from '@app/configs/app.config';
import dbConfig from '@app/configs/db.config';

@Module({
  imports: [
    HealthcheckModule,
    CustomerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    SequelizeModule.forRoot(dbConfig),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes(CustomerController);
  }
}
