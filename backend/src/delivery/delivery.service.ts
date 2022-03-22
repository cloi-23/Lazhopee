import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Delivery } from './entities/delivery.entity';
import { Model } from 'mongoose'
import { Driver } from 'src/driver/entities/drivers.entity';

@Injectable()
export class DeliveryService {
  constructor(@InjectModel(Delivery.name) private readonly deliveryModel: Model <Delivery>,
  @InjectModel(Driver.name) private readonly driverModel: Model <Driver>) {}
  
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
