import { IncomeStatementService } from './income-statement.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('incomeStatement')
export class IncomeStatementController {
constructor(private readonly incomeStatementService:IncomeStatementService){}

    @Get(":startDate/:endDate")
    async findAll(@Param('startDate') startDate: string,@Param('endDate') endDate: string){
        return this.incomeStatementService.findAll(startDate,endDate)
    }
}
