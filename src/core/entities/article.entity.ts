import { Category } from './category.entity';
import { Image } from './image.entity';

export class Article {
  id?: string;

  title: string;

  subTitle: string;

  content: string;

  pubDate: Date;

  author: string;

  category?: Category;
  id_category?: string;

  image?: Image;
  id_image?: string;
}
