import { Module } from '@nestjs/common';
import { CompanyService } from './company.use-case';
import { CompanyFactoryService } from './company-factory.service';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { CompanyController } from 'src/controllers/company.controller';
import {
  CompanyRepository,
  ImageRepository,
} from 'src/frameworks/data-services/database';
import { ImageUseCasesModule } from '../image/image.use-cases.module';

@Module({
  imports: [PrismaModule, ImageUseCasesModule],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyFactoryService,
    CompanyRepository,
    ImageRepository,
  ],
  exports: [CompanyService, CompanyFactoryService],
})
export class CompanyUseCasesModule {}
