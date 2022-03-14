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
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(/*@Query() pagination: PaginationDto*/) {
    return this.orderService.findAll(/* pagination */);
  }

  @Get('customer/:userId')
  findAllOrderByCust(@Param('userId') id: string) {
    return this.orderService.findAllOrderByCust(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id)
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Patch('status/')
  update(@Body() updateOrderDto: UpdateOrderDto) {  
  return this.orderService.update(updateOrderDto);
  }

  @Delete('customer/:userId')
  RemoveAllOrderByCust(@Param('userId') id: string) {
    return this.orderService.RemoveAllOrderByCust(id);  
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);  
  }
}

