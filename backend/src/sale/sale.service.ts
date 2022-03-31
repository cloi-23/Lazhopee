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
                        const total = month.filter(y=>{
                            if(y.date === x.no){
                                return y.total
                            }
                        })
                        const totalAmount = total.map(x=>x.total).reduce((x,y)=>x+y)
                        dataSet.push({date:x.name,total:totalAmount })
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
                  const total = year.filter(x =>{
                    if(x.date === item){
                       return x.total
                      }
                  })
                  const totalAmount = total.map(x=>x.total).reduce((x,y)=>x+y)
                  dataSet.push({date:item,total:totalAmount})
                }
            return dataSet
        }
        async findProductSale(startDate:string= '02/02/2022',endDate:string = '03/23/2022'){
          
          const orderList =  await this.orderModel.find({
            date: {
              $gte:startDate,
              $lt:endDate
          },
          status:'Success'
          }).sort({date:1})
          const productOrder= []
          const orderArticles=[]
          const dataSetArticles = []
          const dataSet = []
          const productNameList = new Set()
          for (const order of orderList) {
            for (const articles of order.articles) {
            const productId = articles.productId
            const product = await this.productModel.findOne({_id: productId})
            productNameList.add(product.name)
            orderArticles.push({
              productId:articles.productId,
              prodName: product.name,
              quantity:articles.quantity,
              sellingPrice:articles.sellingPrice,
              total:articles.quantity * articles.sellingPrice
            })
            } 
            productOrder.push({
              date:order.date,
              articles:orderArticles
            })
              
          }
          for (let item of productNameList) {
            const total = orderArticles.filter(x =>{
              if(x.prodName === item){
                 return x.total
                }
            })
            const totalAmount = total.map(x=>x.total).reduce((x,y)=>x+y)
            dataSet.push({prod:item,total:totalAmount})
          }
        
          
          return dataSet
   
        }
          
}
