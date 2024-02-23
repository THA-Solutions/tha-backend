export class CreateAccountTokenDto {
  id_user?: string;

  token: string;

  expires: string;
}

export class UpdateAccountTokenDto extends CreateAccountTokenDto {}
