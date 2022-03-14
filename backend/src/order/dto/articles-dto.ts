import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Articles {
  @IsString()
  productId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  remark: string
}