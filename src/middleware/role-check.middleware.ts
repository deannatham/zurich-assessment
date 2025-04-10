import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { CustomRequest } from 'src/types/custom-request.interface';

@Injectable()
export class RoleCheckMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    console.log(`[${req.method}] ${req.url}`);
    const userRole = req.headers['x-user-role'];

    if (typeof userRole !== 'string') {
      throw new ForbiddenException('Missing or invalid role in headers');
    }

    req.userRole = userRole;
    next();
  }
}
