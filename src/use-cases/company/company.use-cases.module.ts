import { Module } from '@nestjs/common';
import { CompanyService } from './company.use-case';
import { CompanyFactoryService } from './company-factory.service';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { CompanyController } from 'src/controllers/company.controller';
import { CompanyRepository } from 'src/frameworks/data-services/database';

@Module({
  imports: [PrismaModule],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyFactoryService, CompanyRepository],
  exports: [CompanyService, CompanyFactoryService],
})
export class CompanyUseCasesModule {}
