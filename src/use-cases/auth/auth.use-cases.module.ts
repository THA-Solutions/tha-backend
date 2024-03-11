import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '../../controllers/auth.controller';
import { ConfigService } from '@nestjs/config';
import { RoleService } from './role.service';
import { UserUseCasesModule } from '../user/user.use-cases.module';
import { RoleGuard } from './role.guard';
import { RoleRepository } from 'src/frameworks/data-services/database';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';

@Module({
  imports: [UserUseCasesModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, RoleService, ConfigService, RoleRepository],
  exports: [RoleService],
})
export class AuthUseCasesModule {}
