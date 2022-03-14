import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Store  extends Document {
  
  @Prop()
  name: string

  @Prop()
  contact: string;

  @Prop()
  Addres: string;

  @Prop()
  image: string

  @Prop({default: new Date()})
  date: Date
}

export const StoreSchema = SchemaFactory.createForClass(Store)
