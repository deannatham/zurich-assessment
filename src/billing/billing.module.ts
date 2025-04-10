import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './entity/billing';

@Module({
  controllers: [BillingController],
  providers: [BillingService],
  imports: [TypeOrmModule.forFeature([Billing])],
})
export class BillingModule {}
