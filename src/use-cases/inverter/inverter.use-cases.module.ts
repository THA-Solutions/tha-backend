import { Module } from '@nestjs/common';
import { InverterController } from 'src/controllers/inverter.controller';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { InverterService } from './inverter.use-case';
import { InverterFactoryService } from './inverter-factory.service';
import { InverterRepository } from 'src/frameworks/data-services/database';

@Module({
  imports: [PrismaModule],
  controllers: [InverterController],
  providers: [InverterService, InverterFactoryService, InverterRepository],
  exports: [InverterService, InverterFactoryService],
})
export class InverterUseCasesModule {}
