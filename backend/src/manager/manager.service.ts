// import { PaginationDto } from './../common/pagination/pagination-dto';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Manager } from './entities/manager.entity';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { LoginManagerDto } from './dto/login-manager.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager.name) private readonly managerModel: Model<Manager>,
    @Inject('JwtSecret2Service') private jwtSecret2) {}

    findAll(/* pagination: PaginationDto */) {
/*       const { limit , offset } = pagination
      const page = offset - 1 */
      return this.managerModel.find()/* .limit(limit).skip(page * limit) */
    }
  
    async findOne(id: string) {      
      try {
        const manager = await this.managerModel.findOne({ _id: id }).exec();
        if (!manager) {
          throw new NotFoundException(`Manager #${id} not found`);
        }
        return manager;
      } catch (error) {
        throw new NotFoundException(`Manager #${id} not found`);
      }
     
    }
  
    async create(createManagerDto: CreateManagerDto) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(createManagerDto.password, salt)
      const user = await this.managerModel.findOne({ username: createManagerDto.username }).exec();

      if (user) {
        throw new HttpException('username already exist!', HttpStatus.CONFLICT)
      }
      const data = {
        ...createManagerDto,
        password: hashPassword
      }
      const customer = new this.managerModel(data);
 
      return customer.save()
    }
  
    async validateManager(login): Promise<any> {      
      try {
        const user = await this.managerModel.findOne({ username: login.username.toLocaleLowerCase() }).exec();
        
        const isMatch = await bcrypt.compare(login.password, user.password)
        if (isMatch) {   
          const token = await this.loginWithCredentials(user)          
          return { id: user['_id'], status:'ok', ...token}
        }
        throw new HttpException('username or password not exist!',HttpStatus.UNAUTHORIZED)
      } catch (err){
        throw new HttpException('username or password not exist!',HttpStatus.UNAUTHORIZED)       
      }
    }
  
    async update(id: string, updateManagerDto: UpdateManagerDto) {
      try {
        const manager = await this.managerModel
        .findOneAndUpdate({ _id: id }, { $set: updateManagerDto }, { new: true })
        if(!manager) {
        throw new HttpException('id does not exist!', HttpStatus.NOT_FOUND)
        }
        return 'success'
      } catch (e) {
        throw new HttpException('id does not exist!', HttpStatus.NOT_FOUND)
      }   
    }
  
    async remove(id: string) {
      const product = await this.findOne(id)
      return product.remove();
    }
    
    async loginWithCredentials(user: any) {
      const payload = { username: user.username, sub: user.id };                
      return {
          access_token: this.jwtSecret2.sign(payload),
      };
  }
}
