import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponse {
  @ApiProperty({
    description: 'Error name',
  })
  error: string;
}
