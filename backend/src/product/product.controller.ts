<<<<<<< HEAD
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';

@Controller('product')
export class ProductController {
    constructor(private readonly  productService:ProductService){}

    @Get()
    findAll(){
        return this.productService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productService.findOne(id)
    }
    @Post('add')
    create(@Body() createProductDto:CreateProductDto,@Body('name') name:string){
        return this.productService.create(name,createProductDto)
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
=======
// import { PaginationDto } from '../common/pagination/pagination-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(/* @Query() pagination: PaginationDto */) {   
    return this.productService.findAll(/* pagination */);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id)
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto,
    @Body('name') name: string) {
    return this.productService.create(name, createProductDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
  

>>>>>>> 83b1e51dda9c51f9d25bbc136f7d2637ce3c5670
  
}
