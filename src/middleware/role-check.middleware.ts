import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { CustomRequest } from 'src/types/custom-request.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RoleCheckMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      if (!secret) {
        throw new UnauthorizedException('JWT_SECRET is not defined');
      }

      const payload = jwt.verify(token, secret) as jwt.JwtPayload;

      if (typeof payload.role !== 'string') {
        throw new UnauthorizedException(
          'Invalid token payload: role must be a string',
        );
      }

      req.userRole = payload.role;
      next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
