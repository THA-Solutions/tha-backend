import { Injectable } from '@nestjs/common';
import { CreateTeamDto, UpdateTeamDto } from 'src/core/dto';
import { Image, Team } from 'src/core/entities';
import { ImageService } from '../image/image.use-case';
import { IDataServices } from 'src/core/abstracts';
import { TeamRepository } from 'src/frameworks/data-services/database';

@Injectable()
export class TeamFactoryService {
  constructor(
    private imageUseCase: ImageService,
    private teamService: TeamRepository,
  ) {}

  async createNewTeam(createTeamDto: CreateTeamDto) {
    const newTeam = new Team();

    newTeam.name = createTeamDto.name;

    newTeam.description = createTeamDto.description;

    newTeam.order = createTeamDto.order;

    newTeam.instagram = createTeamDto.instagram;

    newTeam.linkedin = createTeamDto.linkedin;

    newTeam.role = createTeamDto.role;

    if (createTeamDto.image) {
      newTeam.image = await this.createImage(createTeamDto.image);
    }

    return newTeam;
  }

  async updateTeam(updateTeamDto: UpdateTeamDto) {
    const updatedTeam = new Team();

    const team = await this.teamService.findById(updateTeamDto.id);

    if (updateTeamDto.name) {
      updatedTeam.name = updateTeamDto.name;
    }

    if (updateTeamDto.description) {
      updatedTeam.description = updateTeamDto.description;
    }

    if (updateTeamDto.order) {
      updatedTeam.order = updateTeamDto.order;
    }

    if (updateTeamDto.instagram) {
      updatedTeam.instagram = updateTeamDto.instagram;
    }

    if (updateTeamDto.linkedin) {
      updatedTeam.linkedin = updateTeamDto.linkedin;
    }

    if (updateTeamDto.role) {
      updatedTeam.role = updateTeamDto.role;
    }

    if (updateTeamDto.image) {
      if (!team.image) {
        updatedTeam.image = await this.createImage(updateTeamDto.image);
      }

      await this.imageUseCase.remove(team.image.id);
      updatedTeam.image = await this.createImage(updateTeamDto.image);
    }

    return updatedTeam;
  }

  private async createImage(imageFile: Image): Promise<Image> {
    let postedImage = new Image();

    postedImage = await this.imageUseCase.create({
      imageFile: imageFile as unknown as Image,
    });
    return postedImage;
  }
}
