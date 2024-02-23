import { Module } from '@nestjs/common';
import { ArticleController } from 'src/controllers/article.controller';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import PrismaService from 'src/frameworks/data-services/database/prisma.service';
import { ArticleService } from './article.use-case';
import { ArticleFactoryService } from './article-factory.service';

@Module({
  imports: [PrismaModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleFactoryService, PrismaModule],
  exports: [ArticleService, ArticleFactoryService],
})
export class ArticleUseCasesModule {}
