import { IncomeStatementService } from './income-statement.service';
import { IncomeStatementController } from './income-statement.controller';
import { Order, OrderSchema } from './../order/entities/order.entity';
import { Purchase, PurchaseSchema } from './../purchase/entity/purchase.enity';
import { Expense, ExpenseSchema } from './../expense/entity/expense.enitity';
import { Product, ProductSchema } from './../product/entity/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:Product.name,
                schema:ProductSchema
            },
            {
                name:Expense.name,
                schema:ExpenseSchema
            },
            {
                name: Purchase.name,
                schema: PurchaseSchema
            },
            {
                name: Order.name,
                schema: OrderSchema
            }
        ])
    ],
  controllers:[IncomeStatementController],
  providers:[IncomeStatementService],
  exports:[IncomeStatementService]
})
export class IncomeStatementModule {}
