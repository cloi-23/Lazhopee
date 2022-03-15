import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './entity/purchase.enity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class PurchaseService {
    constructor(
        @InjectModel(Purchase.name)
        private readonly purchaseModel: Model<Purchase>
    ){}

    findAll(){
        return this.purchaseModel.find()
    }

    async findOne(id: string){
        try {
          const purchase = await this.purchaseModel.findOne({_id : id}).exec() 
          if(!purchase){
              throw new NotFoundException(`Purchase #${id} not found`)
          }
  
          return purchase
        } catch (error) {
          throw new NotFoundException(`Purchase #${id} not found`)
        }
         
     }
  
    create(createPurchaseDto:CreatePurchaseDto){
     try {
         return new this.purchaseModel(createPurchaseDto).save()
     } catch (error) {
         console.log(error);
         
     }
    }
    async update(id:string, updatePurchaseDto:UpdatePurchaseDto){
        try {
         const purchase = this.findOne(id)
         await this.purchaseModel
         .findOneAndUpdate({ _id: id }, { $set: updatePurchaseDto }, { new: true })
         .exec(); 
        } catch (error) {
            
        }
    }
 
    async remove(id: string) {
     const store = await this.findOne(id)
     return store.remove();
   }
}
