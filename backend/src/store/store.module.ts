import { StoreSchema,Store } from './entity/store.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreController } from './store.controller';
import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { JwtStrategy } from '../manager/auth/strategy/jwt.strategy';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Store.name,
    schema:StoreSchema
  }])],
  controllers:[StoreController],
  providers: [StoreService, JwtStrategy],
  exports: [StoreService]
})
export class StoreModule {}
