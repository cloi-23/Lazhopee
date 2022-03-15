import { Purchase, PurchaseSchema } from './entity/purchase.enity';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseController } from './purchase.controller';
import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Purchase.name,
      schema:PurchaseSchema
    }
  ])],
  controllers:[PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService]
})
export class PurchaseModule {}
