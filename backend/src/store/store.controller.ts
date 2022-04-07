import { JwtAuthGuard } from '../manager/auth/guard/jwt-auth.guard';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreService } from './store.service';
import { Body, Controller, Get, Param, Post, Delete, Patch, UseGuards } from '@nestjs/common';


@UseGuards(JwtAuthGuard)
@Controller('store')
export class StoreController {
    constructor(private readonly storeService:StoreService){}

    @Get()
    findAll(){
        return this.storeService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        console.log(id);
        
        return this.storeService.findOne(id)
    }
    @Post('add')
    create(@Body() createStoreDto:CreateStoreDto, @Body('name') name: string){
        return this.storeService.create(name,createStoreDto)
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
        return this.storeService.update(id, updateStoreDto);
    }

    @Delete(':name')
    remove(@Param('name') name: string) {
        return this.storeService.remove(name);
    }
    @Delete('/del/last')
    removeLast() {
        return this.storeService.removeLast()
    }
}
