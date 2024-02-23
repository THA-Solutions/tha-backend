import { Injectable } from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from '../../core/dto';
import { ImageFactoryService } from './image-factory.service';
import { Image } from '../../core/entities';
import { ImageRepository } from 'src/frameworks/data-services/database';

@Injectable()
export class ImageService {
  constructor(
    private imageFactoryService: ImageFactoryService,
    private imageService: ImageRepository,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const image = await this.imageFactoryService.createNewImage(createImageDto);

    return this.imageService.create(image);
  }

  async findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  async findOne(id: string): Promise<Image> {
    return this.imageService.findById(id);
  }

  async update(id: string, updateImageDto: UpdateImageDto): Promise<Image> {
    const image = await this.imageService.findById(id);

    if (!image) {
      return this.create(updateImageDto);
    }

    const updateImage =
      await this.imageFactoryService.updateImage(updateImageDto);

    return this.imageService.update(id, updateImage);
  }

  async remove(id: string) {
    const image = await this.imageService.findById(id);

    if (!image) {
      throw new Error('Image doesn´t exists');
    }
    //await this.imageFactoryService.removeImage(image.url);
    return this.imageService.delete(id);
  }
}
