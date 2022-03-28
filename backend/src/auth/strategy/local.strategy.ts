import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginManagerDto } from 'src/manager/dto/login-manager.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username, pass): Promise<any> {
    const user = await this.authService.validateUser(username, pass);
    if (!user) {
      return { errorMsg:'Wrong username or password' }
    }
    
    return 'success login';
  }
}