import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../auth0/constants';
import { Manager, ManagerSchema } from './entities/manager.entity';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { ManagerLocalStrategy } from './auth/strategy/local.strategy'

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Manager.name,
      schema: ManagerSchema
    }
  ]),
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })
],
  controllers: [ManagerController],
  providers: [ManagerService, ManagerLocalStrategy, {
    provide: 'JwtSecret2Service',
    useExisting: JwtService,
  }],
  exports: [ManagerService, 'JwtSecret2Service']
})
export class ManagerModule {}
