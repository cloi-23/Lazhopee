// import { PaginationDto } from './../common/pagination/pagination-dto';
import { LoginManagerDto } from './dto/login-manager.dto';
import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, 
  Patch, 
  Post, 
  Query,
  Res,
  UseGuards} from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerService } from './manager.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard'
import { Response } from 'express'
import { ManagerLocalStrategy } from './auth/strategy/local.strategy';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  findAll(/* @Query() pagination: PaginationDto */) {
    return this.managerService.findAll(/* pagination */);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(id)
  }

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(id, updateManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(id);  
  }
  @UseGuards(ManagerLocalStrategy)
  @Post('/login')
  async validateManager(@Body() login, @Res({ passthrough: true }) response: Response) { 
    const data = await this.managerService.validateManager(login)
    let token = data.access_token
    const CookieOptions = {
      httpOnly: true,
      secure: true
    }
    
    response.cookie('jwt', token,  CookieOptions)
     
    //  await this.managerService.validateManager(login);
    // let manager = req.user.data
    // let credentials = { token:token.access_token,
    //   id: manager.id,
    //   status: manager.status,
    //  }  
    return data
  } 
}
