import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CustomerService } from '../../customer.service'

@Injectable()
export class CustomerLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: CustomerService) {
    super();
  }
  async validate(username, pass): Promise<any> {
    
    const user = await this.authService.validateCustomer(username, pass);    
    if (!user) {
      return { errorMsg:'Wrong username or password' }
    }
    
    return { data: user };
  }
}