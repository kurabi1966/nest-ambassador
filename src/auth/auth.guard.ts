import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const jwt = request.cookies['jwt'];
      if (jwt) {
        const { id } = await this.jwtService.verifyAsync(jwt);
        request.user = { id };
      }
      return this.jwtService.verify(jwt);
    } catch (error) {
      return false;
    }
  }
}
