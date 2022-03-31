import { Product, ProductSchema } from 'src/product/entity/product.entity';
import { Store, StoreSchema } from './../store/entity/store.entity';
import { Purchase, PurchaseSchema } from './entity/purchase.enity';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseController } from './purchase.controller';
import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { JwtStrategy } from '../manager/auth/strategy/jwt.strategy';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Purchase.name,
      schema:PurchaseSchema
    },
    {
      name: Store.name,
      schema: StoreSchema
    },
    {
      name: Product.name,
      schema: ProductSchema
    }
  ])],
  controllers:[PurchaseController],
  providers: [PurchaseService, JwtStrategy],
  exports: [PurchaseService]
})
export class PurchaseModule {}
