import { Image } from 'src/core/entities';

export class CreateCompanyDto {
  trade_name: string;

  legal_name: string;

  cnpj: string;

  street: string;

  number: string;

  complement?: string;

  neighborhood: string;

  city: string;

  state: string;

  cep: string;

  description?: string;

  image?: Image;
}

export class UpdateCompanyDto extends CreateCompanyDto {}
