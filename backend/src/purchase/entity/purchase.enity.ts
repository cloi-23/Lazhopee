
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'
import { Articles } from "../dto/articles.dto";
@Schema()
export class Purchase extends Document{
 
    @Prop({default: new Date()})
    dateOfPurchase:Date

    @Prop()
    articles: Articles[]

    @Prop()
    storeId: string

    @Prop()
    totalAmount: string


}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase)
