import { Injectable } from '@nestjs/common';
import { CreateTeamDto, UpdateTeamDto } from 'src/core/dto';
import { Image, Team } from 'src/core/entities';
import { ImageService } from '../image/image.use-case';
import { IDataServices } from 'src/core/abstracts';

@Injectable()
export class TeamFactoryService {
  constructor(private imageUseCase: ImageService) {}

  async createNewTeam(createTeamDto: CreateTeamDto) {
    const newTeam = new Team();

    newTeam.name = createTeamDto.name;

    newTeam.description = createTeamDto.description;

    newTeam.order = createTeamDto.order;

    newTeam.instagram = createTeamDto.instagram;

    newTeam.linkedin = createTeamDto.linkedin;

    newTeam.id_role = createTeamDto.role;

    if (createTeamDto.image) {
      newTeam.image = await this.imageHandler(createTeamDto.image);
    }

    return newTeam;
  }

  async updateTeam(updateTeamDto: UpdateTeamDto) {
    const updatedTeam = new Team();

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
      updatedTeam.id_role = updateTeamDto.role;
    }

    if (updateTeamDto.image) {
      updatedTeam.image = await this.imageHandler(updateTeamDto.image);
    }

    return updatedTeam;
  }

  private async imageHandler(imageFile: Image): Promise<Image> {
    let postedImage = new Image();

    postedImage = await this.imageUseCase.create({
      imageFile: imageFile as unknown as File,
    });
    return postedImage;
  }
}
