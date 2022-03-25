import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard'

@Controller()
export class AuthController {

  constructor(private authService: AuthService){}
  
  @UseGuards(AuthGuard('local'))
  @Post('auth')
  async login(@Request() req, /* @Response() res */) {
    let token = this.authService.loginWithCredentials(req);
    // res.cookie('access-Token', token, {
    //   sameSite: 'strict',
    //   httpOnly: false,
    //   secure: true
    // });
    // console.log(req);
    
    return token
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('user-info')
  // getUserInfo(@Body() req) {
    
  //   return req
  // }
}