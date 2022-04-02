import { Type } from "class-transformer";
import {IsDate, IsString, ValidateNested,IsNumber, IsOptional } from "class-validator";
import { Articles } from "./articles.dto";

export class CreatePurchaseDto {
    @IsOptional()
    @IsDate()
    dateOfPurchase: Date

    @IsOptional()
    @ValidateNested({ each: true})
    @Type(() => Articles)
    articles: Articles[] 

    @IsOptional()
    @IsString()
    storeId:string
    @IsOptional()
    @IsNumber()
    totalAmount: number
}
