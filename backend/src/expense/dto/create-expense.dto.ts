import { IsDate, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsString()
    name:string

    @IsOptional()
    @IsDate()
    date: Date

    @IsNumber()
    @IsPositive()
    cost:number
}
