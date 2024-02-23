import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountTokenUseCasesModule } from './use-cases/account-token/account-token.use-cases.module';
import { ArticleUseCasesModule } from './use-cases/article/article.use-cases.module';
import { AuthUseCasesModule } from './use-cases/auth/auth.use-cases.module';
import { CategoryUseCasesModule } from './use-cases/category/category.use-cases.module';
import { CompanyUseCasesModule } from './use-cases/company/company.use-cases.module';
import { ImageUseCasesModule } from './use-cases/image/image.use-cases.module';
import { InverterUseCasesModule } from './use-cases/inverter/inverter.use-cases.module';
import { ReviewUseCasesModule } from './use-cases/review/review.use-cases.module';
import { RoleUseCasesModule } from './use-cases/role/role.use-cases.module';
import { TeamUseCasesModule } from './use-cases/team/team.use-cases.module';
import { UserUseCasesModule } from './use-cases/user/user.use-cases.module';
import { ConfigModule } from '@nestjs/config';
import PrismaService from './frameworks/data-services/database/prisma.service';
import { PrismaModule } from './frameworks/data-services/database/prisma.module';

@Module({
  imports: [
    AccountTokenUseCasesModule,
    ArticleUseCasesModule,
    AuthUseCasesModule,
    CategoryUseCasesModule,
    CompanyUseCasesModule,
    ImageUseCasesModule,
    InverterUseCasesModule,
    ReviewUseCasesModule,
    RoleUseCasesModule,
    TeamUseCasesModule,
    UserUseCasesModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ConfigModule],
})
export class AppModule {}
