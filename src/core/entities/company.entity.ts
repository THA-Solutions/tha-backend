import { Image } from './image.entity';

export class Company {
  id?: string;

  trade_name?: string;

  legal_name: string;

  description?: string;

  cnpj: string;

  street: string;

  number: string;

  complement?: string;

  neighborhood: string;

  city: string;

  state: string;

  cep: string;

  image?: Image;
  id_image?: string;
}
