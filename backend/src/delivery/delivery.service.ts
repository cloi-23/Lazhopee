import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Delivery } from './entities/delivery.entity';
import { Model } from 'mongoose'

@Injectable()
export class DeliveryService {
  constructor(@InjectModel(Delivery.name) private readonly deliveryModel: Model <Delivery>) {}

  async findAll(/* pagination: PaginationDto */) {
    return this.deliveryModel.find()
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
}
