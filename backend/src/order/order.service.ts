import { Purchase } from './../purchase/entity/purchase.enity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Customer } from '../customer/entities/customer.entity';
import { updateOrderDto } from './dto/update-order.dto';
import { Product } from '../product/entity/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order> ,
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer> ,
    @InjectModel(Product.name) private readonly productModel: Model<Product> ,
    @InjectModel(Purchase.name) private readonly purchaseModel: Model<Purchase> ,
    
    ) {}

    async findAll(/* pagination: PaginationDto */) {

      const orderList = await this.orderModel.find()/* .limit(limit).skip(page * limit) */
      const customerOrder = []
      for (const order of orderList) {
        const customerId = order.customerId
        const customer = await this.customerModel.findOne({_id: customerId})
        const data = {
          order,
          customer
        }
         customerOrder.push(data)    
      }
      return customerOrder
    }
    
    async customerOrder(id: string) {
      const customerOrder = await this.orderModel.find({ customerId: id }).exec()
      let arr = []
      for (let product in customerOrder ) {
        let data = {
           articles: customerOrder[product].articles,
           status:customerOrder[product].status 
        }
        arr.push(data)
      }
      let orderList = []

      for (let x in arr){
        if (arr[x].articles.length != 1) {
          for (let y in arr[x].articles) {
            const product = await this.productModel.find({ _id: arr[x].articles[y].productId })
            let merge = Object.assign(arr[x].articles[y],{ name:product[0].name,image:product[0].image,status:arr[x].status}) 
            orderList.push(merge)
          }
        } else {
           const product = await this.productModel.find({ _id: arr[x].articles[0].productId })
            let merge = Object.assign(arr[x].articles[0],{name:product[0].name,image:product[0].image,status:arr[x].status});
            orderList.push(merge);               
        }    
      }
       return orderList  
    }
    
  
    async findOne(id: string) {
      try {
        const order = await this.orderModel.findOne({ _id: id }).exec();
        if (!order) {
          throw new NotFoundException(`Order #${id} not found`);
        }
        return order
      } catch (error) {
        throw new NotFoundException(`Order #${id} not found`);

      }   
    }

    async findOrder(id: string) {
      try {
        const order = await this.findOne(id)
        if (!order) {
          throw new NotFoundException(`Order #${id} not found`);
        }
        const product = []
        for (let key in order.articles) {
          const productId = order.articles[key].productId
          const products = await this.productModel.findOne({ _id: productId }).exec();
          const data = {
            name: products.name,
            image:products.image
          }
          const newObj = Object.assign(order.articles[key],data); 
          product.push(newObj)
        }
        const customerId = order.customerId
        const customer = await this.customerModel.findOne({_id: customerId})

        return {
          _id:order._id,
          date:order.date,
          articles:order.articles,
          name:customer.name,
          address:customer.address,
          contact:customer.contact,
          status:order.status
        }
      } catch (error) {
        throw new NotFoundException(`Order #${id} not found`);

      }
    }
    async create(createOrderDto: CreateOrderDto) {
      const order = await this.orderModel.create(createOrderDto)
      return order.save();
    }
  
    async update(id: string, updateOrderDto: updateOrderDto) {      
      await this.orderModel
      .findOneAndUpdate({ _id: id }, { $set: updateOrderDto }, { new: true })
      .exec();
      }

      async remove(id: string) {
      const order = await this.orderModel.findOne({ _id: id }).exec();
      return order.remove();
    }

   async findIncomeStament(startDate:string,endDate:string){
      
      
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

          //order
   const order =orderList.map(x=>{
    return {
      total:x.articles.map(articles=> articles.quantity * articles.sellingPrice).reduce((x,y)=>x+y),
      date:x.date
    }
   })
   let totalOrder = 0
   if(order.length !==0){
    totalOrder= order.map(x=>x.total).reduce((x,y)=>x+y)
   }
      //purchase 
   const purchase =purchaseList.map(x=>{
    return {
      total:x.articles.map(articles=> articles.quantity * articles.unitCost).reduce((x,y)=>x+y),
      date:x.dateOfPurchase
    }
   })
   let totalPurchase = 0
   if(purchase.length !==0){
    totalPurchase = purchase.map(x=>x.total).reduce((x,y)=>x+y)
   }
      return   {
        purchase:purchase,
        order:order,
        totalPurchase,
        totalOrder
      }
    }
}
