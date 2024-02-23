import { Company } from './company.entity';
import { Image } from './image.entity';
import { Role } from './role.entity';

export class User {
  id?: string;

  firstName: string;

  lastName: string;

  email: string;

  password?: string;

  role?: Role;
  id_role: string;

  company?: Company;
  id_company?: string;

  image?: Image;
  id_image?: string;
}
