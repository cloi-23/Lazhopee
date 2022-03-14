import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreController } from './store/store.controller';
import { StoreModule } from './store/store.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/Lazhopee')],
  controllers: [AppController, StoreController],
  providers: [AppService],
})
export class AppModule {}
