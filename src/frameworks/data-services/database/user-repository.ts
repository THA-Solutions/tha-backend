import { IGenericRepository } from 'src/core/abstracts';
import { Role, User } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository implements IGenericRepository<User> {
  constructor(private prisma: PrismaService) {}

  async create(data: User): Promise<User> {
    let createData: Prisma.UserCreateInput = {
      ...data,
      password: data.password!,
      role: data.role ? { connect: { id: data.role.id } } : undefined,
      company: data.company ? { connect: { id: data.company.id } } : undefined,
      image: data.image ? { connect: { id: data.image.id } } : undefined,
    } as any;

    const user = await this.prisma.user.create({ data: createData } as any);
    return user;
  }

  async update(id: string, data: User): Promise<User> {
    const updateData: Prisma.UserUncheckedUpdateInput = {
      ...data,
      password: data.password ? data.password : undefined,
      role: data.role ? { connect: { id: data.role.id } } : undefined,
      company: data.company ? { connect: { id: data.company.id } } : undefined,
      image: data.image ? { connect: { id: data.image.id } } : undefined,
    } as any;

    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
    } as any);

    return user;
  }

  async find(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        image: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
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
    const user = await this.prisma.user.findFirst({
      where: { [param]: value },
      include: {
        image: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return user;
  }

  async findByRole(role: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { role: { id: role } },
      include: {
        image: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return users;
  }

  async findById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        image: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
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
