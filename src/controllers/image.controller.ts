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
import { ImageService } from 'src/use-cases/image/image.use-case';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageFile'))
  create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile() imageFile: File,
  ) {
    return this.imageService.create({
      ...createImageDto,
      imageFile: imageFile,
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
    @UploadedFile() imageFile?: File,
  ) {
    return this.imageService.update(id, {
      ...updateImageDto,
      imageFile: imageFile,
    });
  }

  @Patch('origin/:id')
  @UseInterceptors(FileInterceptor('imageFile'))
  updateByOrigin(
    @Body() updateImageDto: UpdateImageDto,
    @UploadedFile() imageFile: File,
  ) {
    return; //this.imageService.updateByOrigin(updateImageDto, imageFile);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(id);
  }

}
