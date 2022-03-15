import { IsNumber, IsString, IsPositive } from "class-validator";

export class Articles {
    @IsString()
    productId:string

    @IsNumber()
    @IsPositive()
    unitCost:number

    @IsNumber()
    @IsPositive()
    quantity:number
}
