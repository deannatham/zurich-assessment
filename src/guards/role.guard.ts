import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomRequest } from 'src/types/custom-request.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );

    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest<CustomRequest>();
    const userRole = request['userRole'];

    if (!userRole) {
      throw new ForbiddenException('Role is missing from request');
    }

    if (userRole !== requiredRole) {
      throw new ForbiddenException(
        'You do not have permission to execute this action',
      );
    }

    return true;
  }
}
