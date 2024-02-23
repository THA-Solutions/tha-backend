import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/config/decorators/public.decorator';
import { Roles } from 'src/config/decorators/role.decorator';
import { CreateTeamDto, UpdateTeamDto } from 'src/core/dto';
import { Image } from 'src/core/entities';
import { Role } from 'src/use-cases/auth/enums';
import { TeamService } from 'src/use-cases/team/team.use-case';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageFile'))
  @Roles(Role.ADMIN)
  create(
    @Body() createTeamDto: CreateTeamDto,
    @UploadedFile() imageFile?: Image,
  ) {
    return this.teamService.create({ ...createTeamDto, image: imageFile });
  }

  @Get()
  @Public()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('imageFile'))
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @UploadedFile() imageFile?: Image,
  ) {
    return this.teamService.update(id, { ...updateTeamDto, image: imageFile });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
