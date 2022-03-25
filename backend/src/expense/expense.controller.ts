import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseService } from './expense.service';
import { Body, Controller, Delete, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService:ExpenseService){}

    @Get()
    findAll(/*@Query() pagination: PaginationDto*/) {
      return this.expenseService.findAll(/* pagination */);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.expenseService.findOne(id)
    }
 
  
    @Post("add")
    create(@Body() createExpenseDto: CreateExpenseDto) {
      return this.expenseService.create(createExpenseDto);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {   
    return this.expenseService.update(id, updateExpenseDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.expenseService.remove(id);  
    }
}
