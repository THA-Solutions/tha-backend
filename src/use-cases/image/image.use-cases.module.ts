import { Module } from '@nestjs/common';
import { ImageController } from 'src/controllers/image.controller';

import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import { ImageService } from './image.use-case';
import { ImageFactoryService } from './image-factory.service';
import { ImageRepository } from 'src/frameworks/data-services/database';
import { CloudinaryModule } from 'src/frameworks/data-services/image-upload/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [ImageController],
  providers: [ImageService, ImageFactoryService, ImageRepository],
  exports: [ImageService, ImageFactoryService],
})
export class ImageUseCasesModule {}
