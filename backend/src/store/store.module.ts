import { StoreSchema,Store } from './entity/store.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreController } from './store.controller';
import { Module } from '@nestjs/common';
import { StoreService } from './store.service';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Store.name,
    schema:StoreSchema
  }])],
  controllers:[StoreController],
  providers: [StoreService]
})
export class StoreModule {}
