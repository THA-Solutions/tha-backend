import { Module } from '@nestjs/common';

import { RoleService } from './role.use-case';
import { RoleFactoryService } from './role-factory.service';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { RoleController } from 'src/controllers/role.controllet';
import { RoleRepository } from 'src/frameworks/data-services/database';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [RoleService, RoleFactoryService, RoleRepository],
  exports: [RoleService, RoleFactoryService],
})
export class RoleUseCasesModule {}
