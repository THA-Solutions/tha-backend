import { IGenericRepository } from 'src/core/abstracts';
import { Inverter } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InverterRepository implements IGenericRepository<Inverter> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Inverter): Promise<Inverter> {
    return (await this.prismaService.inverter.create({
      data,
    } as any)) as Inverter;
  }

  async update(id: string, data: Inverter): Promise<Inverter> {
    return (await this.prismaService.inverter.update({
      where: { id },
      data,
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
