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
        //    let totalOrder = 0
        //    if(order.length !==0){
        //     totalOrder= order.map(x=>x.total).reduce((x,y)=>x+y)
        //    }
              //purchase 
           const purchase =purchaseList.map(x=>{
            return {
            articles:x.articles,
              total:x.articles.map(articles=> articles.quantity * articles.unitCost).reduce((x,y)=>x+y),
              date:x.dateOfPurchase
            }
           })
        //    let totalPurchase = 0
        //    if(purchase.length !==0){
        //     totalPurchase = purchase.map(x=>x.total).reduce((x,y)=>x+y)
        //    }

        const expenseTotal =expenseList.map(x=>x.cost).reduce((x,y)=>x+y)

              return   {
                purchase:purchase,
                order:order,
                expense:expenseList
                // expenseTotal
                // totalPurchase,
                // totalOrder
              }
        }
     
}
