import { Injectable, NotFoundException } from '@nestjs/common';
import { Billing } from './entity/billing';
import { CreateBillingDto } from './dto/create-billing.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { QueryBillingDto } from './dto/query-billing.dto';
import { DeleteBillingDto } from './dto/delete-billing.dto';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing) private billingRepository: Repository<Billing>,
  ) {}

  async getBilling(input: QueryBillingDto): Promise<Billing[]> {
    const billing = await this.billingRepository.find({
      where: { productCode: input.productCode, location: input.location },
    });

    if (billing.length == 0) {
      throw new NotFoundException('Premium paid not found');
    }

    return billing;
  }

  async createBilling(billing: CreateBillingDto): Promise<void> {
    await this.billingRepository.save(billing);
  }

  async updateBilling(
    input: UpdateBillingDto,
    productCode: number,
  ): Promise<void> {
    await this.billingRepository.update(
      { id: input.id, productCode },
      { location: input.location, premiumPaid: input.premiumPaid },
    );
  }

  async deleteBilling(input: DeleteBillingDto) {
    await this.billingRepository.delete({
      id: input.id,
      productCode: input.productCode,
    });
  }
}
