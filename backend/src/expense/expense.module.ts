import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Expense, ExpenseSchema } from './entity/expense.enitity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
    imports:[MongooseModule.forFeature([
        {
          name: Expense.name,
          schema: ExpenseSchema
        }]
    )],
    controllers:[ExpenseController],
    providers:[ExpenseService],
    exports:[ExpenseService]
})
export class ExpenseModule {}
