import { IsDate } from 'class-validator';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer'
import { Articles } from './articles-dto'
export class CreateOrderDto {

  @IsString()
  customerId: string

  @ValidateNested({ each: true})
  @Type(() => Articles)
  articles: Articles[];

  @IsOptional()
  @IsString()
  status: string

  @IsOptional()
  @IsDate()
  date: Date
}
