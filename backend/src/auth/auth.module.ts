import { Module } from '@nestjs/common';
import { ManagerModule } from 'src/manager/manager.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Manager, ManagerSchema } from 'src/manager/entities/manager.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerService } from 'src/manager/manager.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Manager.name,
        schema: ManagerSchema
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [ManagerService ,AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
