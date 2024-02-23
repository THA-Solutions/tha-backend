export class CreateCategoryDto {
  name: string;

  description: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {}
