import { Injectable } from '@nestjs/common';
import { MailFactoryService } from './mail-factory.service';
import { IDataServices } from 'src/core/abstracts';
import { InviteMailDto } from 'src/core/dto/request/mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { RecoveryMail } from 'src/core/entities/mail.entity';

@Injectable()
export class MailService {
  constructor(
    private mailFactoryService: MailFactoryService,
    private mailer: MailerService,
  ) {}

  async sendMail(inviteMailDto: InviteMailDto) {
    const mail = await this.mailFactoryService.inviteMail(inviteMailDto);

    const options = {
      to: process.env.TARGET_MAIL,
      from: mail.email,
      subject: mail.subject,
      html: mail.message,
    };
    
    await this.mailer.sendMail(options);
    return;
  }

  async passResetMail(passResetMailDto: RecoveryMail) {
    const mail = await this.mailFactoryService.passResetMail(passResetMailDto);

    const options = {
      to: mail.email,
      from: `THA Solutions [Suporte]<${process.env.MAIL_USER}>`,
      subject: mail.subject,
      html: mail.message,
    };

    await this.mailer.sendMail(options);

    return;
  }
}
