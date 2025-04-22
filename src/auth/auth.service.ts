import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateJwt(payload: JwtPayloadDto): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    const jwt = this.jwtService.sign({ role: payload.role }, { secret });
    return jwt;
  }
}
