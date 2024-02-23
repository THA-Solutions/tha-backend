import { Injectable } from '@nestjs/common';
import { TeamFactoryService } from './team-factory.service';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { CreateTeamDto, UpdateTeamDto } from 'src/core/dto';
import { Team } from 'src/core/entities';

@Injectable()
export class TeamService {
  constructor(
    private teamFactoryService: TeamFactoryService,
    private dataService: IGenericRepository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const team = await this.teamFactoryService.createNewTeam(createTeamDto);

    return this.dataService.create(team);
  }

  async findAll() {
    return this.dataService.findAll();
  }

  async findOne(id: string) {
    return this.dataService.findById(id);
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const updateTeam = await this.teamFactoryService.updateTeam(updateTeamDto);
    return this.dataService.update(id, updateTeam);
  }

  async remove(id: string) {
    return this.dataService.delete(id);
  }
}
