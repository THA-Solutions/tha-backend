import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/config/decorators/public.decorator';
import { Roles } from 'src/config/decorators/role.decorator';
import { CreateInverterDto, UpdateInverterDto } from 'src/core/dto';
import { Image } from 'src/core/entities';
import { Role } from 'src/use-cases/auth/enums';
import { InverterService } from 'src/use-cases/inverter/inverter.use-case';

@Controller('inverter')
export class InverterController {
  constructor(private readonly inverterService: InverterService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageFile'))
  @Roles(Role.ADMIN, Role.DISTRIBUTOR)
  create(
    @Body() createInverterDto: CreateInverterDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    try {
      return this.inverterService.create({
        ...createInverterDto,
        image: imageFile as unknown as Image,
      });
    } catch (error) {
      throw Error(`Error in create inverter ${error}`);
    }
  }

  @Get()
  @Public()
  findAll() {
    try {
      return this.inverterService.findAll();
    } catch (error) {
      throw Error(`Error in find all inverters ${error}`);
    }
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    try {
      return this.inverterService.findOne(id);
    } catch (error) {
      throw Error(`Error in find inverter by id ${error}`);
    }
  }

  @Get('title/:title')
  @Public()
  findByTitle(@Param('title') title: string) {
    try {
      return this.inverterService.findByTitle(title);
    } catch (error) {
      throw Error(`Error in find inverter by title ${error}`);
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageFile'))
  @Roles(Role.ADMIN, Role.DISTRIBUTOR)
  update(
    @Param('id') id: string,
    @Body() updateInverterDto: UpdateInverterDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    try {
      return this.inverterService.update(id, {
        ...updateInverterDto,
        image: imageFile as unknown as Image,
      });
    } catch (error) {
      throw Error(`Error in update inverter ${error}`);
    }
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.DISTRIBUTOR)
  remove(@Param('id') id: string) {
    try {
      return this.inverterService.remove(id);
    } catch (error) {
      throw Error(`Error in delete inverter ${error}`);
    }
  }
}
