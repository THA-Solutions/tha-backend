import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.use-case';
import { MailFactoryService } from './mail-factory.service';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { MailController } from 'src/controllers/mail.controller';

//@Module({
//  imports: [
//    MailerModule.forRoot({
//      transport: {
//        host: process.env.MAIL_HOST,
//        port: process.env.MAIL_PORT,
//        secure: true,
//        auth: {
//          user: process.env.MAIL_USER,
//          pass: process.env.MAIL_PASSWORD,
//        }
//      },
//      
//    }),
//    PrismaModule,
//  ],
//  controllers: [MailController],
//  providers: [MailService, MailFactoryService],
//  exports: [MailService, MailFactoryService],
//})
//export class MailUseCasesModule {}
