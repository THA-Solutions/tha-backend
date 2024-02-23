import { Category, Image } from '../../../core/entities';

export class CreateArticleDto {
  title: string;

  subTitle: string;

  content: string;

  pubDate: Date;

  author: string;

  category: Category;

  image: Image;
}

export class UpdateArticleDto extends CreateArticleDto {}
