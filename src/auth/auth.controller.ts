import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Generates a jwt token for auth purposes.
   *
   * @param payload the role needed for the authorization level, either admin or viewer
   * @returns the jwt token with the supplied role
   */
  @Post('generate-token')
  @ApiOperation({ summary: 'Generates a jwt token' })
  generateToken(@Body() payload: JwtPayloadDto): string {
    return this.authService.generateJwt(payload);
  }
}
