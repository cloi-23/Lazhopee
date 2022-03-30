// import { PaginationDto } from './../common/pagination/pagination-dto';
import { 
  Body,
  Request, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post, 
  Query,
  UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../manager/auth/guard/jwt-auth.guard';
import { CustomerLocalAuthGuard } from './auth/guard/local-auth.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
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
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
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
  async validateCustomer(@Body() login  , @Body() pass , @Request() req) {    
    return await this.customerService.validateCustomer(login.username, pass.password);
    // let user = req.user.data
    // let credentials = { token:token.access_token,
    //   id: user.id,
    //   status: user.status,
    //  }  
    // console.log(token);
    //   return token  
  }
}
