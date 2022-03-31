// import { PaginationDto } from './../common/pagination/pagination-dto';
import { LoginCustomerDto } from './dto/login-cutomer.dto';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './entities/customer.entity';
import { Model } from 'mongoose'
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt'
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @Inject('JwtSecret1Service') private jwtSecret1Module  ) {}

    findAll(/* pagination: PaginationDto */) {
/*       const {limit ,offset} = pagination
      const page = offset - 1 */
      return this.customerModel.find()/* .limit(limit).skip(page * limit) */
    }
  
    async findOne(id: string) {
      try{
          const customer = await this.customerModel.findOne({ _id: id }).exec()
            if (!customer) {
              throw new NotFoundException(`Customer #${id} not found`);
            }
            return customer 
      }
       catch(err){
        throw new NotFoundException(`Customer #${id} not found`); 
      }
    }
    
    async create(createCustomerDto: CreateCustomerDto) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(createCustomerDto.password, salt)
      const user = await this.customerModel.findOne({ username: createCustomerDto.username.toLocaleLowerCase() })
      const name = await this.customerModel.findOne({ name: createCustomerDto.name })
      if (user || name) {
        throw new HttpException('username already exist!', HttpStatus.CONFLICT)
      }
      let lowerCase = createCustomerDto.username.toLocaleLowerCase()
      let username = lowerCase.replace(/\s/g, '');
      const data = {
        ...createCustomerDto,
        username: username,
        password: hashPassword
        
      }
      const customer = new this.customerModel(data);
      return customer.save()
    }
  
    async validateCustomer(login,pass): Promise<any> {
      
      try {
        const user = await this.customerModel.findOne({ username: login.toLocaleLowerCase() }).exec();
        
        const isMatch = await bcrypt.compare(pass, user.password)

        if (isMatch) {   

          const token = await this.loginCustomerWithCredentials(user)               
          return { id: user['_id'], status:'ok', ...token}
        }
        
        throw new HttpException('username or password not exist!',HttpStatus.UNAUTHORIZED)
      } catch (err){
        console.log(err);
        
        throw new HttpException('username or password not exist!',HttpStatus.UNAUTHORIZED)       
      }
    }
  
    async update(id: string, updateCustomerDto: UpdateCustomerDto) {
      try {
        const customer = await this.customerModel
        .findOneAndUpdate({ _id: id }, { $set: updateCustomerDto }, { new: true })
        if(!customer) {
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

    async loginCustomerWithCredentials(user: any) {
      const payload = { username: user.username, sub: user.id };                
      return {
        access_token: this.jwtSecret1Module.sign(payload),
      };
  }

}
