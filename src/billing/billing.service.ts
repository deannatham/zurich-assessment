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

  async getBilling(input: QueryBillingDto): Promise<{
    data: Billing[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> {
    const { page = 1, limit = 10 } = input;

    const [billing, total] = await this.billingRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { productCode: input.productCode, location: input.location },
    });

    if (billing.length == 0) {
      throw new NotFoundException('Premium paid not found');
    }

    return {
      data: billing,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createBilling(billing: CreateBillingDto): Promise<{ id: string }> {
    const entity = await this.billingRepository.save(billing);
    return { id: entity.id };
  }

  async updateBilling(
    input: UpdateBillingDto,
    productCode: number,
  ): Promise<{ id: string }> {
    const result = await this.billingRepository.update(
      { id: input.id, productCode },
      { location: input.location, premiumPaid: input.premiumPaid },
    );

    if (result.affected === 0) {
      throw new NotFoundException('No billing record found to update');
    }
    return { id: input.id };
  }

  async deleteBilling(input: DeleteBillingDto): Promise<{ id: string }> {
    const result = await this.billingRepository.delete({
      id: input.id,
      productCode: input.productCode,
    });

    if (result.affected === 0) {
      throw new NotFoundException('No billing record found to delete');
    }

    return { id: input.id };
  }
}
