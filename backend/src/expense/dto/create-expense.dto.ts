import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsString()
    name:string

    @IsOptional()
    @IsString()
    date: string

    @IsNumber()
    @IsPositive()
    cost:number
}
