import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
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
    },

  ]),
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),MailerModule.forRoot({
    transport: {
      host: "smtp.gmail.com",
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: 'mejaricruz123@gmail.com',
        pass: 'wmzjwevlutlbmjwe',
      },
    },
    defaults: {
      from: '"No Reply" <no-reply@localhost>',
    },
    preview: true,
    template: {
      dir: process.cwd() + '/template/',
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
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
