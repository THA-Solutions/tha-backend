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
import { CreateImageDto, UpdateImageDto } from 'src/core/dto';
import { Image } from 'src/core/entities';
import { ImageService } from 'src/use-cases/image/image.use-case';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageFile'))
  create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    return this.imageService.create({
      ...createImageDto,
      imageFile: imageFile as unknown as Image,
    });
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.imageService.findAll();
  }

  @Get('unique/:id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageFile'))
  update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
    @UploadedFile() imageFile?: Express.Multer.File,
  ) {
    return this.imageService.update(id, {
      ...updateImageDto,
      imageFile: imageFile as unknown as Image, 
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(id);
  }

}
