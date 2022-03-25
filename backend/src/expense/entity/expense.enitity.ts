import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'
@Schema()
export class Expense  extends Document{
    @Prop({default : new Date()})
    date:Date

    @Prop()
    name:string

    @Prop()
    cost:number

}
export const ExpenseSchema = SchemaFactory.createForClass(Expense)