import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '../../controllers/auth.controller';
import { ConfigService } from '@nestjs/config';
import { RoleService } from './role.service';
import { UserUseCasesModule } from '../user/user.use-cases.module';

@Module({
  imports: [UserUseCasesModule],
  controllers: [AuthController],
  providers: [AuthService, RoleService, ConfigService],
  exports: [RoleService],
})
export class AuthUseCasesModule {}
