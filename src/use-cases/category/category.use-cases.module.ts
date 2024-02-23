import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { CategoryService } from './category.use-case';
import { CategoryFactoryService } from './category-factory.service';
import { CategoryRepository } from 'src/frameworks/data-services/database';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [CategoryService, CategoryFactoryService, CategoryRepository],
  exports: [CategoryService, CategoryFactoryService],
})
export class CategoryUseCasesModule {}
