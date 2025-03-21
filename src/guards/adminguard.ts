import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Invalid token format');
      }
      
      const token = authHeader.split(' ')[1];
      
  
      const payload = this.jwtService.verify(token);
      
    
      if (payload.role !== 'admin' && payload.role !== 'superadmin') {
        throw new UnauthorizedException('Admin access required');
      }
      request.user = payload;
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}