import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class QueryBillingDto {
  @ApiPropertyOptional({
    description: 'Product ID for filtering billing records',
    example: 4000,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  productCode: number;

  @ApiPropertyOptional({
    description: 'Location for filtering billing records',
    example: 'West Malaysia',
  })
  @IsString()
  @IsOptional()
  location: string;
}
