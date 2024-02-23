import { Injectable } from '@nestjs/common';
import { ArticleFactoryService } from './article-factory.service';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { Article } from 'src/core/entities';

@Injectable()
export class ArticleService {
  constructor(
    private articleFactoryService: ArticleFactoryService,
    private dataService: IGenericRepository<Article>,
  ) {}

  async create(createArticleDto: any, imageFile: any[]) {
    return;
  }

  async findAll() {
    return this.dataService.findAll();
  }

  async findOne(id: string) {
    return this.dataService.findById(id);
  }

  async update(id: string, updateArticleDto: any) {
    return this.dataService.update(id, updateArticleDto);
  }

  async remove(id: string) {
    return this.dataService.delete(id);
  }
}
