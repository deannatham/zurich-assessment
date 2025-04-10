import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

export class DeleteBillingDto {
  @ApiProperty({
    description: "Customer's id",
    example: 'c8d0ff28-5c27-4852-8546-77f38235322c',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Product ID',
    example: '4000',
  })
  @IsNumber()
  @Type(() => Number)
  productCode: number;
}
