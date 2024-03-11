import { Injectable } from '@nestjs/common';
import { TeamFactoryService } from './team-factory.service';
import { CreateTeamDto, UpdateTeamDto } from 'src/core/dto';

import {
  ImageRepository,
  TeamRepository,
} from 'src/frameworks/data-services/database';

@Injectable()
export class TeamService {
  constructor(
    private teamFactoryService: TeamFactoryService,
    private dataService: TeamRepository,
    private imageService: ImageRepository,
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
    const updateTeam = await this.teamFactoryService.updateTeam({
      id: id,
      ...updateTeamDto,
    });

    return this.dataService.update(id, updateTeam);
  }

  async remove(id: string) {
    const team = await this.dataService.findById(id);

    if (!team) {
      throw new Error('Team doesn´t exists');
    }

    if (team.image) {
      await this.imageService.delete(team.image.id);
    }
    return this.dataService.delete(id);
  }
}
