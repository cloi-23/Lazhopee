import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './entity/store.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class StoreService {
    constructor(
        @InjectModel(Store.name)
        private readonly storeModel:Model<Store>
    ){}
    findAll(){
        return this.storeModel.find()
    }
    async findOne(id: string) {
        try{
            const store = await this.storeModel.findOne({ _id: id }).exec();
            if (!store) {
              throw new NotFoundException(`Store #${id} not found`);
            }
            return store;
        }
        catch(err){
          throw new NotFoundException(`Store #${id} not found`);
        }
      }
    
      async create(name: string, createStoreDto: CreateStoreDto) {

        const store = new this.storeModel(createStoreDto);
        const isExisting = await this.storeModel.findOne({ name: name }).exec()
    
        if (isExisting) {
          throw new HttpException('Store already exist!', HttpStatus.CONFLICT)
        }
        return store.save();
      }
    
      async update(id: string, updateStoreDto: UpdateStoreDto) {
        await this.storeModel
        .findOneAndUpdate({ _id: id }, { $set: updateStoreDto }, { new: true })
        .exec();
      }
    
      async remove(id: string) {
        const store = await this.findOne(id)
        return store.remove();
      }
}
