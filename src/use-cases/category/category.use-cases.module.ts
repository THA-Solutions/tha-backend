import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { CategoryService } from './category.use-case';
import { CategoryFactoryService } from './category-factory.service';
import { CategoryRepository } from 'src/frameworks/data-services/database';
import { CategoryController } from 'src/controllers/category.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFactoryService, CategoryRepository],
  exports: [CategoryService, CategoryFactoryService],
})
export class CategoryUseCasesModule {}
