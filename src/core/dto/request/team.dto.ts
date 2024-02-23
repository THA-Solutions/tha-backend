import { Image } from 'src/core/entities';

export class CreateTeamDto {
  name: string;

  order?: number;

  linkedin?: string;

  instagram?: string;

  description?: string;

  role: string;

  image: Image;
  id_image: string;
}

export class UpdateTeamDto extends CreateTeamDto {}
