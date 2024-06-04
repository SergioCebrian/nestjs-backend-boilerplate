import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token = '1224556') {
    const url = `example.com/auth/confirm?token=${token}`;
    await this.mailerService
      .sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        // text: 'Test content',
        // html: '<b>Bold text</b>',
        // template: __dirname + '/index', // The `.pug` or `.hbs` extension is appended automatically.
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './index', // either change to ./confirm or rename confirm.html to confirmation.html
        context: {
          name: user.name,
          url,
        },
      })
      .then((success) => {
        console.log('Mail success: ', success);
      })
      .catch((err) => {
        console.error('Mail error: ', err);
      });
  }
}
