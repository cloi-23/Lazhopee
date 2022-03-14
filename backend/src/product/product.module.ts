import { Product, ProductSchema } from './entity/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports:[MongooseModule.forFeature([{
    name: Product.name,
    schema: ProductSchema
  }])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
