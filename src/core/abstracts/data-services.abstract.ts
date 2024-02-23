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
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract review: IGenericRepository<Review>;

  abstract user: IGenericRepository<User>;

  abstract inverter: IGenericRepository<Inverter>;

  abstract image: IGenericRepository<Image>;

  abstract company: IGenericRepository<Company>;

  abstract article: IGenericRepository<Article>;

  abstract category: IGenericRepository<Category>;

  abstract role: IGenericRepository<Role>;

  abstract team: IGenericRepository<Team>;

  abstract accountToken: IGenericRepository<AccountToken>;
}
