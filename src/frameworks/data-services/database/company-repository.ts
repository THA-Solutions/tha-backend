import { IGenericRepository } from 'src/core/abstracts';
import { Company } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository implements IGenericRepository<Company> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Company): Promise<Company> {
    const createOptions = data.image
      ? { data: { ...data, image: { connect: { id: data.image.id } } } }
      : { data };

    return (await this.prismaService.company.create(
      createOptions as any,
    )) as Company;
  }

  async update(id: string, data: Company): Promise<Company> {
    const updateOptions = data.image
      ? {
          where: { id },
          data: { ...data, image: { connect: { id: data.image.id } } },
        }
      : { where: { id }, data };

    return (await this.prismaService.company.update(
      updateOptions as any,
    )) as Company;
  }

  async delete(id: string) {
    return await this.prismaService.company.delete({ where: { id } });
  }

  async find(id: string): Promise<Company> {
    return (await this.prismaService.company.findUnique({
      where: { id },
      include:{
        image: true
      },
    })) as Company;
  }

  async findAll(): Promise<Company[]> {
    return (await this.prismaService.company.findMany({
      include: {
        image: true,
      },
    })) as Company[];
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<Company> {
    return (await this.prismaService.company.findFirst({
      where: { [param]: value },
    })) as Company;
  }

  async findById(id: string): Promise<Company> {
    return (await this.prismaService.company.findUnique({
      where: { id },
    })) as Company;
  }
}
