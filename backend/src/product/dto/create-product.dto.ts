import { IsString,IsOptional, IsNumber, IsPositive } from "class-validator"

export class CreateProductDto  {
    @IsString()
    name:string

    @IsString()
    storeId:string

    @IsString()
    category:string

    @IsOptional()
    @IsString()
    image:string

    @IsOptional()
    @IsString()
    description:string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    sellingPrice:number
}


