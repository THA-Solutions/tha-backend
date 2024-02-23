import { Module } from '@nestjs/common';
import { TeamController } from 'src/controllers/team.controller';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { TeamService } from './team.use-case';
import { TeamFactoryService } from './team-factory.service';
import { ImageUseCasesModule } from '../image/image.use-cases.module';

@Module({
  imports: [PrismaModule, ImageUseCasesModule],
  controllers: [TeamController],
  providers: [TeamService, TeamFactoryService],
  exports: [TeamService, TeamFactoryService],
})
export class TeamUseCasesModule {}
