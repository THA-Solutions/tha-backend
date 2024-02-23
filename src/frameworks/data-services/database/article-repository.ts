import { IGenericRepository } from 'src/core/abstracts';
import { Article } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleRepository implements IGenericRepository<Article> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Article): Promise<Article> {
    return await this.prismaService.article.create({
      data,
    } as any);
  }

  async update(id: string, data: Article): Promise<Article> {
    return await this.prismaService.article.update({
      where: { id },
      data,
    } as any);
  }

  async delete(id: string) {
    return await this.prismaService.article.delete({ where: { id } });
  }

  async find(id: string): Promise<Article> {
    return await this.prismaService.article.findUnique({ where: { id } });
  }

  async findAll(): Promise<Article[]> {
    return await this.prismaService.article.findMany();
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<Article> {
    return await this.prismaService.article.findFirst({
      where: { [param]: value },
    });
  }

  async findById(id: string): Promise<Article> {
    return await this.prismaService.article.findUnique({ where: { id } });
  }
}
