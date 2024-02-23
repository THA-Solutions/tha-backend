import { IGenericRepository } from 'src/core/abstracts';
import { Image } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageRepository implements IGenericRepository<Image> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Image): Promise<Image> {
    return await this.prismaService.image.create({ data } as any);
  }

  async update(id: string, data: Image): Promise<Image> {
    return await this.prismaService.image.update({
      where: { id },
      data,
    } as any);
  }

  async delete(id: string) {
    return await this.prismaService.image.delete({ where: { id } });
  }

  async find(id: string): Promise<Image> {
    return await this.prismaService.image.findUnique({ where: { id } });
  }

  async findAll(): Promise<Image[]> {
    return await this.prismaService.image.findMany();
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<Image> {
    return await this.prismaService.image.findFirst({
      where: { [param]: value },
    });
  }

  async findById(id: string): Promise<Image> {
    return await this.prismaService.image.findUnique({ where: { id } });
  }
}
