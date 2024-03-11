import { Module } from '@nestjs/common';
import { ArticleController } from 'src/controllers/article.controller';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import PrismaService from 'src/frameworks/data-services/database/prisma.service';
import { ArticleService } from './article.use-case';
import { ArticleFactoryService } from './article-factory.service';
import {
  ArticleRepository,
  CategoryRepository,
  ImageRepository,
} from 'src/frameworks/data-services/database';
import { ImageUseCasesModule } from '../image/image.use-cases.module';
import { CloudinaryModule } from 'src/frameworks/data-services/image-upload/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, ImageUseCasesModule, CloudinaryModule],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    ArticleFactoryService,
    ArticleRepository,
    CategoryRepository,
    ImageRepository,
    PrismaModule,
  ],
  exports: [ArticleService, ArticleFactoryService],
})
export class ArticleUseCasesModule {}
