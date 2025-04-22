import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateBillingDto {
  @ApiProperty({
    description: "Customer's id",
    example: 'c8d0ff28-5c27-4852-8546-77f38235322c',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: "Customer's email",
    required: false,
    example: 'george.bluth@yahoo.com.my',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: "Customer's location",
    example: 'West Malaysia',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'The premium paid',
  })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  premiumPaid: number;
}
