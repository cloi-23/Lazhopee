import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Manager } from 'src/manager/entities/manager.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginManagerDto } from 'src/manager/dto/login-manager.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(@InjectModel(Manager.name) private managerModel: Model<Manager>,
       private jwtTokenService: JwtService){}

       async validateUser(loginUser: LoginManagerDto, pass): Promise<any> { 
        try {         
          const user = await this.managerModel.findOne({ username: loginUser })        
          const isMatch = await bcrypt.compare(pass, user.password)
          
          if(isMatch) {
            return {username: user.username, id: user['_id'],status:HttpStatus.CREATED}
          }
          throw new HttpException('',HttpStatus.UNAUTHORIZED)
        } catch(e) {
           throw new HttpException('username or password not exist!', HttpStatus.UNAUTHORIZED)
        }
      }

     async loginWithCredentials(user: any) {
        const payload = { username: user.username, sub: user.id };                
        return {
            access_token: this.jwtTokenService.sign(payload),
        };
    }
}