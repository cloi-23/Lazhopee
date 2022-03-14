<<<<<<< HEAD
import { Store, StoreSchema } from './../store/entity/store.entity';
import { Product, ProductSchema } from './entity/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

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
  providers: [ProductService],
  exports:[ProductService],
=======
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({ 
  imports: [MongooseModule.forFeature([
  {
    name: Product.name,
    schema: ProductSchema
  }
])], 
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
>>>>>>> 83b1e51dda9c51f9d25bbc136f7d2637ce3c5670
})
export class ProductModule {}
