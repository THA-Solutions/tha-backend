import { IGenericRepository } from 'src/core/abstracts';
import { Category } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository implements IGenericRepository<Category> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Category): Promise<Category> {
    return await this.prismaService.category.create({ data } as any);
  }

  async update(id: string, data: Category): Promise<Category> {
    return await this.prismaService.category.update({
      where: { id },
      data,
    } as any);
  }

  async delete(id: string) {
    return await this.prismaService.category.delete({ where: { id } });
  }

  async find(id: string): Promise<Category> {
    return await this.prismaService.category.findUnique({ where: { id } });
  }

  async findAll(): Promise<Category[]> {
    return await this.prismaService.category.findMany();
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<Category> {
    return await this.prismaService.category.findFirst({
      where: { [param]: value },
    });
  }

  async findById(id: string): Promise<Category> {
    return await this.prismaService.category.findUnique({ where: { id } });
  }
}
