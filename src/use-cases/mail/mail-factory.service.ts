import { Injectable } from '@nestjs/common';
import { InviteMailDto } from 'src/core/dto/request/mail.dto';
import { Mail, RecoveryMail } from 'src/core/entities/mail.entity';

@Injectable()
export class MailFactoryService {
  constructor() {}

  async inviteMail(inviteMailDto: InviteMailDto) {
    const mail = new Mail();

    return mail;
  }

  async passResetMail(passResetMailDto: RecoveryMail) {
    const mail = new Mail();

    return mail;
  }
}
