import { Product } from './../product/entity/product.entity';
import { Articles } from './dto/articles.dto';
import { Store } from './../store/entity/store.entity';
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
        private readonly purchaseModel: Model<Purchase>,
        @InjectModel(Store.name)
        private readonly storeModel: Model<Store>,
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>
    ){}

   async findAll(){
        const purchaseList = await this.purchaseModel.find()/* .limit(limit).skip(page * limit) */
        const storePurchase = []
        const purchaseArticles = []
        for (const purchase of purchaseList) {
          const storeId = purchase.storeId
          const store = await this.storeModel.findOne({_id: storeId})
          const data = {
            _id:purchase._id,
            articles:purchaseArticles,
            dateOfPurchase: purchase.dateOfPurchase,
            storeId: purchase.storeId,
            store: store.name,
            totalAmount:purchase.totalAmount

          }
          storePurchase.push(data)    
        }
        return storePurchase
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
  
   async create(createPurchaseDto:CreatePurchaseDto){
     try {
         const filterByProductIdAndUnitCost= createPurchaseDto.articles.map(x=>
            {
              return{
                productId:x.productId,
                unitCost:x.unitCost
              }
            })
          

            for (const articles of filterByProductIdAndUnitCost) {
              const productId = articles.productId
              const product = await this.productModel.findOneAndUpdate({ _id: productId }, { $set: {unitCost: articles.unitCost} }, { new: true })
              .exec(); 
              console.log(product);
            }
            
         return new this.purchaseModel(createPurchaseDto).save()
     } catch (error) {
         console.log(error);
         
     }
    }
    async update(id:string, updatePurchaseDto:UpdatePurchaseDto){
      await this.findOne(id)
      await this.purchaseModel
      .findOneAndUpdate({ _id: id }, { $set: updatePurchaseDto }, { new: true })
      .exec();
      
    }
 
    async remove(id: string) {
     const purchase = await this.findOne(id)
     return purchase.remove();
   }


   async findPuchase(id: string){
    try {
      const purchase =  await this.findOne(id)
      if(!purchase){
          throw new NotFoundException(`Purchase #${id} not found`)
      }
      const purchaseArticles = []
      for (const articles of purchase.articles) {
        const productId = articles.productId
        console.log(productId);
        
        const product = await this.productModel.findOne({_id: productId})
        const article = {
          productId: articles.productId,
          unitCost: articles.unitCost,
          quantity: articles.quantity,
          name: product.name,
          category: product.category,
          image: product.image

        }
        purchaseArticles.push(article)
      } 
      const storeId = purchase.storeId
      const store = await this.storeModel.findOne({_id: storeId}) 
      const purchases = {
        _id: purchase._id,
        dateOfPurchase: purchase.dateOfPurchase,
        storeId:purchase.storeId,
        articles: purchaseArticles,
        store:store.name,
        totalAmount:purchase.totalAmount
      }
      console.log(purchases);
      return purchases
    } catch (error) {
      throw new NotFoundException(`Purchase #${id} not found`)
    }
     
 }

}
