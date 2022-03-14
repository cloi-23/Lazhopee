import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';
import { DriverModule } from './driver/driver.module';
import { ManagerModule } from './manager/manager.module';
import { OrderModule } from './order/order.module';
import { DeliveryModule } from './delivery/delivery.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/Lazhopee'),
  CustomerModule,
  DriverModule,
  ManagerModule,
  OrderModule,
  DeliveryModule,
  StoreModule],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
