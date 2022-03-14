import {  IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString() 
  @IsOptional()
  name: string

  @IsOptional()
  @IsString()
  contact: string

  @IsString()
  address: string

  @IsOptional()
  @IsString()
  image: string

}