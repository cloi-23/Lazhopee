import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Delivery } from './entities/delivery.entity';
import { Model } from 'mongoose'
import { Driver } from '../driver/entities/drivers.entity';
import { Order } from '../order/entities/order.entity';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class DeliveryService {
  constructor(@InjectModel(Delivery.name) private readonly deliveryModel: Model <Delivery>,
  @InjectModel(Driver.name) private readonly driverModel: Model <Driver>,
  @InjectModel(Order.name) private readonly orderModel: Model <Order>,
  @InjectModel(Customer.name) private readonly customerModel: Model <Customer>) {}
  
  async findAll(/* pagination: PaginationDto */) {
    const deliveryList = await this.deliveryModel.find()/* .limit(limit).skip(page * limit) */
    const deliveries = []
    for (const deliver of deliveryList) {
      const driverId = deliver.driverId
      const driver = await this.driverModel.findOne({_id: driverId})
      const driverName = driver.name
      const data = {
        _id: deliver._id,
        driverId: deliver.driverId,
        orderId: deliver.orderId,
        driverName
      }
      
      deliveries.push(data)    
    }
    return deliveries
  }


  async findOne(id: string) {

    try {
      const delivery = await this.deliveryModel.findOne({ _id: id }).exec();
      if (!delivery) {
        throw new NotFoundException(`Delivery #${id} not found`);
      }
      return delivery;
    } catch (error) {
      throw new NotFoundException(`Delivery #${id} not found`);
    }
  }

  async findDeliveryOrder() {
    const deliveryList = await this.deliveryModel.find()/* .limit(limit).skip(page * limit) */
    
    const deliveries = []
    for (const deliver of deliveryList) {
      const orderId = deliver.orderId
      const driverId = deliver.driverId
      const driver = await this.driverModel.findOne({_id: driverId})
      const order = await this.orderModel.findOne({_id: orderId})
      const customerId = order.customerId
      const customer = await this.customerModel.findOne({_id: customerId})
      const driverName = driver.name
      const data = {
        _id: deliver._id,
        driverId: deliver.driverId,
        orderId: deliver.orderId,
        date: order.date,
        customerName: customer.name,
        customerAddress: customer.address,
        status:order.status,
        contact:customer.contact,
        driverName
      }
      
      deliveries.push(data)    
    }
    return deliveries
  }

    create(createDelivery: Object[]) {
    const delivery = new this.deliveryModel(createDelivery) 
    return delivery.save()
  }

  async update(id: string, updateDelivery) {
      await this.deliveryModel
      .findOneAndUpdate({ _id: id }, { $set: updateDelivery }, { new: true })
      .exec();
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    return product.remove();
  }

  async findAllDriverDelivery(driverId) {
    const deliveryList = await this.deliveryModel.find({driverId: driverId})/* .limit(limit).skip(page * limit) */
    const deliveries = []
    for (const deliver of deliveryList) {
      const driverId = deliver.driverId
      const driver = await this.driverModel.findOne({_id: driverId})
      const driverName = driver.name
      const data = {
        _id: deliver._id,
        driverId: deliver.driverId,
        orderId: deliver.orderId,
        driverName
      }
      
      deliveries.push(data)    
    }
    return deliveries
  }

  
}
