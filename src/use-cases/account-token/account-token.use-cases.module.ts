import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { AccountTokenService } from './account-token.use-case';
import { AccountTokenFactoryService } from './account-token-factory.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [AccountTokenService, AccountTokenFactoryService],
  exports: [AccountTokenService, AccountTokenFactoryService],
})
export class AccountTokenUseCasesModule {}
