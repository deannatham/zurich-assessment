import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JwtPayloadDto {
  @ApiProperty({
    description: "User's role",
    example: 'admin',
  })
  @IsString()
  role: string;
}
