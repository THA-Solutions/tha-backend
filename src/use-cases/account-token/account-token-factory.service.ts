import { Injectable } from '@nestjs/common';
import { CreateAccountTokenDto, UpdateAccountTokenDto } from 'src/core/dto';

@Injectable()
export class AccountTokenFactoryService {
  constructor() {}

  async createNewAccountToken(createAccountTokenDto: CreateAccountTokenDto) {}

  async updateAccountToken(updateAccountTokenDto: UpdateAccountTokenDto) {}
}
