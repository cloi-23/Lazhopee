import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Expense, ExpenseSchema } from './entity/expense.enitity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtStrategy } from '../manager/auth/strategy/jwt.strategy';

@Module({
    imports:[MongooseModule.forFeature([
        {
          name: Expense.name,
          schema: ExpenseSchema
        }]
    )],
    controllers:[ExpenseController],
    providers:[ExpenseService, JwtStrategy],
    exports:[ExpenseService]
})
export class ExpenseModule {}
