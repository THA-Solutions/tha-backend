import { Injectable } from '@nestjs/common';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { CreateReviewDto, UpdateReviewDto } from 'src/core/dto';
import { Review, User } from 'src/core/entities';
import {
  InverterRepository,
  ReviewRepository,
  UserRepository,
} from 'src/frameworks/data-services/database';

@Injectable()
export class ReviewFactoryService {
  constructor(
    private reviewService: ReviewRepository,
    private userService: UserRepository,
    private inverterService: InverterRepository,
  ) {}

  async createNewReview(createReviewDto: CreateReviewDto) {
    const newReview = new Review();

    newReview.comment = createReviewDto.comment;

    newReview.value = createReviewDto.value;

    newReview.id_user = await this.userHandler(createReviewDto.id_user);

    newReview.id_inverter = await this.inverterHandler(
      createReviewDto.id_inverter,
    );

    return newReview;
  }

  async updateReview(updateReviewDto: UpdateReviewDto) {
    const updatedReview = new Review();

    if (updateReviewDto.comment) {
      updatedReview.comment = updateReviewDto.comment;
    }

    if (updateReviewDto.value) {
      updatedReview.value = updateReviewDto.value;
    }
    return updatedReview;
  }

  async userHandler(id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.id;
  }

  async inverterHandler(id: string) {
    const inverter = await this.inverterService.findById(id);
    if (!inverter) {
      throw new Error('Inverter not found');
    }
    return inverter.id;
  }
}
