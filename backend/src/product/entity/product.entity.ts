
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Product extends Document{
    @Prop()
    name:string

    @Prop()
    storeId:string

    @Prop()
    category:string

    @Prop()
    description:string

    @Prop()
    image:string

    @Prop()
    sellingPrice:number
}

export const ProductSchema = SchemaFactory.createForClass(Product)