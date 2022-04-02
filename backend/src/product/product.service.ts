import { UpdateProductDto } from './dto/update-product-dto';
import { Store } from './../store/entity/store.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>,
        @InjectModel(Store.name)
        private readonly storeModel: Model<Store>
    ){}

  async  findAll(){
      const productList = await this.productModel.find()/* .limit(limit).skip(page * limit) */
      const storeProduct = []
      for (const product of productList) {
        const storeId = product.storeId
        const store = await this.storeModel.findOne({_id: storeId})
        const data = {
          _id: product._id,
          sellingPrice: product.sellingPrice,
          image: product.image,
          storeId: product.storeId,
          name: product.name,
          store: store.name,
          category: product.category,
          description:product.description
        }
        storeProduct.push(data)    
      }
      return storeProduct
    }

   async findOne(id: string){
      try {
        const product = await this.productModel.findOne({_id : id}).exec() 
        
        if(!product){
            throw new NotFoundException(`Product #${id} not found`)
        }

        return product
      } catch (error) {
        throw new NotFoundException(`Product #${id} not found`)
      }
       
   }

   async create(name: string, createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    const isExisting = await this.productModel.findOne({ name: name }).exec()

    if (isExisting) {
      throw new HttpException('product already exist!', HttpStatus.CONFLICT)
    }
    return product.save();
  }

   async update(id:string, updateProductDto:UpdateProductDto){
          await this.findOne(id)
          await this.productModel
        .findOneAndUpdate({ _id: id }, { $set: updateProductDto }, { new: true })
        .exec();   
   }

   async remove(id: string) {
    const store = await this.findOne(id)
    return store.remove();
  }
}
