import { Type } from "class-transformer";
import { IsArray, IsDate, ValidateNested } from "class-validator";
import { Articles } from "./articles.dto";

export class CreatePurchaseDto {
    @IsDate()
    dateOfPurchase: Date

    @ValidateNested({ each: true})
    @Type(() => Articles)
    articles: Articles[] 
}
