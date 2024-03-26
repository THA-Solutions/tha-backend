import { Injectable } from '@nestjs/common';
import { ArticleFactoryService } from './article-factory.service';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { Article, Image } from 'src/core/entities';
import { CreateArticleDto, UpdateArticleDto } from 'src/core/dto';
import { ArticleRepository } from 'src/frameworks/data-services/database';
import PrismaService from 'src/frameworks/data-services/database/prisma.service';
import { ImageService } from '../image/image.use-case';

@Injectable()
export class ArticleService {
  constructor(
    private articleFactoryService: ArticleFactoryService,
    private dataService: ArticleRepository,
    private prismaService: PrismaService,
    private imageService: ImageService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const { image, ...article } =
      await this.articleFactoryService.createNewArticle(createArticleDto);
    const createdArticle = await this.dataService.create(article);
    if (image) {
      for (let i = 0; i < image['length']; i++) {
        await this.imageService.create({
          ...image[i],
          pos: i,
          imageFile: image[i].imageFile as Image,
          id_article: createdArticle.id,
        });
      }
    }

    return createdArticle;
  }

  async findAll() {
    return this.dataService.findAll();
  }

  async findOne(id: string) {
    return this.dataService.findById(id);
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const { image, ...article } =
      await this.articleFactoryService.updateArticle(updateArticleDto);
    
    if (image) {
      let imageUrls = [];
      if (Array.isArray(image)) {
        imageUrls = image.map((img) => img.url);

        await this.imageService.deleteArticleOffSetImages(id, imageUrls);
        //
        for (let i = 0; i < image.length; i++) {
          const existsImage = await this.imageService.findByField(
            'url',
            image[i].url,
          );
          console.log(existsImage);
          await this.imageService.update(existsImage.id, {
            ...image[i] as any,
            pos: i,
            id_article: id,
          });
        }
      } else {
        if ((image as Image).url) {
          await this.imageService.deleteArticleOffSetImages(id, [
            (image as Image).url,
          ]);

          const existsImage = await this.imageService.findByField(
            'url',
            (image as Image).url,
          );

          await this.imageService.update(existsImage.id, {
            ...(image as any),
            id_article: id,
          });
        }
      }
    }

    return this.dataService.update(id, article);
  }

  async remove(id: string) {
    this.imageService.deleteRelatedImages(id);
    return this.dataService.delete(id);
  }
}
