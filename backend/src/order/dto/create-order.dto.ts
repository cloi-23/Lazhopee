import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer'
import { Articles } from './articles-dto'
export class CreateOrderDto {

  @IsOptional()
  @IsString()
  customerId: string

  @ValidateNested({ each: true})
  @Type(() => Articles)
  articles: Articles[];

}
