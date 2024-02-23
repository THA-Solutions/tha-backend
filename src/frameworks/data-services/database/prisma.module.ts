import { Module } from '@nestjs/common';
import PrismaService from './prisma.service';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { AccountTokenRepository } from './account-token-repository';
import { ArticleRepository } from './article-repository';
import { CategoryRepository } from './category-repository';
import { ImageRepository } from './image-repository';
import { CompanyRepository } from './company-repository';
import { InverterRepository } from './inverter-repository';
import { ReviewRepository } from './review-repository';
import { RoleRepository } from './role-repository';
import { TeamRepository } from './team-repository';
import { UserRepository } from './user-repository';
import { AccountToken, User } from 'src/core/entities';

@Module({
  providers: [
    PrismaService,
    {
      provide: IGenericRepository<AccountToken>,
      useClass: AccountTokenRepository,
    },
    {
      provide: IGenericRepository,
      useClass: ArticleRepository,
    },
    {
      provide: IGenericRepository,
      useClass: CategoryRepository,
    },
    {
      provide: IGenericRepository,
      useClass: CompanyRepository,
    },
    {
      provide: IGenericRepository,
      useClass: ImageRepository,
    },
    {
      provide: IGenericRepository,
      useClass: InverterRepository,
    },
    {
      provide: IGenericRepository,
      useClass: ReviewRepository,
    },
    {
      provide: IGenericRepository,
      useClass: RoleRepository,
    },
    {
      provide: IGenericRepository,
      useClass: TeamRepository,
    },
    {
      provide: IGenericRepository<User>,
      useClass: UserRepository,
    },
  ],
  exports: [PrismaService, IGenericRepository],
  imports: [],
})
export class PrismaModule {}
