import { Module } from '@nestjs/common';
import { InverterController } from 'src/controllers/inverter.controller';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { InverterService } from './inverter.use-case';
import { InverterFactoryService } from './inverter-factory.service';
import {
  CompanyRepository,
  ImageRepository,
  InverterRepository,
} from 'src/frameworks/data-services/database';
import { ImageUseCasesModule } from '../image/image.use-cases.module';

@Module({
  imports: [PrismaModule, ImageUseCasesModule],
  controllers: [InverterController],
  providers: [
    InverterService,
    InverterFactoryService,
    InverterRepository,
    CompanyRepository,
    ImageRepository,
  ],
  exports: [InverterService, InverterFactoryService],
})
export class InverterUseCasesModule {}
