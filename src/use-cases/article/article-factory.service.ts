import { Injectable } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from 'src/core/dto';
import { Article, Image } from 'src/core/entities';
import {
  CategoryRepository,
  ImageRepository,
} from 'src/frameworks/data-services/database';
import { ImageService } from '../image/image.use-case';
import { IUploadImageServices } from 'src/core/abstracts';

@Injectable()
export class ArticleFactoryService {
  constructor(
    private categoryService: CategoryRepository,
    private imageService: ImageService,
    private uploadImageService: IUploadImageServices,
  ) {}

  async createNewArticle(createArticleDto: CreateArticleDto) {
    const newArticle = new Article();
    newArticle.title = createArticleDto.title;

    newArticle.subTitle = createArticleDto.subTitle;

    newArticle.content = createArticleDto.content;

    newArticle.category = await this.categoryHandler(
      createArticleDto.category as unknown as string,
    );

    newArticle.author = createArticleDto.author;

    if (createArticleDto.image) {
      newArticle.image = createArticleDto.image as unknown as Image[];
    }

    return newArticle;
  }

  async updateArticle(updateArticleDto: UpdateArticleDto) {
    const updatedArticle = new Article();
    if (updateArticleDto) {
      updatedArticle.title = updateArticleDto.title;
    }

    if (updateArticleDto.subTitle) {
      updatedArticle.subTitle = updateArticleDto.subTitle;
    }

    if (updateArticleDto.content) {
      updatedArticle.content = updateArticleDto.content;
    }

    if (updateArticleDto.category) {
      updatedArticle.category = await this.categoryHandler(
        updateArticleDto.category as unknown as string,
      );
    }

    if (updateArticleDto.author) {
      updatedArticle.author = updateArticleDto.author;
    }

    if (updateArticleDto.image) {
      updatedArticle.image = updateArticleDto.image;
    }

    return updatedArticle;
  }

  async categoryHandler(name: string) {
    const category = await this.categoryService.findByField('name', name);

    const defaultCategory = {
      Tecnologia: 'Tecnologia',
      Solar: 'Solar',
      Curiosidades: 'Curiosidades',
      Outros: 'Outros',
    };

    if (!category) {
      if (defaultCategory[name]) {
        return this.categoryService.create({
          name: defaultCategory[name],
        });
      }
      throw new Error('Category not found');
    }

    return category;
  }
}
