import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBillingDto {
  @ApiProperty({
    description: "Customer's email",
    example: 'george.bluth@yahoo.com.my',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "Customer's first name",
    example: 'George',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "Customer's last name",
    example: 'Bluth',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Product ID',
    example: 4000,
  })
  @IsNumber()
  @IsPositive()
  productCode: number;

  @ApiProperty({
    description: "Customer's location",
    example: 'West Malaysia',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'The premium paid',
    example: 521.03,
  })
  @IsNumber()
  @IsPositive()
  premiumPaid: number;
}
