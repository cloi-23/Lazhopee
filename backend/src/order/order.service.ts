import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order> ,
    
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer> ,
    
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
    
    async findAllOrderByCust(id: string) {
      const customer = await this.orderModel.find({ customerId: id }).exec()
      return (customer.filter( x => x.status == 'packaging')) 
      
    }
  
    async findOne(id: string) {
      try {
        const order = await this.orderModel.findOne({ _id: id }).exec();
        if (!order) {
          throw new NotFoundException(`Order #${id} not found`);
        }
        return order;
      } catch (error) {
        throw new NotFoundException(`Order #${id} not found`);
      }
     
    }
  
    async create(createOrderDto: CreateOrderDto) {
      const order = await this.orderModel.create(createOrderDto)
      return order.save();
    }
  
    async update(updateOrderDto: UpdateOrderDto) {
      
      
      
      
      
      
      
    }

     async RemoveAllOrderByCust(id: string) {
      return this.orderModel.deleteMany({ customerId: id })    }

      async remove(id: string) {
      const product = await this.findOne(id)
      return product.remove();
    }
}
