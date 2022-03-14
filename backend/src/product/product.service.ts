import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>
    ){}

    findAll(){
        return this.productModel.find()
    }

   async findOne(id: string){
      try {
        const product = this.productModel.findOne({id : id}).exec() 
        if(!product){
            throw new NotFoundException(`Product #${id} not found`)
        }
        return product
      } catch (error) {
        throw new NotFoundException(`Product #${id} not found`)
      }
       
   }

   async create(name:string , createProductDto:CreateProductDto){
       try {
           const product =  await this.productModel.findOne({name : name}).exec()
           if(!product){
            throw new NotFoundException(`Product ${name} is already exist`)
        }
        return  product.save()
           
       } catch (error) {
        throw new NotFoundException(`Product ${name} is already exist`)
       }
   }

   async update(id:string, updateProductDto:UpdateProductDto){
       try {
        const product = this.findOne(id)
        await this.productModel
        .findOneAndUpdate({ _id: id }, { $set: updateProductDto }, { new: true })
        .exec(); 
       } catch (error) {
           
       }
   }

   async remove(id: string) {
    const store = await this.findOne(id)
    return store.remove();
  }
}
