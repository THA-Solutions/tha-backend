import { Injectable } from '@nestjs/common';
import { InviteMailDto } from 'src/core/dto/request/mail.dto';
import { Mail, RecoveryMail } from 'src/core/entities/mail.entity';

@Injectable()
export class MailFactoryService {
  constructor() {}

  async inviteMail(inviteMailDto: InviteMailDto) {
    const mail = new Mail();

    mail.company = inviteMailDto.company;

    mail.email = inviteMailDto.email;

    mail.firstName = inviteMailDto.firstName;

    mail.lastName = inviteMailDto.lastName;

    mail.subject = inviteMailDto.subject || '';

    mail.message = inviteMailDto.message || '';

    return mail;
  }

  async passResetMail(passResetMailDto: RecoveryMail) {
    const mail = new Mail();

    mail.email = passResetMailDto.email;

    mail.subject = 'Password reset request';

    mail.message = passResetMailDto.message;

    mail.firstName = passResetMailDto.firstName;

    mail.lastName = passResetMailDto.lastName;

    mail.company = passResetMailDto.company; 

    return mail;
  }
}
