import { Product } from './../product/entity/product.entity';
import { Articles } from './../purchase/dto/articles.dto';
import { Expense } from './../expense/entity/expense.enitity';
import { Order } from './../order/entities/order.entity';
import { Purchase } from './../purchase/entity/purchase.enity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class IncomeStatementService {
    constructor(
        @InjectModel(Purchase.name)
        private readonly purchaseModel: Model<Purchase>,
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>,
        @InjectModel(Order.name)
        private readonly orderModel: Model<Order>,
        @InjectModel(Expense.name)
        private readonly expenseModel: Model<Expense>
        ){}

        async  findAll(startDate:string= '02/02/2022',endDate:string = '03/23/2022'){

            
            const orderList =  await this.orderModel.find({
                date: {
                  $gte:startDate,
                  $lt:endDate
              },
              status:'Success'
              })
              const purchaseList =  await this.purchaseModel.find({
                dateOfPurchase: {
                  $gte:startDate,
                  $lt:endDate
              },
              })
              const expenseList =  await this.expenseModel.find({
                date: {
                  $gte:startDate,
                  $lt:endDate
              },
              })

            //order
           const order =orderList.map(x=>{
            return {

              total:x.articles.map(articles=> articles.quantity * articles.sellingPrice).reduce((x,y)=>x+y),
              date:x.date,
              articles:x.articles
            }
           })
           let totalOrder = 0
           if(order.length !==0){
            totalOrder= order.map(x=>x.total).reduce((x,y)=>x+y)
           }
         
           const costOfGoodsList =[]
           for (const order of orderList) {
             let total =[]
            for (const articles of order.articles) {
              const productId = articles.productId
              const product = await this.productModel.findOne({ _id: productId })
              total.push({
                quantity:articles.quantity,
                unitCost:product.unitCost,
                productName:product.name,
                totalCost:articles.quantity*product.unitCost
              })
            }
            costOfGoodsList.push({
              total:total.map(x=>x.totalCost).reduce((x,y)=>x+y),
              date:order.date
            })
            
          }
          let costOfGoods =  0
          if(costOfGoodsList.length !==0){
            costOfGoods = costOfGoodsList.map(x=>x.total).reduce((x,y)=>x+y)
          }

            let totalExpense = 0
            if(expenseList.length !==0){
              totalExpense = expenseList.map(x=>x.cost).reduce((x,y)=>x+y)
            }
              return   {
                costOfGoods,
                order:order,
                expense:expenseList,
               totalExpense,
                totalOrder
              }
        }
     
}
