import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Articles } from "../dto/articles-dto";
/* eslint-disable prettier/prettier */
@Schema()
export class Order  extends Document {
  
  @Prop()
  customerId: string;

  @Prop({ default: 'Pending'})
  status: string;

  @Prop()
  articles: Articles[]

  @Prop({default : new Date().toLocaleDateString() })
  date: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)
