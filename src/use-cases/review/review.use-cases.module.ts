import { Module } from '@nestjs/common';
import { ReviewService } from './review.use-case';
import { ReviewController } from '../../controllers/review.controller';

import { ReviewFactoryService } from './review-factory.service';
import { PrismaModule } from 'src/frameworks/data-services/database/prisma.module';
import {
  InverterRepository,
  ReviewRepository,
  UserRepository,
} from 'src/frameworks/data-services/database';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    ReviewFactoryService,
    ReviewRepository,
    UserRepository,
    InverterRepository,
  ],
  exports: [ReviewService, ReviewFactoryService],
})
export class ReviewUseCasesModule {}
