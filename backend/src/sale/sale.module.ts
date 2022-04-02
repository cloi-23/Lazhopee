import { Product,ProductSchema } from './../product/entity/product.entity';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './../order/entities/order.entity';

import { Purchase, PurchaseSchema } from './../purchase/entity/purchase.enity';

@Module({
   imports: [
          MongooseModule.forFeature([
            {
                name:Product.name,
                schema:ProductSchema
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
