import { SaleService } from './sale.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('sale')
export class SaleController {
    constructor(private readonly saleService:SaleService){}

    @Get("daily/:startDate/:endDate")
    async findDailySale(@Param('startDate') startDate: string,@Param('endDate') endDate: string){
        return this.saleService.findDailySale(startDate,endDate)
    }

    @Get("monthly/:startDate/:endDate")
    async findMonthSale(@Param('startDate') startDate: string,@Param('endDate') endDate: string){
        return this.saleService.findMonthSale(startDate,endDate)
    }

    
    @Get("yearly/:startDate/:endDate")
    async findYearlySale(@Param('startDate') startDate: string,@Param('endDate') endDate: string){
        return this.saleService.findYearlySale(startDate,endDate)
    }
    @Get("product/:pieStartDate/:pieEndDate")
    async findProductSale(@Param('pieStartDate') startDate: string,@Param('pieEndDate') endDate: string){
        return this.saleService.findProductSale(startDate,endDate)
    }



}
