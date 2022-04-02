import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './entity/expense.enitity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
@Injectable()
export class ExpenseService {
constructor(
    @InjectModel(Expense.name)
    private readonly expenseModel:Model<Expense>
){}

    async findAll(/* pagination: PaginationDto */) {
        const expensList = await this.expenseModel.find()/* .limit(limit).skip(page * limit) */
        return expensList
      }
      async findOne(id: string) {
        try {
          const expense = await this.expenseModel.findOne({ _id: id }).exec();
          if (!expense) {
            throw new NotFoundException(`Expense #${id} not found`);
          }
          return expense
        } catch (error) {
          throw new NotFoundException(`Expense #${id} not found`);
  
        }   
      }

      async create(createExpenseDto: CreateExpenseDto) {
        const expense = await this.expenseModel.create(createExpenseDto)
        return expense.save();
      }
    
      async update(id: string, updateExpenseDto: UpdateExpenseDto) { 
        await this.findOne(id)     
        await this.expenseModel
        .findOneAndUpdate({ _id: id }, { $set: updateExpenseDto }, { new: true })
        .exec();
        }

      async remove(id: string) {
        await this.findOne(id)
        const expense = await this.expenseModel.findOne({ _id: id }).exec();
        return expense.remove();
      }
  
    
}
