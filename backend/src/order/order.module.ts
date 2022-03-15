import { Product, ProductSchema } from './../product/entity/product.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../customer/entities/customer.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Order.name,
      schema: OrderSchema
    }
  ]),MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    }
  ]),MongooseModule.forFeature([
    {
      name: Customer.name,
      schema: CustomerSchema
    }
  ])/* ,
  MongooseModule.forFeature([
    {
      name: Delivery.name,
      schema: DeliverySchema
    }
  ]) */],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
