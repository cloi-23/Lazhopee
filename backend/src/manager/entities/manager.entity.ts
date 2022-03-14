import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
/* eslint-disable prettier/prettier */
@Schema()
export class Manager  extends Document {
  
  @Prop()
  name: string;

  @Prop()
  contact: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  address: string;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager)
