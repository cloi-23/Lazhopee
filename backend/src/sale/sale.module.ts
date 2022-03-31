import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from 'src/expense/entity/expense.enitity';
import { Order, OrderSchema } from 'src/order/entities/order.entity';
import { Product, ProductSchema } from 'src/product/entity/product.entity';
import { Purchase, PurchaseSchema } from 'src/purchase/entity/purchase.enity';

@Module({
   imports: [
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
    providers:[SaleService],
    controllers:[SaleController],
    exports:[SaleService]
})
export class SaleModule {}
