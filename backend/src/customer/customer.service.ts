// import { PaginationDto } from './../common/pagination/pagination-dto';
import { LoginCustomerDto } from './dto/login-cutomer.dto';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './entities/customer.entity';
import { Model } from 'mongoose'
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt'
import { MailService } from './mailer/service'

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @Inject('JwtSecret1Service') private jwtSecret1Module,
    @Inject(MailService) private mailService  ) {}

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
      const email = await this.customerModel.findOne({ email: createCustomerDto.email })

      if (user || name) {
        throw new HttpException('username already exist!', HttpStatus.CONFLICT)
      }
      if (email) {
        throw new HttpException('email already used!', HttpStatus.CONFLICT)
      }
      
      let lowerCase = createCustomerDto.username.toLocaleLowerCase()
      let username = lowerCase.replace(/\s/g, '');
            const payload = { username: username };                
      const token = await this.jwtSecret1Module.sign(payload, {
        secret: process.env.SECRET_KEY,
        expiresIn: '10s'
      })
      const data = {
        ...createCustomerDto,
        username: username,
        password: hashPassword,
        confirmationCode: token     
      }
      const customer = new this.customerModel(data);
      
      this.mailService.sendConfirmationEmail(createCustomerDto.name, createCustomerDto.email, data.confirmationCode);
      
      return customer.save()
    }
  
    async validateCustomer(login, pass): Promise<any> {
      
      try {
        const user = await this.customerModel.findOne({ username: login.toLocaleLowerCase() }).exec();      
        const isMatch = await bcrypt.compare(pass, user.password)
        if (isMatch) {            
          return user
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

    async newOne(id: string) {
      const confirmationCode = await this.customerModel.findOne({ confirmationCode: id })
        this.update(confirmationCode._id, {status: 'Active'})    
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
