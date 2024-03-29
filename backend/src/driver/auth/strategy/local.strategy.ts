import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { DriverService } from '../../driver.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'driver') {
  constructor(private readonly driverService: DriverService) {
    super();
  }
  async validate (username): Promise<any> {
    
    const driver = await this.driverService.validateDriver(username);    
    if (!driver) {
      return { errorMsg:'Wrong username or password' }
    }
    
    return { data: driver };
  }
}