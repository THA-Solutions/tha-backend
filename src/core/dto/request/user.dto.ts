import { Image } from 'src/core/entities';

export class CreateUserDto {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  role?: string;
  id_role: string;

  id_company?: string;

  image?: Image;
  id_image?: string;
}

export class UpdateUserDto extends CreateUserDto {
  id?: string;
}
