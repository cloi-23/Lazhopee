import { Customer ,CustomerSchema} from 'src/customer/entities/customer.entity';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD

// import { Delivery, DeliverySchema } from 'src/delivery/entities/delivery.entity';
// import { Product, ProductSchema } from 'src/product/entities/product.entity';
=======
import { Customer, CustomerSchema } from 'src/customer/entities/customer.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
>>>>>>> 83b1e51dda9c51f9d25bbc136f7d2637ce3c5670
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
