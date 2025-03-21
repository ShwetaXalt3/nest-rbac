import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard  implements CanActivate {
         constructor(private jwtService : JwtService){}

         async canActivate(context : ExecutionContext) : Promise<boolean>{
             const request = context.switchToHttp().getRequest();


             try{
            const authHeader = request.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new UnauthorizedException('Invalid token format');
              }
              
              const token = authHeader.split(' ')[1];
              const payload = this.jwtService.verify(token);
              
              request.user = payload;

                return true;
             }
             catch(error){
                throw new UnauthorizedException('Unauthorized access');
             }
         }
}

