import { Inverter } from './inverter.entity';

export class Review {
  id?: string;

  value: number;

  comment: string;

  date: Date;

  id_inverter: string;

  id_user: string;
}
