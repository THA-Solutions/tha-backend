import { Injectable } from '@nestjs/common';
import { CreateReviewDto, UpdateReviewDto } from '../../core/dto';
import { ReviewFactoryService } from './review-factory.service';
import { IDataServices, IGenericRepository } from '../../core/abstracts';
import { Review } from 'src/core/entities';

@Injectable()
export class ReviewService {
  constructor(
    private reviewFactoryService: ReviewFactoryService,
    private dataService: IGenericRepository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const review =
      await this.reviewFactoryService.createNewReview(createReviewDto);

    return this.dataService.create(review);
  }

  async findAll(id_inverter: string) {
    return await this.dataService.findAll(id_inverter);
  }

  async findOne(id: string) {
    return await this.dataService.findById(id);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.dataService.findById(id);

    if (!review) {
      throw new Error('Review doesn´t exists');
    }

    const updateReview =
      await this.reviewFactoryService.updateReview(updateReviewDto);

    return await this.dataService.update(id, updateReview);
  }

  async remove(id: string) {
    const review = await this.dataService.findByField('id', id);

    if (!review) {
      throw new Error('Review doesn´t exists');
    }

    return this.dataService.delete(id);
  }
}
