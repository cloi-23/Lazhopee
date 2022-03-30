import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../manager/auth/strategy/jwt.strategy';
import { Customer, CustomerSchema } from '../customer/entities/customer.entity';
import { Driver, DriverrSchema } from '../driver/entities/drivers.entity';
import { Order, OrderSchema } from '../order/entities/order.entity';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { Delivery, DeliverySchema } from './entities/delivery.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Delivery.name,
      schema: DeliverySchema
    }
  ]),
  MongooseModule.forFeature([
    {
      name: Order.name,
      schema: OrderSchema
    }
  ]),
  MongooseModule.forFeature([
    {
      name: Customer.name,
      schema: CustomerSchema
    }
  ]),
  MongooseModule.forFeature([
    {
      name: Driver.name,
      schema: DriverrSchema
    }
  ])],
  controllers: [DeliveryController],
  providers: [DeliveryService, JwtStrategy],
  exports: [DeliveryService]
})
export class DeliveryModule {}
