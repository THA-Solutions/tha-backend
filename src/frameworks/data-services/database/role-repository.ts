import { IGenericRepository } from 'src/core/abstracts';
import { Role } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository implements IGenericRepository<Role> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Role): Promise<Role> {
    return await this.prismaService.role.create({ data } as any);
  }

  async update(id: string, data: Role): Promise<Role> {
    return await this.prismaService.role.update({ where: { id }, data } as any);
  }

  async delete(id: string) {
    return await this.prismaService.role.delete({ where: { id } });
  }

  async find(id: string): Promise<Role> {
    return await this.prismaService.role.findUnique({ where: { id } });
  }

  async findAll(): Promise<Role[]> {
    return await this.prismaService.role.findMany();
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<Role> {
    return await this.prismaService.role.findFirst({
      where: { [param]: value },
    });
  }

  async findById(id: string): Promise<Role> {
    return await this.prismaService.role.findUnique({ where: { id } });
  }
}
