export class CreateReviewDto {
  value: number;

  comment: string;

  date: Date;

  id_inverter: string;

  id_user: string;
}

export class UpdateReviewDto extends CreateReviewDto {}
