// import { PaginationDto } from './../common/pagination/pagination-dto';
import { LoginDriveDto } from './dto/login-driver.dto';
import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post, 
  Query,
  UseGuards} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from '../manager/auth/guard/jwt-auth.guard';
import { LocalStrategy } from './auth/strategy/local.strategy';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

@UseGuards(JwtAuthGuard)
  @Get()
  findAll(/* @Query() pagination: PaginationDto */) {
    return this.driverService.findAll(/* pagination */);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(id)
  }

  @Post("add")
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);  
  }
  @UseGuards(LocalStrategy)
  @Post('/login')
  async validateManager(@Body() login) { 
    return await this.driverService.validateDriver(login)
    //  await this.managerService.validateManager(login);
    // let manager = req.user.data
    // let credentials = { token:token.access_token,
    //   id: manager.id,
    //   status: manager.status,
    //  }  
    // return token
  } 
}
