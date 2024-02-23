import { IGenericRepository } from 'src/core/abstracts';
import { User } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IGenericRepository<User> {
  constructor(private prisma: PrismaService) {}

  async create(data: User): Promise<User> {
    return await this.prisma.user.create({
      data: {
        ...data,
        role: {
          connect: { id: data.role.id },
        },
      } as any,
    });
  }

  async update(id: string, data: User): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    } as any);
  }

  async find(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        image: true,
      },
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        image: true,
      },
    } as any);

    return users;
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { [param]: value },
      include: {
        image: true,
      },
    });
  }

  async findById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: { id },
      include: {
        image: true,
      },
    });
  }
}
