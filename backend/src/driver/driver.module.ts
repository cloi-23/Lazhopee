import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../auth0/constants';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Driver, DriverrSchema } from './entities/drivers.entity';
import { LocalStrategy } from './auth/strategy/local.strategy'
import { JwtStrategy } from '../manager/auth/strategy/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Driver.name,
      schema: DriverrSchema
    }
  ]),
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [DriverController],
  providers: [DriverService, LocalStrategy, JwtStrategy],
  exports: [DriverService]
})
export class DriverModule {}
