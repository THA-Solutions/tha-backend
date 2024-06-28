import { Module } from '@nestjs/common';
import { UserService } from './user.use-case';
import { UserController } from '../../controllers/user.controller';
import { UserFactoryService } from './user-factory.service';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { HashService } from '../auth/hash-repository';
import { ImageUseCasesModule } from '../image/image.use-cases.module';
//import { MailUseCasesModule } from '../mail/mail.use-cases.module';
import { ConfigService } from '@nestjs/config';
import {
  AccountTokenRepository,
  CompanyRepository,
  ImageRepository,
  RoleRepository,
  UserRepository,
} from 'src/frameworks/data-services/database';

@Module({
  imports: [
    PrismaModule,
    ImageUseCasesModule,
    //MailUseCasesModule,
    //MailUseCasesModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserFactoryService,
    HashService,
    ConfigService,
    UserRepository,
    CompanyRepository,
    RoleRepository,
    ImageRepository,
    AccountTokenRepository,
  ],
  exports: [UserService, UserFactoryService],
})
export class UserUseCasesModule {}
