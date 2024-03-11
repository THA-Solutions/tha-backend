import { IGenericRepository } from 'src/core/abstracts';
import { Inverter } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class InverterRepository implements IGenericRepository<Inverter> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Inverter): Promise<Inverter> {
    const createData = {
      ...data,
      company: data.company ? { connect: { id: data.company.id } } : undefined,
      image: data.image ? { connect: { id: data.image.id } } : undefined,
    };

    return (await this.prismaService.inverter.create({
      data: createData,
    } as any)) as Inverter;
  }

  async update(id: string, data: Inverter): Promise<Inverter> {
    let updateData = {
      ...data,
    } as any;

    if (data.company) {
      updateData.company = { connect: { id: data.company.id } };
    }

    if (data.image) {
      updateData.image = { connect: { id: data.image.id } };
    }

    return (await this.prismaService.inverter.update({
      where: { id },
      data: updateData,
    } as any)) as Inverter;
  }

  async delete(id: string) {
    return await this.prismaService.inverter.delete({ where: { id } });
  }

  async find(id: string): Promise<Inverter> {
    return (await this.prismaService.inverter.findUnique({
      where: { id },
      include: {
        company: true,
        image: true,
      },
    })) as Inverter;
  }

  async findAll(): Promise<Inverter[]> {
    return (await this.prismaService.inverter.findMany({
      include: {
        company: true,
        image: true,
      },
    })) as Inverter[];
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<Inverter> {
    return (await this.prismaService.inverter.findFirst({
      where: { [param]: value },
      include: {
        company: true,
        image: true,
      },
    })) as Inverter;
  }

  async findById(id: string): Promise<Inverter> {
    return (await this.prismaService.inverter.findUnique({
      where: { id },
      include: {
        company: true,
        image: true,
      },
    })) as Inverter;
  }
}
