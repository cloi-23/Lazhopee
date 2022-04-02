import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../auth0/constants';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { CustomerLocalStrategy } from './auth/strategy/local.strategy';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { MailService } from './mailer/service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Customer.name,
      schema: CustomerSchema
    }
  ]),
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  })],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerLocalStrategy, JwtStrategy, {
    provide: 'JwtSecret1Service',
    useExisting: JwtService,
  },
  MailService],
  exports: [CustomerService, 'JwtSecret1Service'],
})
export class CustomerModule {}
