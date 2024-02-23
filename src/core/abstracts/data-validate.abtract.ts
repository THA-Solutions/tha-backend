import {
  AccountToken,
  Article,
  Category,
  Company,
  Image,
  Inverter,
  Review,
  Role,
  Team,
  User,
} from '../entities';
import { IDataValidate } from './data-validate-repository.abstract';

export abstract class IDataValidateServices {
  abstract user: IDataValidate<User>;
  abstract company: IDataValidate<Company>;
  abstract image: IDataValidate<Image>;
  abstract inverter: IDataValidate<Inverter>;
  abstract review: IDataValidate<Review>;
  abstract role: IDataValidate<Role>;
  abstract team: IDataValidate<Team>;
  abstract article: IDataValidate<Article>;
  abstract category: IDataValidate<Category>;
  abstract accountToken: IDataValidate<AccountToken>;
}
