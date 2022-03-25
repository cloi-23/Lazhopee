import { ProductModule } from './product/product.module';
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
import { UploadModule } from './upload/upload.module';
import { PurchaseController } from './purchase/purchase.controller';
import { PurchaseModule } from './purchase/purchase.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27018/Lazhopee'),
  CustomerModule,
  DriverModule,
  ManagerModule,
  OrderModule,
  DeliveryModule,
  StoreModule,
  UploadModule,
  ProductModule,
  PurchaseModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
