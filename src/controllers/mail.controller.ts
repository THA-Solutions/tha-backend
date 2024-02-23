import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from 'src/use-cases/mail/mail.use-case';
import { InviteMailDto } from 'src/core/dto/request/mail.dto';
import { Public } from 'src/config/decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('send')
  @Public()
  async sendEmail(@Body() inviteMailDto: InviteMailDto) {
    return await this.mailService.sendMail(inviteMailDto);
  }
}
