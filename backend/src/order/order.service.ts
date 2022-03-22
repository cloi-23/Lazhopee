import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Customer } from '../customer/entities/customer.entity';
import { updateOrderDto } from './dto/update-order.dto';
import { Product } from '../product/entity/product.entity';
import { object } from 'webidl-conversions';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order> ,
    
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer> ,

    @InjectModel(Product.name) private readonly productModel: Model<Product> ,
    
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
      // return (customer.filter( x => x.status == 'Pending'))
      const arr = []
      for (let product of customerOrder ) {
        arr.push(product.articles)
      }

      const arr1 = arr.flat()
      let prodId = arr1.map(x => {
      return  x.productId
    })

      const allOrders = []
      for(let id in prodId){
      const product = await this.productModel.find({ _id: prodId[id] }).exec()

      const orderInfo = {
        name: product[0].name,
        image: product[0].image,
      }
      let newArr = Object.assign(arr1[id],orderInfo)
      allOrders.push(newArr)    
    }
      return allOrders
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
            image: products.image
          }
          const newObj = Object.assign(order.articles[key],data); 
          product.push(newObj)
        }
        return order
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
}
