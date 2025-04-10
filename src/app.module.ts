import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BillingModule } from './billing/billing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './billing/entity/billing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleCheckMiddleware } from './middleware/role-check.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BillingModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Billing],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZATION'),
        logging: configService.get<boolean>('DB_LOGGING'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoleCheckMiddleware)
      .forRoutes({ path: 'billing', method: RequestMethod.ALL });
  }
}
