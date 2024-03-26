import { Image } from "src/core/entities";

export class CreateImageDto {
  imageFile?: Image;

  source?: string;

  alt?: string;

  pos?: number;

  url?: string;

  id_article?: string;
}

export class UpdateImageDto extends CreateImageDto {}
