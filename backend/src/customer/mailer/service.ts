import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

public sendConfirmationEmail(name, email, confirmationCode): void {  
  this.mailerService.sendMail({
    to: email,
    from: 'noreply@nestjs.com',
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/customer/confirm/${confirmationCode}> Click here</a>
        </div>`,
      }).catch(err => console.log(err));
    }
}