// import { PaginationDto } from './../common/pagination/pagination-dto';
import { 
  Body,
  Req,
  Res, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post, 
  Query,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express'
import { JwtAuthGuard } from '../customer/auth/guard/jwt-auth.guard';
import { CustomerLocalAuthGuard } from './auth/guard/local-auth.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginCustomerDto } from './dto/login-cutomer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(/* @Query() pagination: PaginationDto */) {
    return this.customerService.findAll(/* pagination */)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id)
  }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto, @Res() res: Response) {
   await this.customerService.create(createCustomerDto);
    res.send({
      message:
        "User was registered successfully! Please check your email",
   });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);  
  }
  @UseGuards(CustomerLocalAuthGuard)
  @Post('/login')
  async validateCustomer(@Body() login, @Res() res: Response) { 
   const user = await this.customerService.validateCustomer(login.username, login.password);
   const token = await this.customerService.loginCustomerWithCredentials(user)               
   if (user.status != "Active") {
    return res.status(401).send({
      message: "Pending Account. Please Verify Your Email!",
    });
  }
    res.send({ id: user['_id'], status:'ok', ...token}); 
  }

  
  @Get('/confirm/:id')
  async findNewOne(@Param('id') id: string, @Res() res: Response) {
    this.customerService.newOne(id)
    res.send('<h1> Congrats! </h1>')
  }
}
