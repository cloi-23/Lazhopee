import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseService } from './purchase.service';
import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';

@Controller('purchase')
export class PurchaseController {
    constructor(private readonly purchaseService:PurchaseService){}

    @Get()
    findAll(){
        return this.purchaseService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.purchaseService.findOne(id)
    }
    @Post('add')
    create(@Body() createPurchaseDto:CreatePurchaseDto){
        return this.purchaseService.create(createPurchaseDto)
    }
    @Patch(':id')
    update(@Param('id') id:string,@Body() createPurchaseDto:CreatePurchaseDto){
        return this.purchaseService.update(id,createPurchaseDto)
    }
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.purchaseService.remove(id)
    }
}
