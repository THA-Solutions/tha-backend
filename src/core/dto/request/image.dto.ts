export class CreateImageDto {
  imageFile?: File;

  source?: string;

  alt?: string;

  order?: number;

  url?: string;
}

export class UpdateImageDto extends CreateImageDto {}
