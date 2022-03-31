import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ManagerService } from '../../manager.service'

@Injectable()
export class ManagerLocalStrategy extends PassportStrategy(Strategy, 'manager') {
  constructor(private readonly managerService: ManagerService) {
    super();
  }
  async validate (username): Promise<any> {
    
    const manager = await this.managerService.validateManager(username);    
    if (!manager) {
      return { errorMsg:'Wrong username or password' }
    }
    
    return { data: manager };
  }
}