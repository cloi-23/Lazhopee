import { Product } from 'src/product/entity/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/order/entities/order.entity';
import { Model } from 'mongoose'
import { format, compareAsc } from 'date-fns'



@Injectable()
export class SaleService {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<Order>,
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>
        ){}

        async  findDailySale(startDate:string= '02/02/2022',endDate:string = '03/23/2022'){
            const orderList =  await this.orderModel.find({
                date: {
                  $gte:startDate,
                  $lt:endDate
              },
              status:'Success'
              }).sort({date:1})
           const sale =orderList.map(x=>{
            return {

              total:x.articles.map(articles=> articles.quantity * articles.sellingPrice).reduce((x,y)=>x+y),
              date:format(new Date(x.date),'MM/dd/yyyy'),
            }
           })
          
            return   {
                sale
                
              }
        }

        async  findMonthSale(startDate:string= '02/02/2022',endDate:string = '03/23/2022'){
          const dataSet = []
          const monthFormat=[
            {
                no:'01',
                name:'January'
            },
            {
                no:'02',
                name:'February'
            },
            {
                no:'03',
                name:'March'
            },
            {
                no:'04',
                name:'April'
            },
            {
              no:'05',
              name:'May'
            },
            {
              no:'06',
              name:'June'
            },
            {
              no:'07',
              name:'July'
            },
            {
              no:'08',
              name:'August '
            },
            {
              no:'09',
              name:'September'
            },
            {
              no:'10',
              name:'October'
            },
            {
              no:'11',
              name:'November'
            },
            {
              no:'12',
              name:'December'
            }
            ]
          const orderList =  await this.orderModel.find({
            date: {
                    $gte:startDate,
                    $lt:endDate
                  },
                status:'Success'
             }).sort({date:1})
            const sale =orderList.map(x=>{
              return {

                total:x.articles.map(articles=> articles.quantity * articles.sellingPrice).reduce((x,y)=>x+y),
                date:format(new Date(x.date),'MM/dd/yyyy'),
              }
            })
            const month=sale.map(list =>{
                const date=list.date.split('').splice(0,2).join('')
                const total = list.total
                return{
                date ,
                total
            }     
                })
                monthFormat.map(x=>{
                    if(month.some(item => item.date === x.no)){
                        const total = month.map(y=>{
                            if(y.date === x.no){
                                return y.total
                            }
                        })
                        dataSet.push({date:x.name,total:total.reduce((x,y)=>x+y) })
                    }
                })
           
            return dataSet
        }

        async  findYearlySale(startDate:string= '02/02/2022',endDate:string = '03/23/2022'){
          const dataSet = []
      
          const orderList =  await this.orderModel.find({
            date: {
                    $gte:startDate,
                    $lt:endDate
                  },
                status:'Success'
             }).sort({date:1})
            const sale =orderList.map(x=>{
              return {
                total:x.articles.map(articles=> articles.quantity * articles.sellingPrice).reduce((x,y)=>x+y),
                date:format(new Date(x.date),'MM/dd/yyyy'),
              }
            })
            const yearList = new Set()
            const year=sale.map(list =>{
                const date=list.date.split('').splice(6,10).join('')
                const total = list.total
                yearList.add(date)
                return{
                date ,
                total
            }     
                })
                for (let item of yearList) {
                  const total = year.map(x =>{
                    if(x.date === item){
                       return x.total
                      }
                  })
                  dataSet.push({date:item,total:total.reduce((x,y)=>x+y)})
                }
            return dataSet
        }
          
}
