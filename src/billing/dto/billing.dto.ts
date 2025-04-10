import { ApiProperty } from '@nestjs/swagger';

export class BillingDto {
  @ApiProperty({
    description: "Customer's id",
    example: 'c8d0ff28-5c27-4852-8546-77f38235322c',
  })
  id: string;

  @ApiProperty({
    description: "Customer's email",
    example: 'george.bluth@yahoo.com.my',
  })
  email: string;

  @ApiProperty({
    description: "Customer's first name",
    example: 'George',
  })
  firstName: string;

  @ApiProperty({
    description: "Customer's last name",
    example: 'Bluth',
  })
  lastName: string;

  @ApiProperty({
    description: 'Product ID',
    example: '4000',
  })
  productCode: number;

  @ApiProperty({
    description: "Customer's location",
    example: 'West Malaysia',
  })
  location: string;

  @ApiProperty({
    description: 'The premium paid',
    example: '521.03',
  })
  premiumPaid: number;
}
