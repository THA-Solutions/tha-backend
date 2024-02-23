import { IGenericRepository } from 'src/core/abstracts';
import { Review } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewRepository implements IGenericRepository<Review> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Review): Promise<Review> {
    return (await this.prismaService.review.create({ data } as any)) as Review;
  }

  async update(id: string, data: Review): Promise<Review> {
    return await this.prismaService.review.update({
      where: { id },
      data,
    } as any);
  }

  async delete(id: string) {
    return await this.prismaService.review.delete({ where: { id } });
  }

  async find(id: string): Promise<Review> {
    return await this.prismaService.review.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async findAll(id_inverter: string): Promise<Review[]> {
    return await this.prismaService.review.findMany({
      where: { id_inverter: id_inverter as string },
      include: {
        user: true,
      },
    } as any);
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<Review> {
    return await this.prismaService.review.findFirst({
      where: { [param]: value },
      include: {
        user: true,
      },
    });
  }

  async findById(id: string): Promise<Review> {
    return await this.prismaService.review.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }
}
