import { Injectable } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from 'src/core/dto';

@Injectable()
export class ArticleFactoryService {
  constructor() {}

  async createNewArticleFactory(createArticleDto: CreateArticleDto) {}

  async updateArticleFactory(updateArticleDto: UpdateArticleDto) {}
}
