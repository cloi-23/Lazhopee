import { SaleService } from './sale.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../manager/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sale')
export class SaleController {
    constructor(private readonly saleService:SaleService){}

    @Get("daily")
    async findDailySale(@Query('startDate') startDate: string,@Query('endDate') endDate: string){
        return this.saleService.findDailySale(startDate,endDate)
    }

    @Get("monthly")
    async findMonthSale(@Query('startDate') startDate: string,@Query('endDate') endDate: string){
        return this.saleService.findMonthSale(startDate,endDate)
    }

    
    @Get("yearly")
    async findYearlySale(@Query('startDate') startDate: string,@Query('endDate') endDate: string){
        return this.saleService.findYearlySale(startDate,endDate)
    }
    
    @Get("product")
    async findProductSale(@Query('startDate') startDate: string,@Query('endDate') endDate: string,@Query() q:any){
        return this.saleService.findProductSale(startDate,endDate)
    }



}
