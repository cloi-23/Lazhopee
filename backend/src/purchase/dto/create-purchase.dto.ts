import { Type } from "class-transformer";
import {IsDate, IsString, ValidateNested,IsNumber } from "class-validator";
import { Articles } from "./articles.dto";

export class CreatePurchaseDto {
    @IsDate()
    dateOfPurchase: Date

    @ValidateNested({ each: true})
    @Type(() => Articles)
    articles: Articles[] 

    @IsString()
    storeId:string

    @IsNumber()
    totalAmount: number
}
