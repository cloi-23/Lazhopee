import { IsString,IsOptional, IsNumber, IsPositive } from "class-validator"

export class CreateProductDto  {
    @IsString()
    name:string

    @IsString()
    storeId:string

    @IsOptional()
    @IsString()
    image:string

    @IsNumber()
    @IsPositive()
    sellingPrice:number
}


