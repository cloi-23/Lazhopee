// import { PaginationDto } from './../common/pagination/pagination-dto';
import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post, 
  Query,
  Req,
  Res,
  UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../manager/auth/guard/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { updateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
<<<<<<< HEAD
  findAll(/*@Req() req @Query() pagination: PaginationDto*/) {
=======
  findAll(/*@Query() pagination: PaginationDto*/) {    
>>>>>>> 84666f7c4139c57aa92f87186b64f6f065b95206
    return this.orderService.findAll(/* pagination */);
  }

  @Get('customer/:userId')
  customerOrder(@Param('userId') id: string) {
    return this.orderService.customerOrder(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id)
  }
  @Get('/details/:id')
  findOrder(@Param('id') id: string) {
    return this.orderService.findOrder(id)
  }


  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: updateOrderDto) {   
  return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);  
  }
}

