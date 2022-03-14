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
    findOne(@Param() id: string){
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
  
}
