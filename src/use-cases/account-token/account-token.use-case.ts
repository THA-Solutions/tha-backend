import { Injectable } from '@nestjs/common';
import { CreateAccountTokenDto } from '../../core/dto/request/account-token.dto';
import { AccountTokenFactoryService } from './account-token-factory.service';
import { IGenericRepository } from '../../core/abstracts';
import { AccountToken } from 'src/core/entities';

@Injectable()
export class AccountTokenService {
  constructor(
    private accountTokenFactoryService: AccountTokenFactoryService,
    private dataService: IGenericRepository<AccountToken>,
  ) {}

  async create(createAccountTokenDto: CreateAccountTokenDto) {}

  async findOne(token: string) {
    return await this.dataService.findByField('token', token);
  }

  async remove(id: string) {
    const accountToken = await this.dataService.findByField('id_user', id);

    if (!accountToken) {
      throw new Error('AccountToken doesn´t exists');
    }

    return this.dataService.delete(accountToken.id);
  }
}
