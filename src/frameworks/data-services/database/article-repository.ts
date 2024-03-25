import { IGenericRepository } from 'src/core/abstracts';
import { Article } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleRepository implements IGenericRepository<Article> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Article): Promise<Article> {
    const createOptions = data.category ? { data: { ...data, category: { connect: { id: data.category.id } } } } : { data };
    return await this.prismaService.article.create(createOptions as any);
  }

  async findAll(): Promise<Article[]> {
    return await this.prismaService.article.findMany({
      include: {
        category: true,
        image: true,
      },
    });
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<Article> {
    return await this.prismaService.article.findFirst({
      where: { [param]: value },
      include: {
        category: true,
        image: true,
      },
    });
  }

  async findById(id: string): Promise<Article> {
    return await this.prismaService.article.findUnique({
      where: { id },
      include: {
        category: true,
        image: true,
      },
    });
  }

  async update(id: string, data: Article): Promise<Article> {
    let updateData = data.category
      ? { ...data, category: { connect: { id: data.category.id } } }
      : data;

    return await this.prismaService.article.update({
      where: { id },
      data: updateData,
    } as any);
  }

  async delete(id: string) {
    return await this.prismaService.article.delete({
      where: { id },
    });
  }
}
