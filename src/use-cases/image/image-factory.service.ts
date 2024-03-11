import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUploadImageServices } from 'src/core/abstracts/upload-image-services.abstract';
import { CreateImageDto, UpdateImageDto } from 'src/core/dto';
import { Image } from 'src/core/entities';

@Injectable()
export class ImageFactoryService {
  constructor(
    private uploadImageService: IUploadImageServices,
    private configService: ConfigService,
  ) {}

  async createNewImage(createImageDto: CreateImageDto) {
    const newImage = new Image();

    newImage.source = createImageDto.source;

    newImage.alt = createImageDto.alt;

    newImage.pos = +createImageDto.pos;

    if (createImageDto.imageFile) {
      newImage.url = await this.uploadImageService.uploadImage(
        createImageDto.imageFile,
      );
    } else {
      newImage.url = createImageDto.url;
    }

    if (createImageDto.id_article) {
      newImage.id_article = createImageDto.id_article;
    }

    return newImage;
  }

  async updateImage(updateImageDto: UpdateImageDto) {
    const updatedImage = new Image();

    if (updateImageDto.source) {
      updatedImage.source = updateImageDto.source;
    }

    if (updateImageDto.alt) {
      updatedImage.alt = updateImageDto.alt;
    }

    if (updateImageDto.pos) {
      updatedImage.pos = +updateImageDto.pos;
    }

    if (updateImageDto.imageFile) {
      updatedImage.url = await this.uploadImageService.uploadImage(
        updateImageDto.imageFile,
      );
    } else {
      updatedImage.url = updateImageDto.url;
    }

    return updatedImage;
  }

  async removeCloudImage(urls: string | string[]) {
    const imagesCloudinaryUrls = [];

    let folder = this.configService.get('CLOUDINARY_FOLDER');
    let regex = new RegExp(`${folder}/[^/.]+(?=\\.)`);

    if (Array.isArray(urls)) {
      for (let i = 0; i < urls['length']; i++) {
        const id = urls[i].match(regex)![0];
        await this.uploadImageService.deleteImage(id);
      }
    } else {
      const id = urls.match(regex)![0];
      await this.uploadImageService.deleteImage(id);
    }

    return imagesCloudinaryUrls;
  }
}
