import { IGenericRepository } from 'src/core/abstracts';
import { Team } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamRepository implements IGenericRepository<Team> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Team): Promise<Team> {
    const createOptions = data.image
      ? { data: { ...data, image: { connect: { id: data.image.id } } } }
      : { data };

    return (await this.prismaService.team.create(
      createOptions as any,
    )) as unknown as Team;
  }

  async update(id: string, data: Team): Promise<Team> {

    const updateOptions = data.image ? { where: {id},data: { ...data, image: { connect:{ id: data.image.id }} } } : { data }; 
    return (await this.prismaService.team.update(
      updateOptions as any,
    )) as unknown as Team;
  }

  async delete(id: string) {
    return await this.prismaService.team.delete({
      where: { id },
      include: {
        image: true,
      },
    });
  }

  async find(id: string): Promise<Team> {
    return (await this.prismaService.team.findUnique({
      where: { id },
      include: {
        image: true,
      },
    })) as unknown as Team;
  }

  async findAll(): Promise<Team[]> {
    return (await this.prismaService.team.findMany({
      include: {
        image: true,
      },
    })) as unknown as Team[];
  }

  async findByField(
    param: string,
    value: string | number | boolean,
  ): Promise<Team> {
    return (await this.prismaService.team.findFirst({
      where: { [param]: value },
      include: {
        image: true,
      },
    })) as unknown as Team;
  }

  async findById(id: string): Promise<Team> {
    return (await this.prismaService.team.findUnique({
      where: { id },
      include: {
        image: true,
      },
    })) as unknown as Team;
  }
}
