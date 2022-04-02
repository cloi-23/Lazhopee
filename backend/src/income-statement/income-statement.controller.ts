import { IncomeStatementService } from './income-statement.service';
import { Controller, Get, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../manager/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('incomeStatement')
export class IncomeStatementController {
constructor(private readonly incomeStatementService:IncomeStatementService){}

    @Get()
    async findAll(@Query('startDate') startDate: string,@Query('endDate') endDate: string){
        try {
            return this.incomeStatementService.findAll(startDate,endDate)
        } catch (error) {
            throw new NotFoundException(`No Income Statement Record on ${startDate}  - ${endDate}`);
          }
        
    }
}
