import { IGenericRepository } from 'src/core/abstracts';
import { AccountToken } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountTokenRepository
  implements IGenericRepository<AccountToken>
{
  constructor(private prismaService: PrismaService) {}

  async create(data: AccountToken): Promise<AccountToken> {
    return await this.prismaService.account_Token.create({ data } as any);
  }

  async update(id: string, data: AccountToken): Promise<AccountToken> {
    return await this.prismaService.account_Token.update({
      where: { id },
      data,
    } as any);
  }

  async delete(id: string) {
    return await this.prismaService.account_Token.delete({ where: { id } });
  }

  async find(id: string): Promise<AccountToken> {
    return await this.prismaService.account_Token.findUnique({ where: { id } });
  }

  async findAll(): Promise<AccountToken[]> {
    return await this.prismaService.account_Token.findMany();
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<AccountToken> {
    return await this.prismaService.account_Token.findFirst({
      where: { [param]: value },
    });
  }

  async findById(id: string): Promise<AccountToken> {
    return await this.prismaService.account_Token.findUnique({ where: { id } });
  }
}
