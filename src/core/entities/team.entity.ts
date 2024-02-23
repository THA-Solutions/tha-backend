import { Image } from './image.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

export class Team {
  id?: string;

  name: string;

  order: number;

  linkedin: string;

  instagram: string;

  description: string;

  role: Role;
  id_role?: string;

  image: Image;
  id_image?: string;
}
