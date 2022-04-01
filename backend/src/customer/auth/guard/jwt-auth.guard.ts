import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // canActivate(context: ExecutionContext) {
  //   const res = context.switchToHttp().getResponse()
    
  //   return super.canActivate(context);
  // }

  // handleRequest(err, user, info) {
  //   // You can throw an exception based on either "info" or "err" arguments
  //   if (err || !user) {
  //     console.log('s');
      
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}