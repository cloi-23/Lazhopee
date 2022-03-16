// import { PaginationDto } from './../common/pagination/pagination-dto';
import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post, 
  Query} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { updateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(/*@Query() pagination: PaginationDto*/) {
    return this.orderService.findAll(/* pagination */);
  }

  @Get('customer/:userId')
  pendingOrderByCust(@Param('userId') id: string) {
    return this.orderService.pendingOrderByCust(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id)
  }
  
  @Get('/product/:id')
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

