import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Manager, ManagerSchema } from './entities/manager.entity';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Manager.name,
      schema: ManagerSchema
    }
  ]),
  forwardRef(() => AuthModule)
],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService]
})
export class ManagerModule {}
