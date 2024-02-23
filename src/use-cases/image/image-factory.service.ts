import { Injectable } from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from 'src/core/dto';
import { Image } from 'src/core/entities';

@Injectable()
export class ImageFactoryService {
  constructor() {}

  async createNewImage(createImageDto: CreateImageDto) {
    const newImage = new Image();

    return newImage;
  }

  async updateImage(updateImageDto: UpdateImageDto) {
    const updatedImage = new Image();

    return updatedImage;
  }
}
