import { Store, StoreSchema } from './../store/entity/store.entity';
import { Product, ProductSchema } from './entity/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { JwtStrategy } from '../manager/auth/strategy/jwt.strategy';

@Module({
  imports:[MongooseModule.forFeature([{
    name: Product.name,
    schema: ProductSchema
  },
  {
    name: Store.name,
    schema: StoreSchema
  }
])],
  controllers: [ProductController],
  providers: [ProductService, JwtStrategy],
  exports:[ProductService],
})
export class ProductModule {}
