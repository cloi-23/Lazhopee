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
import { PurchaseModule } from './purchase/purchase.module';
import { ExpenseModule } from './expense/expense.module';
import { IncomeStatementModule } from './income-statement/income-statement.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SaleModule } from './sale/sale.module'

@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: "smtp.gmail.com",
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: 'mejaricruz123@gmail.com',
        pass: 'wmzjwevlutlbmjwe',
      },
    },
    defaults: {
      from: '"No Reply" <no-reply@localhost>',
    },
    preview: true,
    template: {
      dir: process.cwd() + '/template/',
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  }),
  ConfigModule.forRoot(),
  MongooseModule.forRoot('mongodb://localhost:27018/Lazhopee'),
  CustomerModule,
  DriverModule,
  ManagerModule,
  OrderModule,
  DeliveryModule,
  StoreModule,
  UploadModule,
  ProductModule,
  PurchaseModule,
  ExpenseModule,
  IncomeStatementModule,
  SaleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
