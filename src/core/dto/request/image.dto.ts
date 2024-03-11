export class CreateImageDto {
  imageFile?: File;

  source?: string;

  alt?: string;

  pos?: number;

  url?: string;

  id_article?: string;
}

export class UpdateImageDto extends CreateImageDto {}
